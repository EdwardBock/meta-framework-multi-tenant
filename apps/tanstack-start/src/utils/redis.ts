import { createClient } from 'redis';

let redisClient: ReturnType<typeof createClient> | null = null;

export async function getRedisClient() {
  if (!redisClient) {
    redisClient = createClient({
      url: process.env.REDIS_URL || 'redis://localhost:6379'
    });

    redisClient.on('error', (err) => {
      console.error('Redis Client Error:', err);
    });

    await redisClient.connect();
  }

  return redisClient;
}

export function generateNavigationCacheKey(tenant: string) {
	return `${tenant}:navigation`;
}

export async function getCachedNavigation(tenant: string) {
	try {
		const client = await getRedisClient();
		const key = generateNavigationCacheKey(tenant);
		const cached = await client.get(key);

		if (cached) {
			return JSON.parse(cached);
		}

		return null;
	} catch (error) {
		console.error('Cache get error:', error);
		return null;
	}
}

export async function setCachedNavigation(tenant: string, data: any, ttl: number = 3600) {
	try {
		const client = await getRedisClient();
		const key = generateNavigationCacheKey(tenant);
		await client.setEx(key, ttl, JSON.stringify(data));
	} catch (error) {
		console.error('Cache set error:', error);
	}
}

export function generatePageCacheKey(tenant: string, path: string) {
  return `${tenant}:page:${path}`;
}

export async function getCachedPage(tenant: string, path: string) {
  try {
    const client = await getRedisClient();
    const key = generatePageCacheKey(tenant, path);
    const cached = await client.get(key);

    if (cached) {
      return JSON.parse(cached);
    }

    return null;
  } catch (error) {
    console.error('Cache get error:', error);
    return null;
  }
}

export async function setCachedPage(tenant: string, path: string, data: any, ttl: number = 3600) {
  try {
    const client = await getRedisClient();
    const key = generatePageCacheKey(tenant, path);
    await client.setEx(key, ttl, JSON.stringify(data));
  } catch (error) {
    console.error('Cache set error:', error);
  }
}

export async function invalidatePageCache(tenant: string, path: string) {
  try {
    const client = await getRedisClient();
    const key = generatePageCacheKey(tenant, path);
    await client.del(key);
  } catch (error) {
    console.error('Cache invalidation error:', error);
  }
}

export async function invalidateTenantCache(tenant: string) {
  try {
    const client = await getRedisClient();
    const pattern = `page:${tenant}:*`;
    const keys = await client.keys(pattern);

    if (keys.length > 0) {
      await client.del(keys);
    }
  } catch (error) {
    console.error('Tenant cache invalidation error:', error);
  }
}
