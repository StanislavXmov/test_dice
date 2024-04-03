import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// for local vr test
// import mkcert from 'vite-plugin-mkcert';

export default defineConfig({
  // for local vr test
  // server: { https: true },
  // plugins: [react(), mkcert()],
  plugins: [react()],
  base: '',
  assetsInclude: ['**/*.glb', '**/*.hdr']
});