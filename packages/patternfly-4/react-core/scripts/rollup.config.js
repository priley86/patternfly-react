import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import nodeGlobals from 'rollup-plugin-node-globals';
import { uglify } from 'rollup-plugin-uglify';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';

const input = './src/index.ts';
const name = '@patternfly/react-core';
const globals = {
  react: 'React',
  'react-dom': 'ReactDOM'
};
const babelOptions = {
  exclude: /node_modules/,
  configFile: '../.babelrc.js'
};
const commonjsOptions = {
  ignoreGlobal: true,
  include: /node_modules/
};

export default [
  {
    input,
    output: { file: `dist/umd/${name}.development.js`, format: 'umd', name, globals },
    external: Object.keys(globals),
    plugins: [
      nodeResolve({
        module: false,
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }),
      babel(babelOptions),
      commonjs(commonjsOptions),
      nodeGlobals()
    ]
  },
  {
    input,
    output: { file: `dist/umd/${name}.production.min.js`, format: 'umd', name, globals },
    external: Object.keys(globals),
    plugins: [
      nodeResolve({
        module: false,
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }),
      babel(babelOptions),
      commonjs(commonjsOptions),
      nodeGlobals(),
      sizeSnapshot(),
      uglify()
    ]
  }
];
