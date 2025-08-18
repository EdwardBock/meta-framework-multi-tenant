import type {APIContext, APIRoute} from "astro";
import {ProductService} from "@mfmt/service";

export const GET: APIRoute = async ({params}: APIContext) => {
    return new Response(
        JSON.stringify(await ProductService().getProductById(parseInt(params.id ?? ""))),
    );
};
