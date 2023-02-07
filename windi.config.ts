import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  extract: {
    // accepts globs and file paths relative to project root
    include: [
      'src/**/*.{vue,html,jsx,tsx,twig}',
      'templates/**/*.{vue,html,jsx,tsx,twig}',
    ],
    exclude: [
      'node_modules/**/*',
      '.git/**/*',
    ],
  },
})