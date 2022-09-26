import { defineConfig } from 'vite'
import reactPlugin from '@vitejs/plugin-react'

export default defineConfig(async () => {
  // const { default: mdx } = await import('@mdx-js/rollup')

  return {
    plugins: [reactPlugin()],
    optimizeDeps: {
      include: ['react/jsx-runtime'],
    },
    build: { minify: true },


  }
})