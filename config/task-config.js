const path = require('path');
const env = require('dotenv').config({
  path: path.resolve(__dirname, '../.env')
}).parsed;

module.exports = {
  html        : false,
  images      : true,
  fonts       : true,
  static      : true,
  svgSprite   : false,
  ghPages     : false,
  stylesheets : {
    autoprefixer: {
      grid: true
    },
  },

  javascripts: {
    entry: {
      // files paths are relative to
      // javascripts.dest in path-config.json
      app: [
        "./app.js"
      ]
    },
    publicPath: "/dist/scripts",
    provide: {
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.$': 'jquery'
    }
  },

  browserSync: {
    // Update this to match your development URL
    proxy: {
      target: env.PUBLIC_URL
    },
    files: [
      'templates/**/*'
    ],
    open: false
  },

  production: {
    rev: true
  }
}
