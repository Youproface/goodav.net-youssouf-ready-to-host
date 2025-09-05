import viteCompression from 'vite-plugin-compression';

export default viteCompression({
  algorithm: 'brotliCompress',
  ext: '.br',
  threshold: 1024,
  compressionOptions: { level: 11 },
  deleteOriginFile: false,
});
