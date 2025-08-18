import {ProductService} from "@mfmt/service";
import Link from "next/link";
import {Context} from "@/blocks/Blocks";
import Image from "next/image";

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
