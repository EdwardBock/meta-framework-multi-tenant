import {createServerFn} from "@tanstack/react-start";
import {repositoryMiddleware} from "~/middleware/repository";
import {notFound} from "@tanstack/react-router";
import {getCachedPage, setCachedPage} from "~/utils/redis";
import {getCacheTTLForPath} from "~/utils/cache";
import {ProductService} from "@mfmt/service";

export const getProducts = createServerFn({
    method: 'GET',
})
    .handler(ProductService().getProducts)
