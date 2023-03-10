// 引入一个包
const path = require('path');
// 引入html插件
const HTMLWebpackPlugin = require("html-webpack-plugin");
// 引入clean插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// webpack中的所有配置信息都应该写到module.export中
module.exports = {

      // 指定入口文件
      entry: "./src/index.ts",

      mode: "production",

      // 指定打包文件所在的目录
      output: {
            // 指定打包文件的目录
            path: path.resolve(__dirname, 'dist'),
            filename: "bundle.js",

            // 告诉webpack不适用箭头函数
            environment: {
                  arrowFunction: false,

            }
      },

      // 指定webpack打包时要使用的模块
      module: {
            // 指定要加载的规则
            rules: [
                  {
                        // test指定规则生效的文件
                        test: /\.ts$/,
                        // 要使用的loader
                        use: [
                            // 配置babel
                              {
                                    // 指定加载器
                                    loader: "babel-loader",
                                    // 设置babel
                                    options: {
                                          // 设置预定义的环境
                                          presets: [
                                              [
                                                    // 指定环境插件
                                                    '@babel/preset-env',
                                                    // 配置信息
                                                    {
                                                          // 要兼容的目标浏览器
                                                          targets: {
                                                                "chrome": "58",
                                                                "ie": "11"
                                                          },

                                                          // 指定corejs的版本
                                                          "corejs": "3",
                                                          // 使用corejs的方式 "usage" 表示按需加载
                                                          "useBuiltIns": "usage"
                                                    }
                                              ]

                                          ]
                                    }
                              },
                              'ts-loader'
                        ],
                        // 要排除的文件
                        exclude: /node_modules/
                  },

                  // 设置less文件的处理
                  {
                        test: /\.less$/,
                        use: [
                            // 从下向上执行的
                            "style-loader",
                            "css-loader",
                            // 引入postcss
                              {
                                    loader: "postcss-loader",
                                    options: {
                                          postcssOptions:{
                                                plugins: [
                                                    [
                                                        "postcss-preset-env",
                                                          {
                                                                browsers: 'last 2 versions'
                                                          }
                                                    ]
                                                ]
                                          }
                                    }
                              },
                            "less-loader",
                        ]
                  }
            ],

      },

      // 配置Webpack插件
      plugins: [
          new CleanWebpackPlugin(),
          new HTMLWebpackPlugin( {
                // title: "这是一个自定义的title"
                template: "./src/index.html"
          }),
      ],

      // 用来设置引用模块
      resolve: {
            extensions: ['.ts', '.js']
      }

};