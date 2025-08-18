import Blocks, {type Props} from "~/blocks/Blocks.tsx";
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App(props: Props) {
    return (
        <QueryClientProvider client={queryClient}>
            <Blocks {...props} />
        </QueryClientProvider>
    )
}
