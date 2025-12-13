import { describe, it, expect } from 'vitest';
import TenantRepository from '../TenantRepository';

describe('TenantRepository Integration', () => {
    describe('Basic routing', () => {
        it('should match exact paths', async () => {
            const repo = TenantRepository('tenant_one.local');
            expect(repo).toBeTruthy();

            const result = await repo?.getPage('/products');
            expect(result).toBeTruthy();
            expect(result!.context).toEqual({});
            expect(result!.page.title).toBe('Products');
        });

        it('should match single parameter routes', async () => {
            const repo = TenantRepository('tenant_one.local');
            expect(repo).toBeTruthy();

            const result = await repo?.getPage('/products/123');
            expect(result).toBeTruthy();
            expect(result!.context).toEqual({ id: '123' });
            expect(result!.page.title).toBe('Product Title');
        });

        it('should return null for non-matching paths', async () => {
            const repo = TenantRepository('tenant_one.local');
            expect(repo).toBeTruthy();

            const result = await repo?.getPage('/nonexistent/path');
            expect(result).toBeNull();
        });
    });

    describe('Parameter Extraction', () => {
        it('should extract single parameter correctly', async () => {
            const repo = TenantRepository('tenant_one.local');
            expect(repo).toBeTruthy();

            const result = await repo?.getPage('/products/product-123');
            expect(result).toBeTruthy();
            expect(result!.context).toEqual({ id: 'product-123' });
        });

        it('should handle parameters with special characters', async () => {
            const repo = TenantRepository('tenant_one.local');
            expect(repo).toBeTruthy();

            const result = await repo?.getPage('/products/my-product_2024');
            expect(result).toBeTruthy();
            expect(result!.context).toEqual({ id: 'my-product_2024' });
        });

        it('should handle numeric parameters', async () => {
            const repo = TenantRepository('tenant_one.local');
            expect(repo).toBeTruthy();

            const result = await repo?.getPage('/products/42');
            expect(result).toBeTruthy();
            expect(result!.context).toEqual({ id: '42' });
        });
    });

    describe('Edge Cases', () => {
        it('should handle root path', async () => {
            const repo = TenantRepository('tenant_one.local');
            expect(repo).toBeTruthy();

            const result = await repo?.getPage('/');
            expect(result).toBeTruthy();
            expect(result!.page.title).toBe('Home T1');
            expect(result!.context).toEqual({});
        });

        it('should handle paths with trailing slashes', async () => {
            const repo = TenantRepository('tenant_one.local');
            expect(repo).toBeTruthy();

            const result = await repo?.getPage('/products/');
            expect(result).toBeTruthy();
            expect(result!.page.title).toBe('Products');
        });

        it('should handle empty paths', async () => {
            const repo = TenantRepository('tenant_one.local');
            expect(repo).toBeTruthy();

            const result = await repo?.getPage('');
            expect(result).toBeTruthy();
            expect(result!.page.title).toBe('Home T1');
        });
    });

    describe('Multi-tenant Routing', () => {
        it('should work with different tenants', async () => {
            const repo1 = TenantRepository('tenant_one.local');
            const repo2 = TenantRepository('tenant_two.local');

            expect(repo1).toBeTruthy();
            expect(repo2).toBeTruthy();

            if (repo1) {
                const result1 = await repo1.getPage('/products/123');
                expect(result1).toBeTruthy();
                expect(result1!.page.title).toBe('Product Title');
            }

            if (repo2) {
                const result2 = await repo2.getPage('/sign-in');
                expect(result2).toBeTruthy();
                expect(result2!.page.title).toBe('Sign in to T1');
            }
        });

        it('should return null for invalid tenant', () => {
            const repo = TenantRepository('invalid.local');
            expect(repo).toBeNull();
        });
    });

    describe('Multi-parameter Routes', () => {
        it('should handle event product routes', async () => {
            const repo = TenantRepository('tenant_one.local');
            expect(repo).toBeTruthy();

            const result = await repo?.getPage('/events/conf-2024/products/laptop-123');
            expect(result).toBeTruthy();
            expect(result!.context).toEqual({
                eventId: 'conf-2024',
                productId: 'laptop-123'
            });
            expect(result!.page.title).toBe('Event Product');
        });

        it('should handle user settings routes', async () => {
            const repo = TenantRepository('tenant_one.local');
            expect(repo).toBeTruthy();

            const result = await repo?.getPage('/users/user-456/settings');
            expect(result).toBeTruthy();
            expect(result!.context).toEqual({ userId: 'user-456' });
            expect(result!.page.title).toBe('User Settings');
        });
    });
});
