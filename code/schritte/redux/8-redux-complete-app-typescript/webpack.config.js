module.exports = {
    entry: "./src/main.js",
    output: {
        path: __dirname + '/public/dist/',
        filename: "main.js",
        publicPath: '/dist'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.css']
    },
    module: {
        rules: [
            {
                test: /\.(t|j)sx?$/,
                exclude: /node_modules/,
                use: 'awesome-typescript-loader',
            }
        ]
    },
    devtool: 'inline-source-map'
};
