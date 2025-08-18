import type { APIRoute } from "astro";
import {ProductService} from "@mfmt/service";

export const GET: APIRoute = async () => {
    return new Response(
        JSON.stringify(await ProductService().getProducts()),
    );
};
