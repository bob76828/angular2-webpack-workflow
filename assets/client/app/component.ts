import {Component, View} from 'angular2/core';
import {RouteConfig,ROUTER_DIRECTIVES} from 'angular2/router';

import {Header} from './directives/header/component.ts';
import {Footer} from './directives/footer/component.ts';
import {Home} from './views/home/component.ts';
import {Page1} from './views/page1/component.ts';

@Component({
  selector: 'app',
  template: `
  <header></header>
  <main><router-outlet></router-outlet></main>
  <footer class="footer"></footer>
  `,
  directives: [ROUTER_DIRECTIVES, Header, Footer]
})
@RouteConfig([
  {path: '/', component: Home, name: 'Home'},
  {path: '/page1', component: Page1, name: 'Page1'}
])
export class App {
  constructor() {
  }
}

