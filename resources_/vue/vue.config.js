/*=========================================================================================
  File Name: vue.config.js
  Description: configuration file of vue
  ==========================================================================================*/


module.exports = {
  publicPath: '/',
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ],
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    }
  },

  devServer: {
   // proxy: 'http://ajab.io',
   // headers: { "Access-Control-Allow-Origin": "*" }
  }

 }

