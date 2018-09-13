const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    entry:{
        main: path.resolve(__dirname, '../src/main.js')
    },
    module: {
       rules:[
           {
               test: /\.(less)$/,
               use: [
                   'style-loader',
                   'css-loader',
                   {
                        loader: 'px2rem-loader',
                        options: {
                            remUnit: 50,
                            remPrecision: 8
                        }
                    },
                   'postcss-loader',
                   'less-loader',
                ],
                exclude: /node_modules/
           },
           {
               test: /\.js$/,
               use: [
                   'babel-loader'
               ],
               exclude: /node_modules/
           },
           { test: /iview.src.*?js$/, loader: 'babel-loader' },
           {
               test: /\.vue$/,
               use: [
                   'vue-loader',
                   {
                       loader: 'iview-loader',
                       options: {
                           prefix: false,
                       }
                   }
                ]
           },
           {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                'file-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                          limit: 50000,
                        }
                    }
                ]
            },
            {
                test: /\.(html|tpl)$/,
                loader: 'html-loader'
            }
            
       ]
    },
    plugins: [
        new VueLoaderPlugin(),
        // new webpack.LoaderOptionsPlugin({
        //     options: {
        //         postcss: function() {
        //             return [px2rem({remUnit: 100})];
        //         },
        //         vue: {
        //             loaders:{
        //                 postcss: [px2rem({remUnit: 100})]
        //             }
        //         },
        //     }
        // })
    ],
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src'),
            fastclick: 'fastclick/lib/fastclick.js',
        }
    }
}