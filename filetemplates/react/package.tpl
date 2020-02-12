{
  "name": "@sencha/ext-react-{toolkit}{bundle}",
  "version": "7.2.0",
  "description": "Sencha ext-react-{toolkit}{bundle}",
  "main": "dist/index.js",
  "bin": {
    "ext-react": "./bin/ext-react.js"
  },
  "scripts": {
    "build": "npx babel ./src --out-dir ./dist",
    "prepublish": "npm run build",
    "postinstall": "npm run build & node ./postinstall.js"
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
    "react": "~16.12.0",
    "react-dom": "~16.12.0"
  },
  "dependencies": {
    "fs-extra": "~8.1.0",
    "@sencha/ext-web-components-{toolkit}{bundle}": "~7.2.0",
    "@babel/runtime": "^7.7.4",
    "react": "~16.12.0",
    "react-dom": "~16.12.0"
  },
  "devDependencies": {
    "@babel/cli": "^7.7.4",
    "@babel/core": "^7.7.4",
    "@babel/preset-env": "^7.7.4",
    "@babel/plugin-transform-runtime": "^7.7.4",
    "@babel/plugin-proposal-class-properties": "^7.7.4",
    "@babel/plugin-proposal-decorators": "^7.7.4",
    "@babel/plugin-proposal-export-namespace-from": "^7.7.4",
    "@babel/plugin-proposal-function-sent": "^7.7.4",
    "@babel/plugin-proposal-json-strings": "^7.7.4",
    "@babel/plugin-proposal-numeric-separator": "^7.7.4",
    "@babel/plugin-proposal-throw-expressions": "^7.7.4",
    "@babel/plugin-syntax-dynamic-import": "^7.7.4",
    "@babel/preset-react": "^7.7.4",
    "@types/react": "^16.9.16",
    "@types/react-dom": "~16.9.4"
  }
}