const path = require('path')
const nodeExternals = require('webpack-node-externals')
const CopyPlugin = require('copy-webpack-plugin')
const slsw = require('serverless-webpack')

module.exports = {
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',

  entry: slsw.lib.entries,
  target: 'node',

  output: {
    libraryTarget: 'commonjs',
    path: path.resolve(__dirname, '.webpack'),
    filename: '[name].js',
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },

  resolve: {
    extensions: ['.ts', '.js'],
  },

  externals: [nodeExternals()],

  plugins: [
    new CopyPlugin([
      { from: 'generated/*', to: 'src/', context: 'src/' },
      'prisma/schema.prisma',
    ]),
  ],

  node: {
    __dirname: false,
  },
}
