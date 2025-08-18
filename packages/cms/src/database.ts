// import "server-only";

type Database = {
    [slug: string]: Tenant
}

type Tenant = {
    hosts: string[]
    pages: Array<Page>
}

type Page = {
    path: string
    title: string
    blocks: Array<Block>
}

type Block = {
    blockType: string
}

export const Database: Database = {
    "tenant_one": {
        hosts: ["tenant_one.local"],
        pages: [
            {
                title: "Home T1",
                path: "/",
                blocks: [
                    {
                        blockType: "WelcomeBlock"
                    },
                    {
                        blockType: "Ticket"
                    },
                    {
                        blockType: "AccordionBlock"
                    },
                    {
                        blockType: "Banner"
                    },
                ]
            },
            {
                title: "Products",
                path: "/products",
                blocks: [
                    {
                        blockType: "ProductSearch"
                    }
                ]
            },
            {
                title: "Product Title",
                path: "/products/:id",
                blocks: [
                    {
                        blockType: "ProductDetails"
                    }
                ]
            },
            {
                title: "Login to T1",
                path: "/login",
                blocks: [
                    {
                        blockType: "LoginFormBlock"
                    }
                ]
            }
        ]
    },
    "tenant_two": {
        hosts: ["tenant_two.local"],
        pages: [
            {
                title: "Home T2",
                path: "/",
                blocks: [
                    {
                        blockType: "WelcomeBlock"
                    },
                    {
                        blockType: "Ticket"
                    },
                    {
                        blockType: "Banner"
                    },
                ]
            },
            {
                title: "Sign in to T1",
                path: "/sign-in",
                blocks: [
                    {
                        blockType: "LoginFormBlock"
                    }
                ]
            }
        ]
    }
}
