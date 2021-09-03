const webpack = require("webpack");


console.log("You're currently running webpack development...");


module.exports = () => ({
    devtool: "inline-source-map",
    mode: "development",
    devServer: {
        hot: true,
        open: true, //opens the browser once webpack-dev-server is started
        proxy: {
            "/": {
                target: "http://localhost:5000",
                secure: false,
                changeOrigin: true
            }
        },
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        },
        port: 3000,
        overlay: true
    },
    plugins: [new webpack.HotModuleReplacementPlugin()]
});
