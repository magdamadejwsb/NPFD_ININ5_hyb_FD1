const path = require('path');

module.exports = {
    mode: "production",
    entry: './src/index.js',
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.s[ac]ss$/i,
                use: ["style-loader", "css-loader", "sass-loader"]
            }
        ],
    },
    devServer: {
        static: "./",
        port: 8080,
        open: true
    }
}