import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const here = (file: string) => fileURLToPath(new URL(file, import.meta.url));

// GitHub Pages user site (yosrarhim.github.io) is served from the domain root.
export default defineConfig(({ isSsrBuild }) => ({
  base: '/',
  plugins: [react()],
  build: {
    // The SSR bundle is only used at build time to pre-render index.html.
    copyPublicDir: !isSsrBuild,
    rollupOptions: isSsrBuild
      ? undefined
      : { input: { main: here('./index.html'), notFound: here('./404.html') } },
  },
}));
