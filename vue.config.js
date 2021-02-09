/*
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
 */
const path = require('path');
function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    devServer: {
        port: 8081,
        proxy: {
            '/api_serv': {
                target: 'http://localhost:8080/api/',
                ws: false,
                changeOrigin: true,
                pathRewrite: {
                    '^/api_serv': '',
                }
            },
            '/jinri': {
                target: 'http://v1.jinrishici.com/',
                ws: false,
                changeOrigin: true,
                pathRewrite: {
                    '^/jinri': '',
                }
            },
        },
        disableHostCheck: true,
    },
    // assetsDir: 'static',
    // parallel: false,
    // publicPath: './',
}