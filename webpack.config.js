var webpack = require('webpack');

module.exports = {
    entry:[
        "./components/app.js"
    ],
    output:{
        path: __dirname + '/dist',
        filename: "webchat_client.js"
    },
    module:{
        loaders:[
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015','react']
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                include: /node_modules/,  
                loaders: ['style-loader', 'css-loader']
            },
            {
                test: /\.json$/,
                loaders: ['json-loader']
            }
        ]
    },
    plugins:[],
    node:{
        net: 'empty',
        dns: 'empty'
    }
};