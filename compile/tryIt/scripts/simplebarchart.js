Ext.onReady(function() {

  var store = {
    xtype: 'store',
    fields: ['country', 'agr', 'ind', 'ser'],
    data: [{
        country: 'USA',
        agr: 188217,
        ind: 2995787,
        ser: 12500746
    }, {
        country: 'China',
        agr: 918138,
        ind: 3611671,
        ser: 3792665
    }, {
        country: 'Japan',
        agr: 71568,
        ind: 1640091,
        ser: 4258274
    }, {
        country: 'UK',
        agr: 17084,
        ind: 512506,
        ser: 1910915
    }, {
        country: 'Russia',
        agr: 78856,
        ind: 727906,
        ser: 1215198
    }]
  }

  var osimplebarchart =
    {
      xtype: 'cartesian',
      downloadServerUrl: 'http://svg.sencha.io',
      width: 600,
      height: 400,

      shadow: true,
      flipXY: true,
      insetPadding: '20 10',

      axes: [
          // X axis
          {
              type: 'numeric',
              position: 'bottom',
              fields: 'ind',
              grid: true,
              maximum: 4000000,
              title: 'Billions of USD',
              renderer: function (axis, label, layoutContext) {
                  return Ext.util.Format.number(layoutContext.renderer(label) / 1000, '0,000');
              }
          },
          // Y Axis
          {
              type: 'category',
              position: 'left',
              fields: 'country',
              grid: true
          }
      ],

      // Chart Type
      series: [{
          type: 'bar',
          xField: 'country',
          yField: 'ind',
          colors: [ '#D4CDAB' ]
      }],
      store: store,
      renderTo: document.getElementById('route')
    }

  var simplebarchart = Ext.create(osimplebarchart)

})