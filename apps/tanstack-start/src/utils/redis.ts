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

export function generateCacheKey(tenant: string, path: string): string {
  return `page:${tenant}:${path}`;
}

export async function getCachedPage(tenant: string, path: string) {
  try {
    const client = await getRedisClient();
    const key = generateCacheKey(tenant, path);
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
    const key = generateCacheKey(tenant, path);
    await client.setEx(key, ttl, JSON.stringify(data));
  } catch (error) {
    console.error('Cache set error:', error);
  }
}

export async function invalidatePageCache(tenant: string, path: string) {
  try {
    const client = await getRedisClient();
    const key = generateCacheKey(tenant, path);
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