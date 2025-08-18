import {createFileRoute} from '@tanstack/react-router'
import {createMiddleware, createServerFn} from "@tanstack/react-start";

const hostMiddleware = createMiddleware({type: 'function'}).server(
    async ({next, data}) => {
        console.log('Request received:', data)
        const result = await next()
        console.log('Response processed:', result)
        return result
    },
)

const getTheme = createServerFn({
    method: 'GET',
})
    .middleware([hostMiddleware])
    .handler((args) => {
        return `/themes/tenant_two.css`;
    })

export const Route = createFileRoute('/$')({
    component: App,
    loader: async (args) => {
        const {_splat} = args.params;

        // console.debug(await args.parentMatchPromise)
        //TenantRepository(args.location);

        console.debug("Server only?")
        console.debug(_splat);

        return {
            path: args.location.pathname,
            theme: await getTheme(),
        };
    }
});

function App() {
    const {_splat} = Route.useParams();
    const path = `/${_splat}`;

    const {theme} = Route.useLoaderData();
    console.debug(path);

    return (
        <div className="p-2">
            <link rel="stylesheet" href={`${theme}`}/>
            <h3>Welcome Home!!!</h3>
            <p>Path: {path}</p>
        </div>
    )
}
