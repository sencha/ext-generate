{
  "name": "@sencha/ext-web-components-{toolkit}{bundle}",
  "version": "7.2.0",
  "main2wcx": "ext-web-components-{toolkit}{bundle}.module.js",
  "main": "dist/index.js",
  "private": false,
  "binx": {
    "ext-web-components-{toolkit}{bundle}": "./bin/ext-web-components-{toolkit}{bundle}.js"
  },
  "bin": {
    "ext-web-components": "./bin/ext-web-components.js"
  },
  "scripts": {
    "watch": "npx babel ./src --out-dir ./dist --watch",
    "build": "npx babel ./src --out-dir ./dist",
    "buildwebpack": "webpack --config config/webpack.prod.js",
    "prepare": "npm run build"
  },
  "homepage": "https://github.com/sencha/ext-web-components#readme",
  "peerDependencies": {

  },
  "dependencies": {
    "object-assign": "~4.1.1",
    "pascal-case": "~3.1.1",
    "script-loader": "^0.7.2",
    "comment-json": "^2.4.1",
    "html-parsed-element": "^0.4.0",
    "@babel/core": "^7.8.4",
    "@babel/plugin-transform-runtime": "^7.8.3",
    "@babel/preset-env": "^7.8.4",
    "@babel/runtime": "^7.8.4",
    "@babel/cli": "^7.8.4",
    "@babel/plugin-proposal-class-properties": "^7.8.3",
    "@babel/plugin-proposal-decorators": "^7.8.3",
    "@babel/plugin-proposal-export-namespace-from": "^7.8.3",
    "@babel/plugin-proposal-function-sent": "^7.8.3",
    "@babel/plugin-proposal-json-strings": "^7.8.3",
    "@babel/plugin-proposal-numeric-separator": "^7.8.3",
    "@babel/plugin-proposal-throw-expressions": "^7.8.3",
    "@babel/plugin-syntax-dynamic-import": "^7.8.3",
    "@babel/plugin-syntax-import-meta": "^7.8.3"
  },
  "devDependencies": {
    "clean-webpack-plugin": "^0.1.19",
    "html-webpack-plugin": "^3.2.0",
    "babel-loader": "^8.0.4",
    "html-loader": "^0.5.5",
    "style-loader": "^0.23.1",
    "css-loader": "^1.0.0",
    "url-loader": "^1.1.2",
    "webpack-merge": "^4.1.4",
    "webpack": "^4.22.0",
    "webpack-cli": "^3.1.2",
    "webpack-dev-server": "^3.1.9"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/sencha/ext-web-components{bundle}"
  },
  "keywords": [],
  "author": "Sencha",
  "license": "ISC"
  }