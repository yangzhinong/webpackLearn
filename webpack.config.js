const ExtractTextPlugin = require("extract-text-webpack-plugin");

var extractPlugin = new ExtractTextPlugin({
    filename: 'main.css'
})

module.exports = {
    entry: './app.js', //string | object |array
    output: {
        filename: './build.js'
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
                use: ["css-loader", 'sass-loader']
            })
        }]
    },
    plugins: [
        extractPlugin
    ]

};