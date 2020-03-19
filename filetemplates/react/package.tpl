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
    "react": "~16.13.0",
    "react-dom": "~16.13.0"
  },
  "dependencies": {
    "@babel/runtime": "^7.8.4",
    "@sencha/ext-web-components-{toolkit}{bundle}": "~7.2.0",
    "fs-extra": "~8.1.0",
    "react": "~16.13.0",
    "react-dom": "~16.13.0"
  },
  "devDependencies": {
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
    "@babel/plugin-transform-runtime": "^7.8.3",
    "@babel/preset-env": "^7.8.4",
    "@babel/preset-react": "^7.8.3",
    "@types/react": "^16.9.19",
    "@types/react-dom": "~16.9.5"
  }
}