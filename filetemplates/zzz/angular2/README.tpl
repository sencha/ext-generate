## @sencha/ext-angular{bundle}

last run: {now}

This npm package contains the files that are needed to add the @sencha/ext-angular{bundle} package to an Angular application

## Login to the Sencha early adopter npm repo

```sh
npm login --registry=https://sencha.myget.org/F/early-adopter/npm/ --scope=@sencha

```

## Create an Angular application with Angular CLI


npm login --registry=https://sencha.myget.org/F/early-adopter/npm/ --scope=@sencha

#### Install Angular CLI

```sh
npm install -g @angular/cli
```

should be @angular/cli@8.3.x


#### Create a new Angular CLI application

- Run 'ng new':

```sh
ng new ext-angular-demo --minimal=true --interactive=false -g=true --skipInstall=false
```

- Add ExtAngular to your application by running the following:

```sh
cd ext-angular-demo
npm install @sencha/ext-angular{bundle} --save
```

- Open your editor

To open Visual Studio Code, type the following:

```sh
code .
```

(You can use any editor)

#### Add ExtAngular to your project

- Add to ./src/styles.css:

```sh
:root {
  --base-color: #024059;
  --base-foreground-color: white;
  --background-color: white;
  --color: black;
}
```

- Replace ./src/app/app.module.ts with:

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

- Replace ./src/app/app.component.ts with:

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

- Type the following in a command/terminal window:

```sh
ng serve --open --port 4201
```

open http://localhost:4201 in a browser - the ExtAngular application will load