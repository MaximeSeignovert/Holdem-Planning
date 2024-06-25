import path from "path"
import react from "@vitejs/plugin-react"
import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig } from "vite"

const manifestForPlugin = {
  registerType:'prompt',
  includeAssests:['Joker.png'],
  manifest:{
    "short_name": "HoldemPlan",
    "name": "Holdem Planning",
    "icons": [
      {
        "src": "Joker.png",
        "type": "image/png",
        "sizes": "256x256"
      }
    ],
    "start_url": ".",
    "display": "standalone",
    "theme_color": "#000000",
    "background_color": "#ffffff"
  },
};

export default defineConfig({
  plugins: [react(),VitePWA(manifestForPlugin)],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})