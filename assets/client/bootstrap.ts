import {bootstrap}    from 'angular2/platform/browser';
import {Home} from './app/home/component.ts';

export function main() {
    return bootstrap(Home).catch(err => console.error(err));
}

document.addEventListener('DOMContentLoaded', main);