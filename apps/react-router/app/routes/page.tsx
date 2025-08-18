import {type Route} from "../../.react-router/types/app/routes/+types/page";
import {TenantRepository} from "@mfmt/cms";
import Blocks from "~/blocks/Blocks";

export async function loader({params, request}: Route.LoaderArgs) {
    const {'*': splat} = params;

    const url = new URL(request.url);

    const repo = TenantRepository(url.hostname);
    const result = await repo?.getPage(`/${splat ?? ""}`);

    if (!repo || !result) throw new Response("Page not found", {status: 404});
    const {page, context} = result;

    return {
        tenant: {
            slug: await repo.getSlug()
        },
        page,
        context,
    };
}

export function meta({loaderData}: Route.MetaArgs) {
    return [
        {title: loaderData?.page?.title ?? 'Some Meta title'},
        {name: "description", content: "Welcome to React Router!"},
    ];
}

export default function Page(
    {
        params,
        loaderData,
    }: Route.ComponentProps
) {
    const {page, tenant, context} = loaderData;
    return <Blocks value={page.blocks} tenant={tenant} context={context}/>;
}
