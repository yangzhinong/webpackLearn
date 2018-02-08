var path = require("path");

const ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");

var extractPlugin = new ExtractTextPlugin({
  filename: "[name].bundle.css"
});

var ClearwebpackPlugin = require("clean-webpack-plugin");

const webpack = require("webpack");

var plugins = [
  new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery"
  }),
  extractPlugin,

  new HtmlWebpackPlugin({
    filename: "index.html",
    template: "src/index.html"
  }),
  new ClearwebpackPlugin(["dist"])
  // new webpack.optimize.CommonsChunkPlugin(
  //     {
  //         names:['vendor','jquery']
  //     })
];

// const WebpackShellPlugin = require('webpack-shell-plugin');
// plugins.push(new WebpackShellPlugin({
//     onBuildStart: ['echo "Starting"'],
//     onBuildEnd: ['copy.bat']
// }));

module.exports = {
  // externals: {
  //     jquery:'jQuery'
  // },

  entry: {
    app: "./src/app.js"
    // 'page/home':'./src/home.js',
    // 'page/about':'./src/about.js',
    // vendor:['jquery','moment'] , //['juqry','other-lib']
    // jquery: ['jquery']
  }, //string | object |array
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js"
    // publicPath: 'dist'
  },
  //watch:true,
  module: {
    rules: [
      {
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
        use: extractPlugin.extract({
          use: ["css-loader", "postcss-loader", "sass-loader"]
        })
      }
    ]
  },
  plugins: plugins
};
