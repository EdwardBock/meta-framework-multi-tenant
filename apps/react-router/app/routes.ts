import {route, type RouteConfig} from "@react-router/dev/routes";

export default [
    route('api/products', 'resource/products.ts'),
    route('api/products/:id', 'resource/product.ts'),
    route('*?', 'routes/page.tsx'),
] satisfies RouteConfig;
