import {createServerFn} from "@tanstack/react-start";
import {repositoryMiddleware} from "~/middleware/repository";
import {getSlug} from "~/data/slug";


export const getTheme = createServerFn({
    method: 'GET',
})
    .middleware([repositoryMiddleware])
    .handler(async (args) => {
        const slug = await getSlug()
        return `/themes/${slug}.css`;
    })