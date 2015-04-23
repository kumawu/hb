module.exports = {
  cache: true,

  watch: true,

  entry: {
    'listview': ['./apps/listview/app.js'],
    'timeline': ['./apps/timeline/app.js'],
    'css-layout': ['./apps/css-layout/app.js']
  },

  output: {
    filename: '[name].js'
  },

  module: {
    loaders: [
      { test: /\.js$/, loader: 'jsx-loader!transform/cacheable?envify' },
    ]
  },

  resolve: {
    root: __dirname,
    alias: {
      'react-canvas': 'lib/ReactCanvas.js'
    }
  }
};
