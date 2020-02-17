Ext.onReady(function() {

  var store = Ext.create('Ext.data.Store', {
    model: 'SaleModel',
    data: generateData()
})



  var opivot =
    {
      xtype:  'pivotgrid',
      title: 'pivot',
      matrix: {
          type: 'local',
          store: store,    // or a store instance
          rowGrandTotalsPosition: 'first',
          leftAxis: [{
              dataIndex: 'country',
              direction: 'DESC',
              header: 'Countries',
              width: 150
          }],
          topAxis: [{
              dataIndex: 'year',
              direction: 'ASC'
          }],
          aggregate: [{
              dataIndex: 'value',
              header: 'Total',
              aggregator: 'sum',
              width: 120
          }]
      },
      renderTo: document.getElementById('route')
    }

  var pivot = Ext.create(opivot)

})