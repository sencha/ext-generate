{
    "name": "@sencha/ext-{framework}-{toolkit}{bundle}",
    "version": "7.2.0",
    "main2root": "ext-{framework}-{toolkit}{bundle}.module.js",
    "main": "index.js",
    "private": false,
    "bin": {
      "ext-{framework}-{toolkit}{bundle}": "./bin/ext-{framework}-{toolkit}{bundle}.js"
    },
    "scripts": {
      "watch": "npx babel ./src --out-dir ./dist --watch",
      "build": "npx babel ./src --out-dir ./dist",
      "prepare": "npm run build"
    },
    "homepage": "https://github.com/sencha/ext-{framework}-{toolkit}{bundle}#readme",
    "peerDependencies": {},
    "dependencies": {},
    "devDependencies": {
      "@sencha/ext-runtime-base": "~7.1.0",
      "object-assign": "~4.1.1",
      "pascal-case": "~3.0.0",
      "script-loader": "^0.7.2",
      "comment-json": "^2.2.0",
      "@babel/runtime": "^7.7.4",
      "html-parsed-element": "^0.4.0",
      "@babel/cli": "^7.7.4",
      "@babel/core": "^7.7.4",
      "@babel/plugin-proposal-class-properties": "^7.7.4",
      "@babel/plugin-proposal-decorators": "^7.7.4",
      "@babel/plugin-proposal-export-namespace-from": "^7.7.4",
      "@babel/plugin-proposal-function-sent": "^7.7.4",
      "@babel/plugin-proposal-json-strings": "^7.7.4",
      "@babel/plugin-proposal-numeric-separator": "^7.7.4",
      "@babel/plugin-proposal-throw-expressions": "^7.7.4",
      "@babel/plugin-syntax-dynamic-import": "^7.7.4",
      "@babel/plugin-syntax-import-meta": "^7.7.4",
      "@babel/plugin-transform-runtime": "^7.7.4",
      "@babel/preset-env": "^7.7.4"
    },
    "repository": {
      "type": "git",
      "url": "git+https://github.com/sencha/ext-{framework}-{toolkit}{bundle}"
    },
    "keywords": [],
    "author": "Sencha",
    "license": "ISC"
  }