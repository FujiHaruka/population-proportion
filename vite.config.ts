import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  base: "/population-proportion/",
  plugins: [solidPlugin()],
  build: {
    target: 'esnext',
    polyfillDynamicImport: false,
  },
});
