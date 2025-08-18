import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import {ProductService} from "@mfmt/service";

const productService = ProductService();

export const server = {
    products: defineAction({
        handler: async ()=>{
            return productService.getProducts();
        }
    }),
    getProduct: defineAction({
        input: z.number(),
        handler: async (id)=>{
            return productService.getProductById(id);
        }
    })
}
