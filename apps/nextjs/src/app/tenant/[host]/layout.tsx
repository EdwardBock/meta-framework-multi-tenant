import {TenantRepository} from "@mfmt/cms";
import {notFound} from "next/navigation";
import {PropsWithChildren} from "react";

type Props = PropsWithChildren<{
    params: Promise<{ host: string }>;
}>

export default async function TenantLayout(props: Props) {
    const params = await props.params;
    const repo = TenantRepository(params.host);

    if(!repo) {
        notFound();
    }

    // TODO: setup portal environment

    const slug = await repo.getSlug();

    return (
        <>
            <link href={`/themes/${slug}.css`} rel={"stylesheet"}/>
            {props.children}
        </>
    )
}
