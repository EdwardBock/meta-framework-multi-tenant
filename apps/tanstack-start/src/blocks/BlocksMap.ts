import {ComponentType, lazy} from 'react'

type BlocksMap = {
    [tenant: string]: {
        // ignore use of any because I don't find any other solution
        // types will be checked in the blocks themselves
        // eslint-disable-next-line
        [blockType: string]: ComponentType<any>
    }
}

export const BlocksMap: BlocksMap = {
    // whitelabel blocks that are used if no tenant specific block is available
    core: {
        AccordionBlock: lazy(() => import('~/blocks/core/AccordionBlock')),
        Banner: lazy(() => import('~/blocks/core/Banner')),
        Quote: lazy(() => import('~/blocks/core/QuoteBlock')),
        Ticket: lazy(() => import('~/blocks/core/Ticket')),
        WelcomeBlock: lazy(() => import('~/blocks/core/WelcomeBlock')),
        ProductSearch: lazy(()=> import('~/blocks/core/ProductSearch')),
        ProductDetails: lazy(()=> import('~/blocks/core/ProductDetails')),
    },
    // blocks specific to tenant one
    tenant_one: {
        Banner: lazy(() => import('./tenant_one/Banner')),
    },
    // blocks specific to tenant two
    tenant_two: {
        Ticket: lazy(() => import('./tenant_two/Ticket')),
    },
}
