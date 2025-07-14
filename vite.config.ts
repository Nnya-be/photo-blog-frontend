import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
// import { componentTagger } from 'lovable-tagger'; // Commented out for now

import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';
import rollupNodePolyFill from 'rollup-plugin-node-polyfills';

export default defineConfig(({ mode }) => {
  return {
    base: '/photo-blog-frontend/',
    server: {
      host: '::',
      port: 8080,
    },
    plugins: [
      react(),
      // Uncomment only if the package is installed
      // mode === 'development' && componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        buffer: 'buffer',
      },
    },
    optimizeDeps: {
      esbuildOptions: {
        define: {
          global: 'globalThis',
        },
        plugins: [
          NodeGlobalsPolyfillPlugin({
            buffer: true,
          }),
          NodeModulesPolyfillPlugin(),
        ],
      },
    },
    build: {
      rollupOptions: {
        plugins: [
          rollupNodePolyFill(),
        ],
      },
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
    define: {
      global: {},
      'process.env.NODE_ENV': JSON.stringify(mode || 'development'),
    },
  };
});