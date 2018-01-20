var path = require('path');
 var webpack = require('webpack');

 module.exports = {
     context: __dirname,
     entry: './index.js',
     output: {
         path: __dirname,
         filename: 'app.js'
     },
     module: {
         loaders: [
             {
                 test: /\.js$/,
                 loader: 'babel-loader',
                 query: {
                     presets: ['es2015']
                 }
             }
         ]
     },
     stats: {
         colors: true
     },
     devtool: 'source-map'
 };