module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8360/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}