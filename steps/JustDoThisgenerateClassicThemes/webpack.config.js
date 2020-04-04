const path = require('path');
module.exports = function(env) {
  var name = env.toolkit + env.theme;
  var loader;
  var folder;
  switch (env.type) {
    case 'smallest':
      loader = 'file-loader';
      folder = env.toolkit+env.theme+env.type;
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
  //outFile = `${env.toolkit}.${env.theme}.${env.type}.js`;
  outFile = `ext.${env.toolkit}.${env.theme}.js`;
  // switch (env.theme) {
  //   case 'engine':
  //     outFile = `${env.toolkit}.${env.theme}.js`;
  //     break;

  //   default:
  //     outFile = `${env.toolkit}.${env.theme}.js`;
  //     break;
  // }

  return {
    mode: 'production',
    context: path.join(__dirname, './'),
    entry: { input: './manifest/' + name + '.js'},
    output: {
      path: path.join(__dirname, 'dist/' + folder),
      //path: path.join(__dirname, 'dist/'),
      filename: outFile
    },
    module: {
      rules: [
        {
          test: /\.(eot|woff|woff2|ttf|otf)$/,
          use: [loader]
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [loader]
        },
        {
          test: /\.css$/,
          use: ['style-loader','css-loader'],
        }
       ]
    }
  }
}
