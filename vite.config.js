import { resolve } from 'path';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import fs from 'fs';
import path from 'path';

// Dynamically scan src folders for entry points
function getInputEntries(dir, baseDir = dir) {
  const entries = {};
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      Object.assign(entries, getInputEntries(fullPath, baseDir));
    } else if (/\.(js|ts|jsx|tsx|html)$/.test(file)) {
      const entryName = path
        .relative(baseDir, fullPath)
        .replace(/\\/g, '/')
        .replace(/\.(js|ts|jsx|tsx|html)$/, '');
      entries[entryName] = resolve(fullPath);
    }
  }

  return entries;
}

export default defineConfig({
  root: './',
  publicDir: 'public',

  build: {
    outDir: 'dist',
    emptyOutDir: true,

    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        ...getInputEntries('src'),
      },
      output: {
        // Preserve directory structure in dist/assets
        entryFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',

        manualChunks(id) {
          if (id.includes('node_modules')) {
            const segments = id.split('node_modules/')[1].split('/');
            return segments[0].startsWith('@')
              ? `${segments[0]}/${segments[1]}`
              : segments[0];
          }
          return null;
        },
      },
    },

    minify: 'esbuild',
  },

  plugins: [
    eslint({
      cache: false,
      fix: true,
    }),
  ],
});
