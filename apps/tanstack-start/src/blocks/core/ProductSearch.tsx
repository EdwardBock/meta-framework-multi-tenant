import {Link} from "@tanstack/react-router";
import {useQuery} from "@tanstack/react-query";
import {getProducts} from "~/data/products";

export default function ProductSearch() {
	const query = useQuery({ queryKey: ['products'], queryFn: getProducts })

	if(query.isLoading){
		return <p>Loading...</p>
	}

    return (
        <>
            <ul>
                {query.data?.map((product) => {
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
