import {createServerFn} from "@tanstack/react-start";
import {repositoryMiddleware} from "~/middleware/repository";
import {notFound} from "@tanstack/react-router";


export const getPage = createServerFn({
    method: 'GET',
})
    .inputValidator((args) => args as {path: string})
    .middleware([repositoryMiddleware])
    .handler(async (args)=> {
        const repo = args.context.repo;
        const path = args.data.path;

        const page =  await repo?.getPage(path);

        if(!page) {
            throw notFound()
        }

        return page;
    })