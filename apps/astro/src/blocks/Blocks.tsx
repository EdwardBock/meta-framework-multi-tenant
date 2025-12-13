import {BlocksMap} from '~/blocks/BlocksMap'
import {ErrorBoundary} from "react-error-boundary";

type Tenant = {
    slug: string
}

export type Block = {
    blockType: string
}

export type Context = Record<string, string>

export type Props = {
    value: Block[]
    tenant: Tenant
    context: Context
}

export default function Blocks(
    {
        value,
        tenant,
        context,
    }: Props,
) {

    return (
        <>
            {value.map(async (block, index) => {

                const BlockComponent = BlocksMap[tenant.slug]?.[block.blockType]
                    ?? BlocksMap?.core?.[block.blockType]

                if (!BlockComponent) {
                    return <NotFoundBlock
                        key={`${block.blockType}-${index}`}
                        blockType={block.blockType}
                    />
                }

                return <ErrorBoundary
                    key={`${block.blockType}-${index}`}
                    fallback={<p>Error with block[{index}]: {block.blockType} for tenant {tenant.slug}</p>}
                >
                    <BlockComponent
                        key={`${block.blockType}-${index}`}
                        context={context}
                        {...block}
                    />
                </ErrorBoundary>
            })}
        </>
    )
}

function NotFoundBlock({blockType}: { blockType: string }) {
    return <p>{blockType} not implemented yet!</p>
}

