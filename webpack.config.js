module.exports = {
   entry: './app.js',  //string | object |array
   output: {
       filename: './build.js'
   },
   //watch:true,
   module: {
       loaders : [
           {
               test:/\.css$/,
               loader: "style-loader!css-loader"
           }
       ]
   }
};  