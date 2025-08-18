import {ProductService} from "@mfmt/service";

export async function loader() {
    return await ProductService().getProducts();
}
