import {createFileRoute} from '@tanstack/react-router'
import {getTheme} from "~/data/theme";
import {getPage} from "~/data/page";
import Blocks from "~/blocks/Blocks";
import {getSlug} from "~/data/slug";

export const Route = createFileRoute('/$')({
    component: App,
    loader: async (args) => {
        const {_splat} = args.params;
        const path = `/${_splat}`
        const result = await getPage({data: {path}});
        return {
            page: result.page,
            context: result.context,
            slug: await getSlug(),
            theme: await getTheme(),
        };
    },
    head: ({loaderData}) => ({
        meta: [
            {
                name: 'description',
                content: 'My App is a web application',
            },
            {
                title: loaderData?.page?.title ?? 'Title not found',
            },
        ]
    }),
});

function App() {
    const {_splat} = Route.useParams();
    const path = `/${_splat}`;

    const {theme, page, slug, context} = Route.useLoaderData();

    return (
        <div className="p-2">
            <link rel="stylesheet" href={`${theme}`}/>
            <h3>{page.title}</h3>
            <p>Path: {path}</p>
            <main>
                <Blocks value={page.blocks} tenant={{slug}} context={context}/>
            </main>
        </div>
    )
}
