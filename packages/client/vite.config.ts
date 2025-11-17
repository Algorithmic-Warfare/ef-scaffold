import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import tailwindcss from "@tailwindcss/vite";

// Updated Vite config: enable Tailwind v4 plugin for JIT styling
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgr({
      // svgr options: https://react-svgr.com/docs/options/
      svgrOptions: {
        exportType: "default",
        ref: true,
        svgo: false,
        titleProp: true,
      },
      include: "**/*.svg",
    }),
  ],
  server: {
    port: parseInt(process.env.VITE_PORT || "3000", 10),
  },
  build: {
    target: "es2022",
  },
  base: "/",
});
