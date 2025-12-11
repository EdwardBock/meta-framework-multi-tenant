import {createMiddleware} from "@tanstack/react-start";
import {TenantRepository} from "@mfmt/cms";


export const repositoryMiddleware = createMiddleware().server(
    async ({next, request}) => {
        const host = request.headers.get('host')?.split(":")[0]
        console.log("host",host)
        const repo = host ? TenantRepository(host) : null;
        const result = await next({
            context: {
                repo: repo,
            }
        })
        return result
    },
)