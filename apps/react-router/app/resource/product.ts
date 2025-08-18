import type { Route } from "./+types/product";
import {ProductService} from "@mfmt/service";

export async function loader({ params }: Route.LoaderArgs) {
    return ProductService().getProductById(parseInt(params.id));
}
