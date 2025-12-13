import { invalidatePageCache, invalidateTenantCache } from './redis';

export class CacheManager {
  static async invalidatePageOnUpdate(tenant: string, path: string) {
    await invalidatePageCache(tenant, path);
  }

  static async invalidateTenantOnContentChange(tenant: string) {
    await invalidateTenantCache(tenant);
  }

  static async invalidateMultiplePages(tenant: string, paths: string[]) {
    const promises = paths.map(path => invalidatePageCache(tenant, path));
    await Promise.all(promises);
  }

  static generateCacheTags(tenant: string, path: string): string[] {
    return [`page:${tenant}:${path}`, `tenant:${tenant}`];
  }
}

export const CACHE_TTL = {
  PAGE: 3600, // 1 hour
  HOME: 1800, // 30 minutes
  DYNAMIC: 900, // 15 minutes
} as const;

export function getCacheTTLForPath(path: string): number {
  if (path === '/' || path === '') {
    return CACHE_TTL.HOME;
  }
  
  if (path.includes(':') || path.match(/\[.*\]/)) {
    return CACHE_TTL.DYNAMIC;
  }
  
  return CACHE_TTL.PAGE;
}