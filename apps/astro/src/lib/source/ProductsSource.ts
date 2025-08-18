import {ProductService} from "@mfmt/service";

type Product = Awaited<ReturnType<(ReturnType<typeof ProductService>)["getProducts"]>>[number];

export default function ProductsSource(){
    return {

        fetchProducts: ()=>
            fetch(`/api/products.json`)
                .then(res => res.json() as Promise<Product[]>),

        fetchProduct: (id:string) => fetch(`/api/products/${id}.json`)
            .then(res => res.json() as Promise<Product>)
            .catch(err => {
                console.log(err);
                return null;
            }),
    }
}
