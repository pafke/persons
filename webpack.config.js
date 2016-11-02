var webpack = require("webpack");
module.exports = {
    entry: './src/base.jsx',
    output: {
        path: './build/js/',
        publicPath: "/js/",
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: "./build",
        inline: true,
        port: 3333
    },
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            { test: /\.json$/, loader: 'json' },
        ]
    },
    plugins: [
        //new webpack.optimize.UglifyJsPlugin({minimize: true})
    ]
}