const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const modeConfig = (env) => require(`./modes/webpack.${env}.js`)(env);
const pluginConfig = require("./loadPlugins");

// mode: either "development" or "production"
module.exports = (env, { mode, presets } = { mode: "", presets: [] }) => {
    process.env.NODE_ENV = env.mode; //note: We need to set it like this as webpack doesn't set NODE_ENV to development or production automatically.

    return webpackMerge(
        {
            entry: {
                bundle: "./index.js",
            },
            output: {
                // path: path.join(__dirname, "../dist"),
                path: path.join(__dirname, "../../code-ext/chrome/dist"),
                //note: we changed `bundle` name into a variable `[name]` to get the key values in `entry` property instead of declaring the name statically.
                //[chunkhash] - this is a large string of characters that uses hash. If vendor or javascript files were updated, webpack will automatically bundle the contents of the file then generate a different hash.
                filename: "[name].js",
            },
            resolve: {
                // alias: {
                //     'react': 'preact/compat',
                //     'react-dom': 'preact/compat'
                // }
                extensions: [".jsx", "tsx", ".ts", ".js"],
            },
            module: {
                rules: [
                    {
                        use: {
                            loader: "ts-loader",
                        },
                        test: /\.(js|tsx|ts|jsx)$/,
                        exclude: /node_modules/, //excludes node_modules folder from being transpiled by babel. We do this because it's a waste of resources to do so.
                    },
                    {
                        use: ["style-loader", "css-loader"],
                        test: /\.css$/,
                    },
                    {
                        test: /\.scss$/,
                        use: [
                            // "style-loader", // creates style nodes from JS strings
                            "css-hot-loader",
                            MiniCssExtractPlugin.loader,
                            "css-loader", // translates CSS into CommonJS
                            {
                                // compiles Sass to CSS
                                loader: "sass-loader",
                                options: {
                                    implementation: require("sass"),
                                },
                            },
                        ],
                    },
                    {
                        test: /\.html$/,
                        use: [
                            {
                                loader: "html-loader", //Exports HTML as string. HTML is minimized when the compiler demands. Then passes it over to extract-loader.
                                options: {
                                    attrs: ["img:src"],
                                },
                            },
                        ],
                    },
                    {
                        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                        loader: "file-loader?name=assets/[name].[hash].[ext]",
                    },
                ],
            },
            plugins: [
                new HtmlWebpackPlugin({
                    template: "index.html",
                }), //this plugin is responsible for injecting the entry scripts of webpack (such as `bundle.js` and `vendor.js`) inside the html file without specifying them manually.
                new webpack.DefinePlugin({
                    "process.env.NODE_ENV": JSON.stringify(env.mode), //we will set the correct variable for `process.env.NODE_ENV` variable inside the `scripts` property in `package.json`
                }), //This adds windows-scoped variables that will be defined in bundle.js
                new MiniCssExtractPlugin({
                    // Options similar to the same options in webpackOptions.output
                    // both options are optional
                    filename: "[name].css",
                    chunkFilename: "[id].css",
                }),
            ],
        },
        pluginConfig({ mode, presets }),
        modeConfig(mode)
    );
};
