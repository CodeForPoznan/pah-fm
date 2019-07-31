module.exports = {
  configureWebpack: {
    devtool: 'source-map',
  },
  pwa: {
    workboxOptions: {
      skipWaiting: true,
      navigateFallback: '/index.html',
    },
  },
};
