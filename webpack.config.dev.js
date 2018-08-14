//引入.vue 的loader
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')	
//jq全局封装
const webpack=require('webpack')
module.exports = {
  //入口
  entry: "./src/main.js",
  //loader
  module: {
    rules: [
      {
          //vue-loader的配置
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(ttf|woff|eot|svg|jpg|gif|png)$/,
        use: [
          {
            loader: 'url-loader'
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.vue','.js', '.css','*',]
  },
  devServer:{
    overlay: true,
    open:true
  },
  //plugins
  plugins: [
    // 解析.vue的文件请确保引入这个插件！
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
        template:'./template.html'
      }),
      new webpack.ProvidePlugin({
        $:'jquery',
        jQuery:"jquery"
      })
  ]
};
