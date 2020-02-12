<html>

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=10, user-scalable=yes">
    <script type="module" src="./src/ext-grid.component.js"></script>
    <script type="module" src="./src/ext-gridcolumn.component.js"></script>
</head>

<script>
    window.main = {}
    window.main.onReady = function(event) {
        console.log('ready')
        console.log(event)

        event.detail.ext.setData([
            {"name": "Lisa3", "email": "lisa@simpsons.com", "phone": "555-111-1224"},
            {"name": "Bart", "email": "bart@simpsons.com", "phone": "555-222-1234"},
            {"name": "Homer", "email": "homer@simpsons.com", "phone": "555-222-1244"},
            {"name": "Marge", "email": "marge@simpsons.com", "phone": "555-222-1254"}
        ])
    }
    window.main.onTap = function() {
        console.log('tap')
    }
</script>

<body>
    <ext-grid
        onready="main.onReady"
        title="the grid"
        height="250px"
        xcolumns='[
            {"text": "Name", "width": "250", "dataIndex": "name"},
            {"text": "Email Address", "flex": "1", "dataIndex": "email"},
            {"text": "Phone Number", "width": "250", "dataIndex": "phone"}
        ]'
        xdata='[
            {"name": "Lisa", "email": "lisa@simpsons.com", "phone": "555-111-1224"},
            {"name": "Bart", "email": "bart@simpsons.com", "phone": "555-222-1234"},
            {"name": "Homer", "email": "homer@simpsons.com", "phone": "555-222-1244"},
            {"name": "Marge", "email": "marge@simpsons.com", "phone": "555-222-1254"}
        ]'
    >
        <ext-gridcolumn width="250px" text="Name" dataIndex="name"></ext-gridcolumn>
        <ext-gridcolumn flex="1" text="Email Address" dataIndex="email"></ext-gridcolumn>
        <ext-gridcolumn  width="250px" text="Phone Number" dataIndex="phone"></ext-gridcolumn>
    </ext-grid>


</body>

</html>

<!-- package.json

{
    "name": "js-cli",
    "version": "1.0.0",
    "description": "ext-web-components example",
    "scripts": {},
    "devDependencies": {
      "@sencha/ext-web-components-all": "~7.1.0"
    },
    "author": "",
    "license": "ISC",
    "repository": {}
}

-->
