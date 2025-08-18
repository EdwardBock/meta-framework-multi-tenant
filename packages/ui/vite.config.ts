/// <reference types="vitest/config" />
/// <reference types="vite/client" />
import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [react()],
});
