/* eslint @typescript-eslint/no-var-requires: 0 */
const GasPlugin = require('gas-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/main.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.ts']
  },
  plugins: [new GasPlugin()]
}
