import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
// for local vr test
// import mkcert from 'vite-plugin-mkcert';

export default defineConfig({
  // for local vr test
  // server: { https: true },
  // plugins: [react(), mkcert()],
  plugins: [react(), svgr()],
  base: '',
  assetsInclude: ['**/*.glb', '**/*.hdr']
});