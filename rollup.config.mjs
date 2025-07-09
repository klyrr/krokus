import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import pkgJson from './package.json' assert { type: 'json' };

export default {
  input: './index.ts',
  output: [
    {
      file: pkgJson.main,
      format: 'cjs'
    },
    {
      file: pkgJson.module,
      format: 'es'
    }
  ],
  plugins: [
    typescript(),
    json(),
    commonjs()
  ],
  external: Object.keys(pkgJson.dependencies || [])
};