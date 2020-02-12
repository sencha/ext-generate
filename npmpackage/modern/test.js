var xtypes = [
  'button'
]
var classes = [
    'Ext.*'
]

exports.getXtypes = () => {return xtypes};
exports.getCreates = () => {return require("../util").getCreatesForPackage(xtypes, classes)}

