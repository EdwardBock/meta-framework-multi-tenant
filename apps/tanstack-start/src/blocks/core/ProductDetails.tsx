import {ProductService} from "@mfmt/service";
import {Context} from "~/blocks/Blocks";

export default async function ProductDetails(props: {context: Context}) {
    const product = await ProductService().getProductById(parseInt(props.context.id ?? ""));
    if (!product) {
        return (
            <div>Product not found</div>
        )
    }
    return (
        <>
            <h1>{product.name}</h1>
            <img src={product.image} alt={""} />
            <p>{product.description}f</p>
        </>
    )
}
