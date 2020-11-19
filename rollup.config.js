import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import pkg from './package.json';

const dependencies = Object.keys(pkg.dependencies);

export default [
  {
    input: 'src/index.js',
    external: (id) => {
        if (dependencies.includes(id)) {
          return true;
        }

        return id.startsWith('lodash') || id.startsWith('ajv');
    },
    output: [
      {
        file: pkg.main,
        format: 'cjs',
      },
    ],
    plugins: [
      commonjs(),
      nodeResolve(),
      babel({
        babelHelpers: 'bundled',
        exclude: ['node_modules/**'],
      })
    ],
  }
];
