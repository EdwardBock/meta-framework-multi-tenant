// import "server-only";

export type Database = {
    [slug: string]: Tenant
}

type PagePaths<T extends Page> = T['path'];

export type Tenant<T extends Page = Page> = {
    hosts: string[]
		navigation: Array<{
			label: string
			path: PagePaths<T>
		}>
    pages: Array<T>
}

export type Page = {
    path: string
    title: string
    blocks: Array<Block>
}

export type Block = {
    blockType: string
}

export const Database: Database = {
    "tenant_one": {
        hosts: ["tenant_one.local"],
	    navigation: [
		    {
					label: "Home",
			    path: "/"
		    },
		    {
			    label: "Products",
			    path: "/products"
		    },
		    {
			    label: "Login",
			    path: "/login"
		    }
	    ],
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
            },
            {
                title: "Event Product",
                path: "/events/:eventId/products/:productId",
                blocks: [
                    {
                        blockType: "EventProductDetails"
                    }
                ]
            },
            {
                title: "User Settings",
                path: "/users/:userId/settings",
                blocks: [
                    {
                        blockType: "UserSettingsBlock"
                    }
                ]
            }
        ]
    },
    "tenant_two": {
        hosts: ["tenant_two.local"],
	    navigation: [
		    {
			    label: "Home",
			    path: "/"
		    },
		    {
			    label: "Sign in",
			    path: "/sign-in"
		    }
	    ],
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
