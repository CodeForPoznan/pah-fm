module.exports = {
  lintOnSave: false,
  configureWebpack: {
    devtool: 'source-map',
  },
  pwa: {
    workboxOptions: {
      skipWaiting: true,
      navigateFallback: '/index.html',
      navigateFallbackBlacklist: [/admin/],
    },
  },
};
