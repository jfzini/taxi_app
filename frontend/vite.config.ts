import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/

export default ({ mode }) => {
  const rootPath = path.resolve(process.cwd(), '..');
  process.env = { ...process.env, ...loadEnv(mode, rootPath, '') };
  return defineConfig({
    plugins: [react()],
    server: {
      host: true,
      port: 80,
    },
    // envDir: '../',
    define: {
      'import.meta.env.GOOGLE_API_KEY': JSON.stringify(process.env.GOOGLE_API_KEY),
    },
  });
};
