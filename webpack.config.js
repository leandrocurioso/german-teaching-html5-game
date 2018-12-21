const path = require('path');
const pathToPhaser = path.join(__dirname, '/node_modules/phaser/');
const phaser = path.join(pathToPhaser, 'dist/phaser.js');

module.exports = {
  target: "web",
  entry: './src/game.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public', 'js'),
    publicPath: path.resolve(__dirname, '/js/')
  },
  module: {
    rules: [
      { test: /\.ts$/, loader: 'ts-loader', exclude: '/node_modules/' },
      { test: /phaser\.js$/, loader: 'expose-loader?Phaser' }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    publicPath: path.resolve(__dirname, '/js/'),
    host: '0.0.0.0',
    port: 3000,
    open: true,
    watchContentBase: true
    // compress: true
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      phaser: phaser
    }
  }
};
