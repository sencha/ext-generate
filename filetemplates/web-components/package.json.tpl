{
  "name": "@sencha/ext-web-components-{toolkit}{bundle}",
  "version": "7.2.0",
  "main2wcx": "ext-web-components-{toolkit}{bundle}.module.js",
  "main": "index.js",
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
    "prepare": "npm run build"
  },
  "homepage": "https://github.com/sencha/ext-web-components#readme",
  "peerDependencies": {

  },
  "dependencies": {
    "object-assign": "~4.1.1",
    "pascal-case": "~3.1.1",
    "@babel/runtime": "^7.8.4",
    "script-loader": "^0.7.2",
    "comment-json": "^2.4.1",
    "html-parsed-element": "^0.4.0",
    "@babel/cli": "^7.8.4",
    "@babel/core": "^7.8.4",
    "@babel/plugin-proposal-class-properties": "^7.8.3",
    "@babel/plugin-proposal-decorators": "^7.8.3",
    "@babel/plugin-proposal-export-namespace-from": "^7.8.3",
    "@babel/plugin-proposal-function-sent": "^7.8.3",
    "@babel/plugin-proposal-json-strings": "^7.8.3",
    "@babel/plugin-proposal-numeric-separator": "^7.8.3",
    "@babel/plugin-proposal-throw-expressions": "^7.8.3",
    "@babel/plugin-syntax-dynamic-import": "^7.8.3",
    "@babel/plugin-syntax-import-meta": "^7.8.3",
    "@babel/plugin-transform-runtime": "^7.8.3",
    "@babel/preset-env": "^7.8.4"
  },
  "devDependencies": {
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/sencha/ext-web-components{bundle}"
  },
  "keywords": [],
  "author": "Sencha",
  "license": "ISC"
  }