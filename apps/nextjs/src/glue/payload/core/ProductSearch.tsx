import {ProductService} from "@mfmt/service";
import Link from "next/link";

export default async function ProductSearch() {
    const products = await ProductService().getProducts();
    return (
        <>
            <ul>
                {products.map((product) => {
                    return (
                        <li key={product.id}>
                            <Link href={`/products/${product.id}`}>{product.name}</Link>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}
