import { defineConfig, loadEnv } from 'vite'
import solidPlugin from 'vite-plugin-solid'

export default defineConfig(async ({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')  
  
  return {
    mode,
    base: env.REACT_APP_PageRoot ?? '/',
    server: {
      port: env.PORT ?? 3000,
      host: true
    },
    preview: {
      port: env.PORT ?? 5000,
      host: true
    },
    css: {
      modules: {
        localsConvention: "camelCase"
      }
    },
    plugins: [
      solidPlugin()
    ],
    envPrefix: [
      'VITE_',
      'APP_'
    ]
  }
})
