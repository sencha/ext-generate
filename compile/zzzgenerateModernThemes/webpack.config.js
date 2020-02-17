const path = require('path');
//const RemoveStrictPlugin = require('remove-strict-webpack-plugin');

module.exports = function(env) {
  var name = env.toolkit + env.theme;
  var loader;
  var folder;
  switch (env.type) {
    case 'smallest':
      loader = 'file-loader';
      folder = env.theme;
      break;
    case 'fewest':
      loader = 'url-loader';
      folder = '';
      break;
    default:
      console.warn('ERROR: set env.type to smallest or fewest');
      return;
      break;
  }

  var outFile;
  switch (env.theme) {
    case 'engine':
      outFile = `${env.toolkit}.${env.theme}.js`;
      break;

    default:
      outFile = `${env.toolkit}.${env.theme}.js`;
      break;
  }



  return {
    mode: 'development',
    context: path.join(__dirname, './'),
    entry: { input: './manifest/' + name + '.js'},
    output: {
      path: path.join(__dirname, 'dist/' + folder),
      //path: path.join(__dirname, 'dist/'),
      filename: outFile
    },

    // plugins: [
    //   new RemoveStrictPlugin()
    // ],


    module: {



      rules: [
        // {
        //   //test: require.resolve('./ext-modern-test.js'),
        //   test: /\.(js)$/,
        //   use: 'imports-loader?this=>window',
        // },
        {
          test: /\.(eot|woff|woff2|ttf|otf)$/,
          use: [loader]
          //use: ['url-loader']
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [loader]
          //use: ['url-loader']
        },
        {
          test: /\.css$/,
          use: ['style-loader','css-loader'],
        }
       ]
    }
  }
}
