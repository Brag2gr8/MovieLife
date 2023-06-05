


// import { defineConfig } from 'vite'
//  import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// export default defineConfig({
//  plugins: [react()],
// })


import { defineConfig } from 'vite';
import { VitePluginRedirect } from 'vite-plugin-redirect';

export default defineConfig({
  plugins: [
    VitePluginRedirect({
      // Redirect all routes to index.html
      // "*" matches all paths
      from: '.*',
      to: '/index.html',
    }),
  ],
});
