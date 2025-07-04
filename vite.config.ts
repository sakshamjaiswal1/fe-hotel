import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { join } from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: true,
      },
    }),
  ],
  resolve: {
    alias: {
      '@': join(__dirname, './src'),
      '@assets': join(__dirname, '.src/assets'),
      '@components': join(__dirname, 'src/components'),
      contract: join(__dirname, 'src/contract'),
      components: join(__dirname, 'src/components'),
      '@modules': join(__dirname, 'src/modules'),
      '@layouts': join(__dirname, 'src/layouts'),
      layouts: join(__dirname, 'src/layouts'),
      '@pages': join(__dirname, 'src/pages'),
      pages: join(__dirname, 'src/pages'),
      '@utility': join(__dirname, 'src/utility'),
      utility: join(__dirname, 'src/utility'),
      '@stores': join(__dirname, 'src/stores'),
      '@hooks': join(__dirname, 'src/hooks'),
      hooks: join(__dirname, 'src/hooks'),
      '@enum': join(__dirname, 'src/enum'),
      '@hoc': join(__dirname, 'src/hoc'),
      '@interface': join(__dirname, 'src/interface'),
      '@scss': join(__dirname, 'src/scss'),
  },
  },

  server: {
    proxy: {
      "/github-api": {
        target: "https://raw.githubusercontent.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/github-api/, ""),
      },
      "/api": {

        target: "https://api-staging2.chaquen.io",

        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
    port: 9029,
    host: "0.0.0.0",
  },
});
