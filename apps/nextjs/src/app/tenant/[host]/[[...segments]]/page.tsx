import {notFound} from "next/navigation";
import Blocks from "@/blocks/Blocks";
import {loadData} from "./data";
import styles from "./page.module.css";

type Params = {
    host: string
    segments: string[]
}

export type Props = {
    params: Promise<Params>
}

export const revalidate = 60;

export async function generateStaticParams() {
    // TODO: maybe preload all tenants with all paths?
    return [];
}

export default async function Home(props: Props) {

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
