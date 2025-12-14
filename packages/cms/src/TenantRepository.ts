import delay from "./delay";
import {Database, Page} from "./database";

interface RouteMatch {
    page: Page;
    params: Record<string, string>;
    score: number;
}

export function matchRoute(requestPath: string, pages: Page[]): RouteMatch | null {
    let bestMatch: RouteMatch | null = null;

    for (const page of pages) {
        const match = matchPath(requestPath, page.path);
        if (match) {
            if (!bestMatch || match.score > bestMatch.score) {
                bestMatch = {
                    page,
                    params: match.params,
                    score: match.score
                };
            }
        }
    }

    return bestMatch;
}

export function matchPath(requestPath: string, routePath: string): { params: Record<string, string>; score: number } | null {
    const normalizedRequest = normalizePath(requestPath);
    const normalizedRoute = normalizePath(routePath);

    if (normalizedRequest === normalizedRoute) {
        return { params: {}, score: 100 };
    }

    const requestSegments = normalizedRequest.split('/').filter(Boolean);
    const routeSegments = normalizedRoute.split('/').filter(Boolean);

    if (requestSegments.length !== routeSegments.length) {
        return null;
    }

    const params: Record<string, string> = {};
    let staticSegments = 0;

    for (let i = 0; i < routeSegments.length; i++) {
        const routeSegment = String(routeSegments[i]);
        const requestSegment = String(requestSegments[i]);

        if (routeSegment.startsWith(':')) {
            const paramName = routeSegment.slice(1);
            params[paramName] = requestSegment;
        } else if (routeSegment === requestSegment) {
            staticSegments++;
        } else {
            return null;
        }
    }

    const score = staticSegments * 10;

    return { params, score };
}

export function normalizePath(path: string): string {
    return '/' + path.replace(/^\/+/, '').replace(/\/+$/, '');
}

export default function TenantRepository(host: string){

    console.debug("TenantRepository", host);

    const slug = Object.keys(Database).find(slug=> Database[slug]?.hosts.includes(host) );
    if(!slug) return null;

    const data = Database[slug];
    if(!data) return null;

    return {
        async get(){
          return data;
        },
        async getSlug(){
            return slug;
        },
	    async getNavigation(){
		    await delay(1000);
				return data.navigation;
	    },
        async getPage(path: string){
            await delay(1000);

            const match = matchRoute(path, data.pages);

            if(!match){
                return null;
            }

            return {
                page: match.page,
                context: match.params,
            }
        },
    }
}
