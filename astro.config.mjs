import { defineConfig } from 'astro/config';

// AI-First開発原則に基づく設定
// 完全静的化でパフォーマンス最適化
export default defineConfig({
  output: 'server',
  server: {
    port: 3000,
    host: true
  },
  build: {
    format: 'file',
    inlineStylesheets: 'always'
  }
});