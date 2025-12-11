import {notFound} from "next/navigation";
import Blocks from "@/blocks/Blocks";
import {loadData} from "./data";
import styles from "./page.module.css";

export type Props = PageProps<"/tenant/[host]/[[...segments]]">

export const revalidate = 60;

export async function generateStaticParams() {
    // TODO: maybe preload all tenants with all paths?
    return [];
}

export default async function PortalPage(props: Props) {

    const data = await loadData(props);

    if (!data) {
        notFound();
    }

    const {
        tenant,
        page,
        context,
    } = data;

    return (
        <div className={styles.page}>
            <h1>{page.title}</h1>
            <main className={styles.main}>
                <Blocks value={page.blocks} tenant={tenant} context={context}/>
            </main>
        </div>
    );
}
