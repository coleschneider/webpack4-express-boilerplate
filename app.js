const express = require("express");
const app = express()
const path = require("path")
//webpack middleware
const webpack = require("webpack")
const webpackDevMiddleware = require("webpack-dev-middleware")
const webpackHotMiddleware = require("webpack-hot-middleware")
const config = require("./webpack.config")
const webpackCompiler = webpack(config);
const port = process.env.PORT || 3000

app.use((webpackDevMiddleware)(webpackCompiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}))
app.use((webpackHotMiddleware)(webpackCompiler, {
    log: console.log,
    publicPath: config.output.publicPath,
    hot: true,
    heartbeat: 10 * 1000
}))
app.use(express.static(path.join(__dirname, 'dist')))







app.listen(port, () => console.log('listenning on port ', port))