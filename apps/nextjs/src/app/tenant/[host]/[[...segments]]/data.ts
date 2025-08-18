import {type Props} from "./page";
import {TenantRepository} from "@mfmt/cms";


export async function loadData(props: Props) {

    const params = await props.params;
    const path = `/${params.segments?.join("/") ?? ""}`;
    console.debug("Generating page...", params, path);
    const repo = TenantRepository(params.host);
    const result = await repo?.getPage(path);

    if(!repo || !result){
        return null;
    }

    return {
        tenant: {
            slug: await repo.getSlug(),
        },
        ...result,
    }
}
