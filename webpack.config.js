var path = require("path");

const ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");

var ClearwebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin');
var WebpackShellPlugin = require('webpack-shell-plugin');
const webpack = require("webpack");


const bIsProd = process.argv.indexOf('-p') !== -1;
var extractPlugin = new ExtractTextPlugin({
  filename: "[name].bundle.css",
  disable: !bIsProd //bIsDev
});
var cssConfig = bIsProd ? extractPlugin.extract({
  use: ["css-loader", "postcss-loader", "sass-loader"]
}) : ["style-loader", "css-loader", "postcss-loader", "sass-loader"];


var plugins = [
  extractPlugin,
  new HtmlWebpackExternalsPlugin( ///https://www.npmjs.com/package/html-webpack-externals-plugin
    {
      externals: [{
          module: 'jquery',
          entry: 'dist/jquery.min.js',
          global: 'jQuery',
        },
        {
          module: 'bootstrap',
          entry: 'dist/css/bootstrap.min.css',
        },
        {
          module: 'bootstrap',
          entry: 'dist/css/bootstrap.min.css',
          supplements: ['dist/fonts/'],
        },
      ],
      // hash: true,
    }
  ),
  //   new CopyWebpackPlugin([
  //     { from: 'node_modules/bootstrap/dist/css', to: 'css/'},
  //     { from: 'node_modules/bootstrap/dist/fonts', to: 'fonts/'}
  //   ]),

  new HtmlWebpackPlugin({
    filename: "index.html",
    template: "src/index.html",
    chunks: ['app']
  }),
  new ClearwebpackPlugin(["dist"]),

];

if (!bIsProd) {
  plugins.push(new webpack.NamedModulesPlugin());
  plugins.push(new webpack.HotModuleReplacementPlugin());

} else {
  plugins.push(new WebpackShellPlugin({
    onBuildStart: ['echo "Starting"'],
    onBuildEnd: ['copy.bat']
  }));
}
// const WebpackShellPlugin = require('webpack-shell-plugin');


module.exports = {

  entry: {
    app: "./src/app.js",
    // 'page/home':'./src/home.js',
    // 'page/about':'./src/about.js',
  }, //string | object |array
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js"
    // publicPath: 'dist'
  },
  //watch:true,
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env"]
          }
        }
      },
      {
        test: /\.scss$/,
        use: cssConfig
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      }
    ]
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    // hot:true
  },
  plugins: plugins
};