// vite.config.mjs
import { resolve } from 'path';
import { defineConfig } from 'vite';
import viteImagemin from 'vite-plugin-imagemin';

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

    plugins: [
      viteImagemin({
        // Optimize JPEG images
        mozjpeg: {
          quality: 80, // Adjust quality (0-100, lower = smaller file)
        },
        // Optimize PNG images
        optipng: {
          optimizationLevel: 7, // 0-7, higher = better compression (slower)
        },
        // Generate WebP versions
        webp: {
          quality: 80, // WebP quality (0-100)
        },
      }),
    ],

    build: {
      outDir: resolve(__dirname, 'public'), // Output to project_root/public/
      emptyOutDir: true,
    },

    server: {
      port: 8080,
    },

    // Reduce Sass deprecation noise and prefer modern behavior
    css: {
      preprocessorOptions: {
        scss: {
          // Silence specific deprecations if supported by the Sass impl
          silenceDeprecations: ['legacy-js-api'],
          // Reduce warnings from deps should any remain
          quietDeps: true,
        },
      },
    },
  };
});
