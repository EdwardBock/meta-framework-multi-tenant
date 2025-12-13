import {createServerFn} from "@tanstack/react-start";
import {repositoryMiddleware} from "~/middleware/repository";
import {notFound} from "@tanstack/react-router";
import {getCachedPage, setCachedPage} from "~/utils/redis";
import {getCacheTTLForPath} from "~/utils/cache";


export const getPage = createServerFn({
    method: 'GET',
})
    .inputValidator((args) => args as {path: string})
    .middleware([repositoryMiddleware])
    .handler(async (args)=> {
        const repo = args.context.repo;
        const path = args.data.path;
        
        if (!repo) {
            throw notFound();
        }

        const tenant = await repo.getSlug();
        
        const cachedPage = await getCachedPage(tenant, path);
        if (cachedPage) {
            return cachedPage;
        }

        const page = await repo.getPage(path);

        if(!page) {
            throw notFound();
        }

        const ttl = getCacheTTLForPath(path);
        await setCachedPage(tenant, path, page, ttl);

        return page;
    })
