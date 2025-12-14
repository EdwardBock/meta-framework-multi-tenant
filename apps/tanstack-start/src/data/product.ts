import {createServerFn} from "@tanstack/react-start";
import {repositoryMiddleware} from "~/middleware/repository";
import {notFound} from "@tanstack/react-router";
import {getCachedPage, setCachedPage} from "~/utils/redis";
import {getCacheTTLForPath} from "~/utils/cache";
import {ProductService} from "@mfmt/service";


export const getProduct = createServerFn({
    method: 'GET',
})
    .inputValidator((args) => args as {id: number})
    .handler(async (args)=> {
        const id = args.data.id;
        return ProductService().getProductById(id);
    })
