module.exports = {
    devServer: {
        open: true,
        host: 'localhost',
        port: 8080,
        hotOnly: false,
        https: false,
        proxy: {
            //配置跨域
            '/api': {
                target: 'http://localhost:3001/api/',
                ws: true,
                changOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
        before: app => {}
    }
}