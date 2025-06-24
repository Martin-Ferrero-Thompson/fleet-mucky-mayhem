// vite.config.js
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig(({ command, mode }) => {
  const repoName = process.env.GITHUB_REPOSITORY
    ? process.env.GITHUB_REPOSITORY.split('/')[1]
    : ''; 

  let base = '/';
  if (process.env.VITE_PREVIEW_BUILD === 'true' && repoName) {
    base = `/${repoName}/`; 
  }

  return {
    root: resolve(__dirname, 'src'), // Your source index.html is in src/

    base: base, // Crucial for correct asset pathing in the built index.html

    build: {
      outDir: resolve(__dirname, 'public'), // Output to project_root/public/
      emptyOutDir: true,      
    },

    server: {
      port: 8080,
    },
  };
});