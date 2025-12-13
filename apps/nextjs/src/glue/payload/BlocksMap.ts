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
        AccordionBlock: dynamic(() => import('@/glue/payload/core/AccordionBlock')),
        Banner: dynamic(() => import('@/glue/payload/core/Banner')),
        Quote: dynamic(() => import('@/glue/payload/core/QuoteBlock')),
        Ticket: dynamic(() => import('@/glue/payload/core/Ticket')),
        WelcomeBlock: dynamic(() => import('@/glue/payload/core/WelcomeBlock')),
        ProductSearch: dynamic(()=> import('@/glue/payload/core/ProductSearch')),
        ProductDetails: dynamic(()=> import('@/glue/payload/core/ProductDetails')),
    },
    // blocks specific to tenant one
    tenant_one: {
        Banner: dynamic(() => import('@/glue/payload/tenant_overwrite/tenant_one/Banner')),
    },
    // blocks specific to tenant two
    tenant_two: {
        Ticket: dynamic(() => import('@/glue/payload/tenant_overwrite/tenant_two/Ticket')),
    },
}
