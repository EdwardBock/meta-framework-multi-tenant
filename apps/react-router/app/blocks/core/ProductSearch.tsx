import {ProductService} from "@mfmt/service";
import {useQuery} from "@tanstack/react-query";

export default function ProductSearch() {

    const query = useQuery({
        queryKey: ['products'],
        queryFn: () => {
            return ProductService().getProducts();
        }
    });

    if(query.status == "pending") {
        return <p>Loading...</p>;
    }

    return (
        <>
            <ul>
                {query.data?.map((product) => {
                    return (
                        <li key={product.id}>
                            <a href={`/products/${product.id}`}>{product.name}</a>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}
