import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

// AI-First開発原則に基づく設定
// SSRでAPI機能を有効化
export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
  server: {
    port: 3000,
    host: true
  },
  build: {
    format: 'file',
    inlineStylesheets: 'always'
  }
});