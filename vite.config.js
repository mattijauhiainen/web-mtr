import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  root: ".",
  // Github pages appends project name into the URL. Configure build to use
  // relative URLs istead of root of the site (/) to make imports work.
  base: "./",
  build: {
    // Github pages only allows serving from root or docs. Write output to docs
    // to make deploys work.
    outDir: "./docs",
  },
});
