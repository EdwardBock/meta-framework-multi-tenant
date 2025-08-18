import {useQuery} from "@tanstack/react-query";
import {actions} from "astro:actions";

export default function ProductSearch() {

    const query = useQuery({
        queryKey: ['products'],
        queryFn: async ()=>{
            const {data} = await actions.products();
            return data;
        },
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
