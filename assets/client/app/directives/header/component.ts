import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';

const template = require('./template.html');

@Component({
  selector: 'header',
  template: template,
  directives: [ROUTER_DIRECTIVES]
})
export class Header {
  constructor() {
  }
}

