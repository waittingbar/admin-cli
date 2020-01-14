"use strict";
// Document：https://www.yuque.com/easy-team/easywebpack 和 https://www.yuque.com/easy-team/egg-vue
module.exports = {
  plugins: [{ imagemini: false }],
  module: {
    rules: [
      { stylus: true },
      {
        test: /\.pug$/,
        use: ['pug-plain-loader']
      }
    ]
  }
};
