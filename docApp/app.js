  var ref = {}
  var docproperties = []
  var docevents = []

  function panelReady(event) {
    for (var prop in event.detail.cmpObj) {
      ref[prop] = event.detail.cmpObj[prop];
    }
    fetch('./data/doc-modern/ext-react-modern-aamenu.json')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      data.sort((a, b) => (a.xtype > b.xtype) ? 1 : -1)
      var navTreeRoot = {
        hash: 'all',
        iconCls: 'x-fa fa-home',
        leaf: false,
        text: 'All',
        children: data
      };
      // var treeStore = Ext.create('Ext.data.TreeStore', {
      //   rootVisible: true,
      //   root: navTreeRoot
      // });

      var treeStore = {
        xtype: 'tree',
        rootVisible: true,
        root: navTreeRoot
      };
      ref.treelist.setStore(treeStore);
      var hash = window.location.hash.substr(1);
      if (hash == '') {
        hash = 'accordion';
      }
      var node = ref.treelist.getStore().findNode('xtype', hash);
      ref.treelist.setSelection(node);
      window.location.hash = '#' + hash;


      var sample =
`Ext.application({
    name: 'Fiddle',

    launch: function () {
        Ext.create('Ext.data.Store', {

            // Named Store
            storeId: "simpsonsStore",

            fields: ['name', 'email', 'phone'],
            data: [{
                'name': 'Lisa',
                "email": "lisa@simpsons.com",
                "phone": "555-111-1224"
            }, {
                'name': 'Bart',
                "email": "bart@simpsons.com",
                "phone": "555-222-1234"
            }, {
                'name': 'Homer',
                "email": "home@simpsons.com",
                "phone": "555-222-1244"
            }, {
                'name': 'Marge',
                "email": "marge@simpsons.com",
                "phone": "555-222-1254"
            }]
        });

        var columns = [{
            text: 'Name',
            dataIndex: 'name',
            flex: 1
        }, {
            text: 'Email',
            dataIndex: 'email',
            flex: 1
        }, {
            text: 'Phone',
            dataIndex: 'phone',
            flex: 1
        }];

        var grid = Ext.create('Ext.grid.Grid', {
            title: 'Simpsons',

            // Using the Named Store
            store: "simpsonsStore",

            columns: columns,
            layout: 'fit',
            fullscreen: true
        });

    }
});
`
var sample2 = "var button = Ext.create({xtype: 'button', text: 'Button'});Ext.application({name: 'MyApp',launch: function() {Ext.Viewport.add([button]);}})"


      ref.list.setData([
        { title: 'Item 1', example: sample},
        { title: 'Item 2', example: sample2 },
        { title: 'Item 3', example: 'c' },
        { title: 'Item 4', example: 'd' },
      ])


      var x = document.getElementById("exampleframe");
      var y = (x.contentWindow || x.contentDocument);
      if (y.document)y = y.document;
      window.y = y
      window.y.body.innerHTML ='example will be here...'





      //var sample = "var button=Ext.create({xtype: 'button', text: 'another Button'});\nExt.application({\nname: 'MyApp',\nlaunch: function() {Ext.Viewport.add([button]);}\n})"
      ref.exampletext.setValue(sample)

    });
  }

  function listSelect(event) {
    var sender = event.detail.sender;
    var selected = event.detail.selected;
    console.log(sender)
    console.log(selected)
    ref.exampletext.setValue(selected.data.example)

  }


  function treelistSelectionChange(event) {
    var data = event.detail.record.data;
    window.location.hash = '#' + data.xtype;
    fetch('./data/doc-modern/ext-react-modern-' + data.xtype + '.json')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      docproperties = data.docProperties
      docevents = data.docEvents
      //console.log(data);
      //ref.title.setHtml(data.title)
      ref.ExtWebComponentsTitle.setHtml('ExtWebComponents: ' + data.ExtWebComponentsTitle)
      //ref.ExtAngularTitle.setHtml('ExtAngular: ' + data.ExtAngularTitle)
      //ref.ExtReactTitle.setHtml('ExtReact: ' + data.ExtReactTitle)

      ref.first.setHtml(data.first)
      ref.text.setHtml(data.text)
      //console.log(ref.tabPanel.getTabBar().getTabs())
      ref.tabPanel.getTabBar().getTabs()[1].setBadgeText(docproperties.length)
      ref.tabPanel.getTabBar().getTabs()[2].setBadgeText('0')
      ref.tabPanel.getTabBar().getTabs()[3].setBadgeText(docevents.length)
      //console.log(ref.tabPanel)
      //ref.tabPanel.tabBar.tabs[1].setBadgeText(docproperties.length)
      //ref.tabPanel.getTabBar()._items.items[1].setBadgeText(docproperties.length)
      //ref.tabPanel.getTabBar()._items.items[2].setBadgeText('0')
      //ref.tabPanel.getTabBar()._items.items[3].setBadgeText(docevents.length)

      //console.log(ref.text.setBadgeText)
      //ref.text.setBadgeText("8")

      ref.properties.setHtml(data.propertyString)
      //ref.properties.setBadgeText("8")
      ref.events.setHtml(data.eventString)
    });
  }

  function containsMatches(node){
    const found =
      node.data.text.match(this.filterRegex) ||
      node.childNodes.some(child => containsMatches(child));
    if (found) node.expand();
    return found;
  };

  function filterNav(event){
    var value = event.detail.newValue;
    this.filterRegex = new RegExp(
      `(${Ext.String.escapeRegex(value)})`,
      'i'
    );
    ref.treelist
      .getStore()
      .filterBy(record => containsMatches(record));
  };

  function toggleIt(what, id) {
    sendToContext(what,id)
    var x = document.getElementById(id);
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

  sendToContext = function(what, val) {
    if (what == 'cfg') {
      var s = ''
      docproperties.find(function(element, index, array) {
        //console.log(element.name)
        if (element.name == val) {
          //console.log(element.text)
          s = '<div class="propertyheader">' + element.name + '</div>' +
              '<div class="propertydetail">' + element.text + '</div>'
        }

      })
      ref.context.setTitle('Property Detail')
      ref.context.setHtml(s)
    }

    if (what == 'event') {
      //console.log(val)
      var s = ''
      docevents.find(function(element, index, array) {
        //console.log(element.name)
        if (element.name == val.toLowerCase()) {
          //console.log(element.text)
          s = '<div class="propertyheader">' + element.name + '</div>' +
              '<div class="propertydetail">' + element.parameters + '</div>'
        }
      })
      //s = val
      ref.context.setTitle('Event Detail')
      ref.context.setHtml(s)
    }
  }

  onTap = function() {
    var x = document.getElementById("exampleframe");
    var theExample = "var button = Ext.create({xtype: 'button', text: 'Button'});Ext.application({name: 'MyApp',launch: function() {Ext.Viewport.add([button]);}})"
    x.src ='frame.html?example=' + escape(theExample)
  }

  onTap2 = function() {
    var x = document.getElementById("exampleframe");
    var theExample = ref.exampletext.getValue()
    x.src ='frame.html?example=' + escape(theExample)
  }

  onRun = function() {
    var x = document.getElementById("exampleframe");
    var theExample = ref.exampletext.getValue()
    x.src ='frame.html?example=' + escape(theExample)
  }
