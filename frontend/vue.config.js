module.exports = {
  devServer: {
    port: 4200,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        ws: true,
        changeOrigin: true,
      },
    },
  },
>>>>>>> master
  configureWebpack: {
    devtool: 'source-map',
  },
};
