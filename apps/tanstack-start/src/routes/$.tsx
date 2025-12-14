import {createFileRoute} from '@tanstack/react-router'
import {getPage} from "~/data/page";
import Blocks from "~/blocks/Blocks";
import {getSlug} from "~/data/slug";
import {useMemo} from "react";

export const Route = createFileRoute('/$')({
    component: App,
    loader: async (args) => {
        const {_splat} = args.params;
        const path = `/${_splat}`
        const result = await getPage({data: {path}});
				console.debug("PAGE", result);
        return {
            page: result.page,
            context: result.context,
            slug: await getSlug(),
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

    const {page, slug, context} = Route.useLoaderData();

		console.debug("APP", page);

	const tenant = useMemo(() => {
		return {slug};
	}, [slug]);

    return (
        <div className="p-2">
            <h3>{page.title}</h3>
            <p>Path: {path}</p>
            <main>
                <Blocks value={page.blocks} tenant={tenant} context={context}/>
            </main>
        </div>
    )
}
