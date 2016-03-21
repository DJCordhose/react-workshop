module.exports = {
    entry: "./main.js",
    output: {
        path: __dirname,
        filename: "dist/main.js"
    },
    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loader: 'babel?presets[]=es2015'},
            { test: /\.html$/, loader: 'html' }
        ]
    },
    // Create Sourcemaps for the bundle
    devtool: 'source-map'

};
