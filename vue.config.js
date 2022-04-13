/* eslint-disable @typescript-eslint/no-require-imports */
const path = require('path')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

function resolve(dir) {
  return path.join(__dirname, dir)
}

// page title
const name = '后台管理系统'

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following method:
// port = 9527 npm run dev OR npm run dev --port = 9527
const port = process.env.port || process.env.npm_config_port || 9527 // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  productionSourceMap: false,
  devServer: {
    port,
    open: false
  },
  configureWebpack: () => {
    const webpackConfig = {}
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    webpackConfig.name = name
    webpackConfig.resolve = {
      extensions: ['.tsx', '.ts', '.jsx', '.vue', '.json'],
      alias: {
        '@': resolve('src')
      }
    }
    // plugin
    webpackConfig.plugins = [
      Components({
        // components located in src/components will be imported automatically
        dirs: ['src/components'],
        // setting file located in src/components.d.ts
        dts: 'src/components.d.ts',
        resolvers: [ElementPlusResolver({ importStyle: 'sass' })],
        directives: true,
        include: [/\.vue$/, /\.vue\?vue/],
        exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/]
      })
    ]

    return webpackConfig
  },
  chainWebpack(config) {
    config.plugins.delete('prefetch')

    // config.plugin('preload').tap(() => [
    //   {
    //     rel: 'preload',
    //     // to ignore runtime.js
    //     // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
    //     fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
    //     include: 'initial'
    //   }
    // ])

    // set svg-sprite-loader
    // config.module.rule('svg').exclude.add(resolve('src/icons')).end()
    // config.module
    //   .rule('icons')
    //   .test(/\.svg$/)
    //   .include.add(resolve('src/icons'))
    //   .end()
    //   .use('svg-sprite-loader')
    //   .loader('svg-sprite-loader')
    //   .options({
    //     symbolId: 'icon-[name]'
    //   })
    //   .end()

    // https://webpack.js.org/configuration/devtool/#development
    config.when(process.env.NODE_ENV === 'development', (config) => config.devtool('cheap-source-map'))

    config.when(process.env.NODE_ENV !== 'development', (config) => {
      // config
      //   .plugin('ScriptExtHtmlWebpackPlugin')
      //   .after('html')
      //   .use('script-ext-html-webpack-plugin', [
      //     {
      //       // `runtime` must same as runtimeChunk name. default is `runtime`
      //       inline: /runtime\..*\.js$/
      //     }
      //   ])
      //   .end()
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial' // only package third parties that are initially dependent
          },
          elementUI: {
            name: 'chunk-elementUIPLUS', // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?element-plus(.*)/ // in order to adapt to cnpm
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      })
      config.optimization.runtimeChunk('single')
    })
  }
}
