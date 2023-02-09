const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {

    resolve: {
        alias: {
          react: path.resolve('./node_modules/react'),
          'react-dom': path.resolve('./node_modules/react-dom')
      }
    }

};
