const webpack = require('webpack');
//入口配置
var entry = {
    index: __dirname + "/app/page/index.js",
    list: __dirname + "/app/page/list.js",

}
//页面配置
var htmlConfig = [{
    name: "index",
    src: __dirname + "/app/page/index.js",
    title: "a"
}, {
    name: "list",
    src: __dirname + "/app/page/list.js",
    title: "b"
}];
module.exports = {
    entry: entry,
    htmlConfig: htmlConfig
}