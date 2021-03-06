module.exports = {
    entry: "./entry.js",
    output: {
        path: "/",
        filename: "bundle.js"
    },
    module: {
      loaders: [
        {
         test: /.jsx?$/,
         loader: 'babel-loader',
         exclude: /node_modules/,
         query: {
           presets: ['react', 'es2015']
         }
       },
          {
            test: /\.less$/,
            loader: "style-loader!css-loader!less-loader"
          }
      ]
    },
    devServer: {
      historyApiFallback: true
    }
};
