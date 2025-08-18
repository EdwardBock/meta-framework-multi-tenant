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
            allowedHosts: true,
            host: "0.0.0.0",
        },
    },
});
