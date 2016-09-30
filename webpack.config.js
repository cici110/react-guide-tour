var webpack = require('webpack'); 
var path = require('path');                 //引入node的path库
var HtmlwebpackPlugin = require('html-webpack-plugin');
var env = process.env.WEBPACK_ENV;
var outputFile;
var plugins = [new HtmlwebpackPlugin({
      title: 'React Biolerplate by Linghucong',
      template: path.resolve(__dirname, 'templates/index.ejs'),
      inject: 'body'
    })];

if (env === 'build') {
  var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
  plugins.push(new UglifyJsPlugin({ minimize: true }));
  outputFile = 'bundle.min.js';
} else {  
  outputFile = 'bundle.js';
}

var config = {
  entry: [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:3000',
    //'./app/index.js'      //入口文件
    './app/components/ReactGuideTour.js'
    ],                
  output: {
    path: path.resolve(__dirname, 'dist'),  // 指定编译后的代码位置
    filename: outputFile
  },
  devtool: 'source-map',
  module: {
    loaders: [
      { 
        test: /\.jsx?$/, 
        loader: 'babel', 
        exclude: /node_modules/
      },  
      {
        test: /\.(less|css)$/,
        loaders: ['style', 'css', 'less'],
        include: path.resolve(__dirname, 'app')
      },
      { 
        test: /\.svg$/, 
        loader: 'babel!react-svg', 
        include: path.join(__dirname, 'app') 
      }
    ]
  },
  plugins: plugins
}

module.exports = config;