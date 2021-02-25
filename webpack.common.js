const path = require('path');
const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;
const ValidateDictionaryPlugin = require('./webpack/ValidateDictionaryPlugin');

const styledComponentsTransformer = createStyledComponentsTransformer();

module.exports = {
  entry: {
    content: './src/app/content.tsx',
    background: './src/app/background.ts',
    popup: './src/app/popup.tsx',
  },

  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: '[name].js',
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  optimization: {
    minimize: false,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        options: {
          getCustomTransformers: () => ({ before: [styledComponentsTransformer] }),
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  plugins: [
    new ValidateDictionaryPlugin(path.resolve(__dirname, 'dictionaries.json')),
  ],
};
