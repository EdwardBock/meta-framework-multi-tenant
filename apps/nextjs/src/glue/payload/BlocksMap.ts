import dynamic from 'next/dynamic'
import {ComponentType} from 'react'

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
        AccordionBlock: dynamic(() => import('@/blocks/core/AccordionBlock')),
        Banner: dynamic(() => import('@/blocks/core/Banner')),
        Quote: dynamic(() => import('@/blocks/core/QuoteBlock')),
        Ticket: dynamic(() => import('@/blocks/core/Ticket')),
        WelcomeBlock: dynamic(() => import('@/blocks/core/WelcomeBlock')),
        ProductSearch: dynamic(()=> import('@/blocks/core/ProductSearch')),
        ProductDetails: dynamic(()=> import('@/blocks/core/ProductDetails')),
    },
    // blocks specific to tenant one
    tenant_one: {
        Banner: dynamic(() => import('./tenant_one/Banner')),
    },
    // blocks specific to tenant two
    tenant_two: {
        Ticket: dynamic(() => import('./tenant_two/Ticket')),
    },
}
