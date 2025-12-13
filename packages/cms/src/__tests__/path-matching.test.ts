import { describe, it, expect } from 'vitest';
import { matchRoute, matchPath, normalizePath } from '../TenantRepository';
import { Page } from '../database';

// Test pages for comprehensive testing
const testPages: Page[] = [
    { path: '/', title: 'Home', blocks: [] },
    { path: '/products', title: 'Products', blocks: [] },
    { path: '/products/:id', title: 'Product Details', blocks: [] },
    { path: '/events', title: 'Events', blocks: [] },
    { path: '/events/:eventId', title: 'Event Details', blocks: [] },
    { path: '/events/:eventId/products/:productId', title: 'Event Product', blocks: [] },
    { path: '/users/:userId/settings', title: 'User Settings', blocks: [] },
    { path: '/login', title: 'Login', blocks: [] },
];

describe('Path Matching Algorithm', () => {
    describe('normalizePath', () => {
        it('should normalize paths with leading/trailing slashes', () => {
            expect(normalizePath('/')).toBe('/');
            expect(normalizePath('')).toBe('/');
            expect(normalizePath('/products')).toBe('/products');
            expect(normalizePath('products/')).toBe('/products');
            expect(normalizePath('/products/')).toBe('/products');
            expect(normalizePath('//products//')).toBe('/products');
        });
    });

    describe('matchPath', () => {
        it('should match exact paths with highest score', () => {
            const result = matchPath('/products', '/products');
            expect(result).toEqual({ params: {}, score: 100 });
        });

        it('should match single parameter routes', () => {
            const result = matchPath('/products/123', '/products/:id');
            expect(result).toEqual({ params: { id: '123' }, score: 10 });
        });

        it('should match multiple parameter routes', () => {
            const result = matchPath('/events/456/products/789', '/events/:eventId/products/:productId');
            expect(result).toEqual({ 
                params: { eventId: '456', productId: '789' }, 
                score: 20 
            });
        });

        it('should return null for non-matching paths', () => {
            expect(matchPath('/products', '/users')).toBeNull();
            expect(matchPath('/products/123/extra', '/products/:id')).toBeNull();
            expect(matchPath('/products', '/products/:id')).toBeNull();
        });

        it('should prioritize exact matches over parameterized routes', () => {
            const exactResult = matchPath('/products', '/products');
            const paramResult = matchPath('/products', '/products/:id');
            
            expect(exactResult?.score).toBe(100);
            expect(paramResult).toBeNull(); // Different segment count
        });

        it('should handle complex parameter names', () => {
            const result = matchPath('/users/123/settings', '/users/:userId/settings');
            expect(result).toEqual({ params: { userId: '123' }, score: 20 });
        });
    });

    describe('matchRoute', () => {
        it('should find the best match among multiple routes', () => {
            const result = matchRoute('/products/123', testPages);
            expect(result).toBeTruthy();
            expect(result!.page.title).toBe('Product Details');
            expect(result!.params).toEqual({ id: '123' });
        });

        it('should prioritize exact matches', () => {
            const result = matchRoute('/products', testPages);
            expect(result).toBeTruthy();
            expect(result!.page.title).toBe('Products');
            expect(result!.params).toEqual({});
        });

        it('should return null for no matches', () => {
            const result = matchRoute('/nonexistent', testPages);
            expect(result).toBeNull();
        });

        it('should handle complex multi-parameter routes', () => {
            const result = matchRoute('/events/event-123/products/product-456', testPages);
            expect(result).toBeTruthy();
            expect(result!.page.title).toBe('Event Product');
            expect(result!.params).toEqual({ 
                eventId: 'event-123', 
                productId: 'product-456' 
            });
        });
    });
});