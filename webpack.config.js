module.exports = {
   entry: './app.js',  //string | object |array
   output: {
       filename: './build.js'
   },
   //watch:true,
   module: {
       loaders : [
           {
               test:/\.scss$/,
               use: [ 
                   {
                       loader: "style-loader"
                    },
                    {
                       loader: "css-loader"
                    },
                    {
                        loader: "sass-loader"
                    }
                ]
          
           }
       ]
   }
};  