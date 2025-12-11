// @ts-check
import {defineConfig} from 'astro/config';

import react from '@astrojs/react';

import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
    integrations: [react({
        experimentalReactChildren: true,
    })],
    output: 'server',
    adapter: node({
        mode: 'standalone'
    }),
    vite: {
        server: {
            allowedHosts: ['tenant_one.local', 'tenant_two.local', 'localhost'],
            host: "0.0.0.0",
            port: 4321,
        },
    },
});
