import { type RequestHandler } from "@builder.io/qwik-city";
import { ProductService } from "@mfmt/service";

export const onGet: RequestHandler = async ({ json, params }) => {
  json(200, await ProductService().getProductById(parseInt(params["id"])));
};
