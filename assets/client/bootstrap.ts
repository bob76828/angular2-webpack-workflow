import {bootstrap}    from 'angular2/platform/browser';
import {ROUTER_PROVIDERS} from 'angular2/router';

import {App} from './app/component.ts';

export function main() {
  return bootstrap(App, [ROUTER_PROVIDERS])
    .catch(err => console.error(err));
}

document.addEventListener('DOMContentLoaded', main);
