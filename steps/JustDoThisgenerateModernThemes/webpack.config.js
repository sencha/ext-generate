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
  //outFile = `ext.${env.toolkit}.${env.theme}.${env.type}.js`;
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
          loader: loader,
          options: {
            limit: Infinity,
            name: 'assets/fonts/[name].[ext]',
            //outputPath: './node_modules/@sencha/ext-modern-material/assets/fonts',
            // publicPath: function(url) {
            //   var r = '../2' + url
            //   console.log(r)
            //   return r
            //   //return url.replace(/public/, '..')
            // },
            //useRelativePath: true
          }
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          loader: loader,
          options: {
            name: 'assets/images/[name].[ext]'
          }
        },





        // {
        //   test: /\.(eot|woff|woff2|ttf|otf)$/,
        //   loader: loader,
        //   options: {
        //     name: 'assets/fonts/[name].[ext]',
        //     outputPath: './node_modules/@sencha/ext-modern-material/assets/fonts',
        //     //publicPath: 'https://cdn.sencha.com/internal_components/v1/resources/'
        //     useRelativePath: true
        //   }
        // },
        // {
        //   test: /\.(png|svg|jpg|gif)$/,
        //   loader: loader,
        //   options: {
        //     name: 'assets/images/[name].[ext]'
        //   }
        // },
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
