/*
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
 */
module.exports = {
    devServer: {
        port: 8081,
        proxy: {
            '/api': {
                target: 'http://localhost:8080/testJson4servlet/',
                ws: false,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '',
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
    }
}