import {createRouter} from '@tanstack/react-router'
import {routeTree} from './routeTree.gen'
import {DefaultCatchBoundary} from './components/DefaultCatchBoundary'
import {NotFound} from './components/NotFound'
import {QueryClient} from "@tanstack/react-query";
import {setupRouterSsrQueryIntegration} from "@tanstack/react-router-ssr-query";


export function getRouter() {
	const queryClient = new QueryClient()
    const router = createRouter({
        routeTree,
	    context: {
					queryClient,
	    },
        defaultPreload: 'intent',
        scrollRestoration: true,
        defaultErrorComponent: DefaultCatchBoundary,
        defaultNotFoundComponent: () => <NotFound />,
    });

	setupRouterSsrQueryIntegration({
		router,
		queryClient,
		// optional:
		// handleRedirects: true,
		// wrapQueryClient: true,
	})

    return router
}
