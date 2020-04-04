Ext.onReady(function () {
  Ext.create({
    xtype: 'button',
    text: 'hi',
    renderTo: document.getElementById('button')
  })
  window.end = new Date();
  document.getElementById('time').innerHTML = window.end - window.start
});