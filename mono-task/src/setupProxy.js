const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://api.baasic.com/v1/nikolaapp',
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        '^/api': ''
      }
    })
    );
  };