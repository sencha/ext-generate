Ext.onReady(function() {

  var store = {
    type: 'tree',
    root: {
        name: 'A',
        expanded: true,
        children: [{
            name: 'B',
            expanded: true,
            children: [{
                name: 'D',
                leaf: true
            }, {
                name: 'E',
                leaf: true
            }]
        }, {
            name: 'C',
                leaf: true
        }]
    }
  }




  var od3tree =
    {
      xtype: 'd3-tree',
      padding: 50,
      width: 200,
      height: 500,
      store: store,
      renderTo: document.getElementById('route')
    }

  var d3tree = Ext.create(od3tree)

})