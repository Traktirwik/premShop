import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import  webpack  from 'webpack';

import { fileURLToPath } from 'url';
import { dirname } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
    entry: './client/src/app.js',
    output: {
        filename: 'bundle.[chunkhash].js',
        path: path.resolve(__dirname, 'public')
    },
    devServer: {
        port: 4200
    },
    plugins: [
        new HtmlWebpackPlugin({
            // filename: 'index.html',
            template: './client/views/registration.html',
            // chunks: ['signIn']
        }),
        // new HtmlWebpackPlugin({
        //     filename: 'main.html',
        //     template: './client/views/main.html',
        //     chunks: ['main']
        //   }),
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin({
            multiStep: true
          })
    ]
}