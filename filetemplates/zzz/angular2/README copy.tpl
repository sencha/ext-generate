## @sencha/ext-angular{bundle}

last run: {now}

This npm package contains the minimum files that are needed to provide for the @sencha/ext-angular{bundle} package for an Angular application

## Test with an Angular CLI generated app

#### Install Angular CLI

```sh
npm install -g @angular/cli
```

should be @angular/cli@8.3.x


#### Create a new Angular CLI application

```sh
ng new ext-angular-demo --minimal=true --interactive=false -g=true --skipInstall=false
```

Add ExtAngular to your application by running the following:

```sh
cd ext-angular-demo
npm install @sencha/ext-angular --save
```

Open your editor

To open Visual Studio Code, type the following:

```sh
code .
```

#### Add ExtAngular to your project

Add to ./src/style.css:

```sh
:root {
    --base-color: darkblue;
    --base-foreground-color: yellow;
    --background-color: lightblue;
    --color: green;
}
```

Add to ./src/app/app.module.ts:

```sh
import { ExtAngularModule } from '@sencha/ext-angular';

  imports: [
    BrowserModule,
    ExtAngularModule
  ],
```

or...

Replace ./src/app/app.module.ts with:

```sh
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ExtAngularModule } from '@sencha/ext-angular';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ExtAngularModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

Add to ./src/app/app.component.ts:

```sh
 <ExtButton text="a button" shadow="true"></ExtButton>
```

or...

Replace ./src/app/app.component.ts with:

```sh
import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
<ExtPanel viewport="true" title="panel" layout="fit">
    <ExtToolbar docked="top">
        <ExtButton text="a button" shadow="true"></ExtButton>
    </ExtToolbar>
    <ExtGrid
        [title]="title"
        (ready)="readyGrid($event)"
    >
        <ExtGridcolumn text="name" dataIndex="name"></ExtGridcolumn>
        <ExtGridcolumn text="email" dataIndex="email" flex="1"></ExtGridcolumn>
    </ExtGrid>
</ExtPanel>
    `,
    styles: []
})
export class AppComponent {
    title = 'the grid';
    data=[
        {name: 'Marc', email: 'marc@gmail.com'},
        {name: 'Nick', email: 'nick@gmail.com'},
        {name: 'Andy', email: 'andy@gmail.com'},
    ]
    readyGrid(event) {
        var grid = event.cmp;
        grid.setData(this.data)
    }
}
```

Type the following in a command/terminal window:

```sh
ng serve --open --port 4201
```



-----------------------------------------------

#### Open your editor

To open Visual Studio Code, type the following:

```sh
cd ng-eng{bundle}; code .
```

#### Add to package.json

In the dependencies section of package.json, add the following:

```sh
"@sencha/ext-angular{bundle}": "7.1.0",
```

#### Run npm install

in a terminal window at the root of your application, run the following:

```sh
npm install
```

#### Replace src/styles.css (optional)

If you want to get a look at different styling...
Open the src/styles.css file in the editor and replace the contents with the following:

```sh
/* Find color names here: https://www.rapidtables.com/web/color */
:root {
    --dark-mode: false;
    --base-color: yellow !important;
    --base-highlight-color: #64b5f6;
    --base-light-color: #bbdefb;
    --base-dark-color: #1976d2;
    --base-pressed-color: #6ab8f7;
    --base-focused-color: #42a5f5;
    --base-invisible-color: rgba(33, 150, 243, 0);
    --base-foreground-color: green !important;
    --accent-color: #ff9800;
    --accent-light-color: #ffe0b2;
    --accent-dark-color: #f57c00;
    --accent-pressed-color: #ffb74d;
    --accent-invisible-color: rgba(255, 152, 0, 0);
    --accent-foreground-color: #222;
    --confirm-color: #7cb342;
    --confirm-pressed-color: #a2cc75;
    --alert-color: #c62828;
    --alert-pressed-color: #de5c5c;
    --color: blue !important;
    --reverse-color: #fff;
    --highlight-color: rgba(17, 17, 17, 0.54);
    --disabled-color: rgba(17, 17, 17, 0.38);
    --reverse-disabled-color: rgba(255, 255, 255, 0.38);
    --divider-color: #e2e2e2;
    --selected-background-color: #e0e0e0;
    --hovered-background-color: #eee;
    --header-background-color: #f5f5f5;
    --faded-color: #e1e1e1;
    --background-color: #fafafa;
    --alt-background-color: #f5f5f5;
    --reverse-background-color: #303030;
    --reverse-alt-background-color: #3a3a3a;
    --overlay-color: rgba(0, 0, 0, 0.03);
    --content-padding: 16px;
    --listitem-selected-background-color: #e0e0e0;
    --reverse-border-color: #e0e0e0;
    --reverse-alt-border-color: #e0e0e0;
}

.x-grid {
    --color: red !important;
}
```

#### Replace src/app/app.module.ts

Open the src/app/app.module.js file in the editor and replace the contents with the following:

```sh
{angular.module}
```


#### Replace src/app/app.component.ts

Open the src/app/app.component.ts file in the editor and replace the contents with the following: {example}

```sh
{angular.component}
```

#### Run the application

Type the following in a command/terminal window:

```sh
ng serve --open --port 4200
```

open http://localhost:4200 in a browser - the ExtAngular application will load

#### components in this package:

{wantedxtypes}

#### imports in the npm package module:
##### @sencha/ext-angular{bundle}/ext-angular{bundle}.module

{imports}