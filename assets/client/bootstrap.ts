import {bootstrap}    from 'angular2/platform/browser';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {enableProdMode} from 'angular2/core';

import {App} from './app/component.ts';

declare var DEBUG:any;

export function main() {
  if (!DEBUG) {
    enableProdMode();
  }
  return bootstrap(App, [ROUTER_PROVIDERS])
    .catch(err => console.error(err));
}

document.addEventListener('DOMContentLoaded', main);
