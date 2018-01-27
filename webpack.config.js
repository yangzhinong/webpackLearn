var path= require("path");

const ExtractTextPlugin = require("extract-text-webpack-plugin");

var extractPlugin = new ExtractTextPlugin({
    filename: '[name].build.css'
})

module.exports = {
    entry: {
        app:'./src/app.js',
        home:'./src/home.js',
        about:'./src/about.js'
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
    plugins: [
        extractPlugin
    ]

};