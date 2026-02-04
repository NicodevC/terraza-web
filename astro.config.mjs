// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },
  image: {
    // Configuración de optimización de imágenes
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  }
});