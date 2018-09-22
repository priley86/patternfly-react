const babelENV = process.env.BABEL_ENV || 'development';
const modules = babelENV !== 'production:esm' ? 'commonjs' : false;

module.exports = {
  presets: [['@babel/preset-env', { modules }], '@babel/preset-react'],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-transform-object-assign',
    babelENV !== 'development' && [
      'transform-imports',
      {
        'react-bootstrap': {
          preventFullImport: true,
          transform: importName => {
            const moduleDir = !modules ? 'es' : 'lib';
            return `react-bootstrap/${moduleDir}/${importName}`;
          }
        }
      }
    ]
  ].filter(Boolean),
  ignore: (() => {
    const ignore = ['src/**/__snapshots__', 'src/**/*.stories.js', 'src/**/Stories'];
    if (babelENV.includes('production')) {
      ignore.push('test.js', '__mocks__');
    }
    return ignore;
  })()
};
