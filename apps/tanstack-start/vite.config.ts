import {defineConfig} from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths'
import viteReact from '@vitejs/plugin-react'
import {tanstackStart} from "@tanstack/react-start/plugin/vite";
import { nitro } from 'nitro/vite'
export default defineConfig({
    server: {
        port: 3000,
        allowedHosts: true,
        host: "0.0.0.0",
    },
    plugins: [
        tsConfigPaths({
            projects: ['./tsconfig.json'],
        }),
        tanstackStart(),
	      nitro(),
        viteReact(),
    ],
})
