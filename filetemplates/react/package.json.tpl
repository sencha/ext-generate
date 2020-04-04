{
  "name": "@sencha/ext-react-{toolkit}{bundle}",
  "version": "7.2.0",
  "description": "Sencha ext-react-{toolkit}{bundle}",
  "main": "dist/index.js",
  "bin": {
    "ext-react": "./bin/ext-react.js"
  },
  "scripts": {
    "build": "npx babel ./src --out-dir ./dist && webpack",
    "prepare": "npm run build",

    "xprepublish": "npm run build",
    "xpostinstall": "npm run build & node ./postinstall.js",
    "xbuild": "npm run babel & npm run buildwebpack",
    "xwatch": "npx babel ./src --out-dir ./dist --watch",
    "xbabel": "npx babel ./src --out-dir ./dist",
    "xbuildwebpack": "webpack --production",
    "xprepare": "npm run build"
  },
  "keywords": [
    "Sencha",
    "Ext JS",
    "React",
    "ExtReact"
  ],
  "author": "Sencha, Inc.",
  "license": "MIT",
  "homepage": "https://github.com/sencha/ext-react-{toolkit}{bundle}#readme",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/sencha/ext-react-{toolkit}{bundle}.git"
  },
  "peerDependencies": {
    "@sencha/ext-web-components-{toolkit}{bundle}": "~7.2.0",
    "react": "~16.13.1",
    "react-dom": "~16.13.1"
  },
  "dependencies": {

  },
  "devDependencies": {
    "@sencha/ext-web-components-{toolkit}{bundle}": "~7.2.0",
    "fs-extra": "~9.0.0",
    "react": "~16.13.1",
    "react-dom": "~16.13.1",
    "webpack-bundle-analyzer": "~3.6.1",
    "@babel/cli": "^7.8.4",
    "@babel/core": "^7.9.0",
    "@babel/runtime": "^7.9.2",
    "@babel/plugin-proposal-class-properties": "^7.8.3",
    "@babel/plugin-proposal-decorators": "^7.8.3",
    "@babel/plugin-proposal-export-namespace-from": "^7.8.3",
    "@babel/plugin-proposal-function-sent": "^7.8.3",
    "@babel/plugin-proposal-json-strings": "^7.8.3",
    "@babel/plugin-proposal-numeric-separator": "^7.8.3",
    "@babel/plugin-proposal-throw-expressions": "^7.8.3",
    "@babel/plugin-syntax-dynamic-import": "^7.8.3",
    "@babel/plugin-transform-runtime": "^7.9.0",
    "@babel/plugin-syntax-import-meta": "^7.8.3",
    "@babel/preset-env": "^7.9.0",

    "@babel/preset-react": "^7.9.4",
    "@types/react": "^16.9.32",
    "@types/react-dom": "~16.9.6",

    "clean-webpack-plugin": "^3.0.0",
    "html-webpack-plugin": "^4.0.4",
    "babel-loader": "^8.1.0",
    "html-loader": "^1.1.0",
    "style-loader": "^1.1.3",
    "css-loader": "^3.4.2",
    "url-loader": "^4.0.0",
    "webpack-merge": "^4.2.2",
    "webpack": "^4.42.1",
    "webpack-cli": "^3.3.11",
    "webpack-dev-server": "^3.10.3"
  }
}