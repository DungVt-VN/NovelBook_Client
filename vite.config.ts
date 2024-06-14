import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "./src/assets/styles/base/_variables.scss";
          @import "./src/assets/styles/base/_reset.scss";
          @import "./src/assets/styles/base/_typography.scss";
          @import "./src/assets/styles/base/_global.scss";
          @import "./src/assets/styles/base/utilities.scss";
          @import "./src/assets/styles/base/_animations.scss";
          @import "./src/assets/styles/base/_mixins.scss";
        `,
      },
    },
  },
});
