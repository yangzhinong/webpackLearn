var path = require("path");

const ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");

var extractPlugin = new ExtractTextPlugin({
  filename: "[name].bundle.css"
});

var ClearwebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')

const webpack = require("webpack");

var plugins = [
  extractPlugin,
  new HtmlWebpackExternalsPlugin(  ///https://www.npmjs.com/package/html-webpack-externals-plugin
    {
        externals: [
            {
              module: 'jquery',
              entry:   'dist/jquery.min.js',
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

  new HtmlWebpackPlugin({
    filename: "index.html",
    template: "src/index.html",
    chunks:['app']
  }),
  new ClearwebpackPlugin(["dist"]),
  
];

// const WebpackShellPlugin = require('webpack-shell-plugin');
// plugins.push(new WebpackShellPlugin({
//     onBuildStart: ['echo "Starting"'],
//     onBuildEnd: ['copy.bat']
// }));

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
