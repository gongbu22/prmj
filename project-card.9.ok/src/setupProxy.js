const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        createProxyMiddleware("/api", {
            target: "http://3.38.26.169:3001",
            changeOrigin: true,
        })
    );
};