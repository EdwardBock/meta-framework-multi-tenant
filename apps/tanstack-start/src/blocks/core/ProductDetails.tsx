import {Context} from "~/blocks/Blocks";
import {useQuery} from "@tanstack/react-query";
import {getProduct} from "~/data/product";

export default function ProductDetails(props: {context: Context}) {
		const result = useQuery({
			queryKey: [`product`, `product:${props.context.id}`],
			queryFn: (args)=>{
				return getProduct({data: {id:parseInt(props.context.id)}});
			},
		});
		if(result.isLoading){
			return <p>Loading...</p>
		}
    if (!result.data) {
        return (
            <div>Product not found</div>
        )
    }
		const product = result.data;
    return (
        <>
            <h1>{product.name}</h1>
            <img src={product.image} alt={""} />
            <p>{product.description}f</p>
        </>
    )
}
