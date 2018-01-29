var path= require("path");

const ExtractTextPlugin = require("extract-text-webpack-plugin");

var extractPlugin = new ExtractTextPlugin({
    filename: '[name].build.css'
});

var ClearwebpackPlugin= require('clean-webpack-plugin');


const webpack= require('webpack');

var plugins= [
    extractPlugin,
    new ClearwebpackPlugin(['dist']),
    new webpack.optimize.CommonsChunkPlugin(
        { 
            names:['vendor','jquery']
        })
];
const WebpackShellPlugin = require('webpack-shell-plugin');
plugins.push(new WebpackShellPlugin({
    onBuildStart: ['echo "Starting"'],
    onBuildEnd: ['copy.bat']
}));



module.exports = {
    entry: {
        app:'./src/app.js',
        'page/home':'./src/home.js',
        'page/about':'./src/about.js',
        vendor:['jquery','moment'] , //['juqry','other-lib']
        jquery: ['jquery']
    }, //string | object |array
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: '[name].build.js'
    },
    //watch:true,
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            }
        ],
        rules: [{
            test: /\.scss$/,
            use: extractPlugin.extract({
                use: ["css-loader",'postcss-loader', 'sass-loader']
            })
        }]
    },
    plugins: plugins
};