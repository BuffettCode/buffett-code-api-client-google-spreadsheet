/* eslint @typescript-eslint/no-var-requires: 0 */
const GasPlugin = require('gas-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/main.ts',
  devtool: false,
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.ts$/,
        use: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts'],
    plugins: [new TsconfigPathsPlugin()]
  },
  plugins: [new GasPlugin()]
}
