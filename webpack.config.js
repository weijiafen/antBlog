var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
// var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var path = require('path');
module.exports = {
   
    //插件项
    plugins: [
        commonsPlugin,
        // new webpack.HotModuleReplacementPlugin(),
        
         new webpack.ProgressPlugin((percentage, message) => {
              const percent = Math.round(percentage * 100);
              // process.stderr.clearLine();
              // process.stderr.cursorTo(0);
              // process.stderr.write(`${percent}% ${message}`);
            }),
         new webpack.optimize.UglifyJsPlugin({
          compress:{
            warnings:false
          },
          sourceMap:false,
          mangle:false
         })
         // new OpenBrowserPlugin({ url: 'http://localhost:8080' })
    ],
    //页面入口文件配置
    entry: {
          app:'./src/main/webapp/static/js/index.js'
    },
       
    //入口文件输出配置
    output: {
        path: './src/main/webapp/build/js',
        filename: '[name].bundle.js',
         publicPath: '/js/',
    },
    module: {
        //加载器配置
        loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel', // 'babel-loader' is also a legal name to reference
      query: {
        presets: ['es2015', 'react', 'stage-0'],
        plugins: ['antd'],
      },
    }, {
      test: /\.css$/,
      loader: 'style!css',
    }, {
      test: /\.less$/,
      loader: 'style!css!less?relativeUrls',
    }, {
      test: /\.(png|jpg|jpeg|gif|woff|ttf|eot|svg)(\?\S+)?$/,
      loader: 'file?name=asset/[hash].[ext]',
    }],
    },
    //其它解决方案配置
    resolve: {
        //查找module的话从这里开始查找
        root: 'E:/test/webpack/reactTest/src/main/webapp', //绝对路径
        //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        extensions: ['', '.js', '.json', '.less'],
        //模块别名定义，方便后续直接引用别名，无须多写长长的地址
        alias: {
            wow : 'js/club/library/plugin/wow.min.js',
            ActionType : 'js/actions/ActionType.js',
            AppAction : 'js/actions/AppAction.js'
        }
    }
};