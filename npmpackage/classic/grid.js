var xtypes = [

  'actioncolumn',
  'booleancolumn',
  'checkcolumn',
  'gridcolumn',
  'datecolumn',
  'numbercolumn',
  'rownumberer',
  'templatecolumn',
  'widgetcolumn',
  'gridpanel',
  'grid',
  'propertygrid',
  'roweditor',
  'roweditorbuttons',
  'columnsplitter',


  'sparklinebar',
  'sparkline',
  'sparklinebox',
  'sparklinebullet',
  'sparklinediscrete',
  'sparklineline',
  'sparklinepie',
  'sparklinetristate',

  'pagingtoolbar',
  'tbseparator',
  'tbspacer',
  'tbtext',
  'treecolumn',

  'gridview',

]
var classes = [
    'Ext.data.virtual.Store',
    'Ext.grid.rowedit.Plugin',

    'Ext.grid.plugin.CellEditing',
    'Ext.ux.ajax.JsonSimlet',
    'Ext.chart.series.Pie',
    'Ext.data.virtual.Store',
    'Ext.grid.rowedit.Plugin',
    'Ext.field.InputMask',
    'Ext.data.validator.Format',
    'Ext.grid.plugin.*',
    'Ext.dataview.plugin.*',
    'Ext.pivot.plugin.*',
    'Ext.plugin.*',
    'Ext.chart.plugin.*',
    'Ext.draw.plugin.*',
    'Ext.dataview.*',
    'Ext.data.validator.*',
    'Ext.layout.*',
    'Ext.ux.gauge.*',
    'Ext.grid.filters.Plugin',

]

exports.getXtypes = () => {return xtypes};
exports.getCreates = () => {return require("../util").getCreatesForPackage(xtypes, classes)}

