import {createServerFn} from "@tanstack/react-start";
import {repositoryMiddleware} from "~/middleware/repository";
import {notFound} from "@tanstack/react-router";
import {getCachedNavigation, getCachedPage, setCachedNavigation, setCachedPage} from "~/utils/redis";
import {getCacheTTLForPath} from "~/utils/cache";


export const getNavigation = createServerFn({
	method: 'GET',
})
	.middleware([repositoryMiddleware])
	.handler(async (args) => {
		const repo = args.context.repo;

		if (!repo) {
			throw notFound();
		}
		const tenant = await repo.getSlug();

		const cached = await (getCachedNavigation(tenant) as ReturnType<typeof repo.getNavigation>);
		if (cached) {
			return cached;
		}

		const navigation = await repo.getNavigation();

		await setCachedNavigation(tenant, navigation);

		return navigation;
	})
