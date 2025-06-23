// vite.config.js
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig(({ command, mode }) => {
  const repoName = process.env.GITHUB_REPOSITORY
    ? process.env.GITHUB_REPOSITORY.split('/')[1]
    : ''; // This will be 'fleet-mucky-mayhem' during GitHub Actions runs

  let base = '/';
  if (process.env.VITE_PREVIEW_BUILD === 'true' && repoName) {
    base = `/${repoName}/`; // e.g., /fleet-mucky-mayhem/
  }

  return {
    root: resolve(__dirname, 'src'), // Your source index.html is in src/

    base: base, // Crucial for correct asset pathing in the built index.html

    build: {
      outDir: resolve(__dirname, 'public'), // Output to project_root/public/
      emptyOutDir: true,
      // rollupOptions can be added here if needed for more complex builds
    },

    server: {
      port: 8080,
    },
  };
});