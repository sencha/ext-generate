import './classic.engine.pro.replaced.js';
import './classic.material.js';

//Ext.onReady(function () {
  Ext.create({
    xtype: 'button',
    text: 'module',
    renderTo: document.getElementById('button')
  })
  window.end = new Date();
  document.getElementById('time').innerHTML = window.end - window.start
//});