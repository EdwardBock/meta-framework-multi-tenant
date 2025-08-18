import {type Context} from "~/blocks/Blocks";
import {useQuery} from "@tanstack/react-query";
import ProductsSource from "~/lib/source/ProductsSource.ts";


export default function ProductDetails(props: { context: Context }) {

    const query = useQuery({
        queryKey: [props.context.id, "product"],
        queryFn: ({queryKey: [id]}) => {
            if (!id) {
                return null;
            }
            return ProductsSource().fetchProduct(id);
        }
    });

    const product = query.data;

    if (query.status == "pending") {
        return <p>Loading product {props.context.id}...</p>;
    }

    if(!product) {
        return <p>Something went wrong...</p>
    }

    return (
        <>
            <h1>{product.name}</h1>
            <img src={product.image} alt={""}/>
            <p>{product.description}f</p>
        </>
    )
}
