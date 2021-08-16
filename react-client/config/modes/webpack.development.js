const webpack = require("webpack");


console.log("You're currently running webpack development...");


module.exports = () => ({
    devtool: "inline-source-map",
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
        port: 3000,
        overlay: true
    },
    plugins: [new webpack.HotModuleReplacementPlugin()]
});
