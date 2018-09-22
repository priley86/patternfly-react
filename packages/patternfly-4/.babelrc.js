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
        '@patternfly/react-icons': {
          kebabCase: true,
          preventFullImport: true,
          transform: importName => {
            if (importName.toLowerCase() === 'icon') {
              throw new Error('Icon import is not allowed');
            }
            const importPath = `icons/${importName}`;
            if (!modules) {
              return `@patternfly/react-icons/dist/esm/${importPath}`;
            }
            return `@patternfly/react-icons/dist/js/${importPath}`;
          }
        }
      }
    ]
  ].filter(Boolean),
  ignore: (() => {
    const ignore = ['src/**/__snapshots__'];
    if (babelENV.includes('production')) {
      ignore.push('test.js', '__mocks__');
    }
    return ignore;
  })()
};
