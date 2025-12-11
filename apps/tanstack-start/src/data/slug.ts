import {createServerFn} from "@tanstack/react-start";
import {repositoryMiddleware} from "~/middleware/repository";
import {notFound} from "@tanstack/react-router";

export const getSlug = createServerFn({
    method: 'GET',
})
    .middleware([repositoryMiddleware])
    .handler(async (args) => {
        const slug = await args.context.repo?.getSlug();
        if(!slug) {
            throw notFound();
        }
        return slug;
    })