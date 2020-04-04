const path = require('path');
//const RemoveStrictPlugin = require('remove-strict-webpack-plugin');

module.exports = function(env) {
  //console.log(env)
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
  outFile = `ext.${env.toolkit}.${env.theme}.js`;
  //console.log(outFile)
  // switch (env.theme) {
  //   case 'engine':
  //     outFile = `${env.toolkit}.${env.theme}.${env.type}.js`;
  //     break;

  //   default:
  //     outFile = `${env.toolkit}.${env.theme}.${env.type}.js`;
  //     break;
  // }



  var o = {
    mode: 'production',
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
  //console.log(o)
  return o;
}
