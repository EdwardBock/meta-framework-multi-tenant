import {ProductService} from "@mfmt/service";
import {Link} from "@tanstack/react-router";

export default async function ProductSearch() {
    const products = await ProductService().getProducts();
    return (
        <>
            <ul>
                {products.map((product) => {
                    return (
                        <li key={product.id}>
                            <Link to={`/products/${product.id}` as any}>{product.name}</Link>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}
