// Compiled using typings@0.3.4
// Source: https://raw.githubusercontent.com/definitelytyped/DefinitelyTyped/fe09ccfd68e9fcab455b584e5b2d82f40cd95ae4/debug/debug.d.ts
// Type definitions for debug
// Project: https://github.com/visionmedia/debug
// Definitions by: Seon-Wook Park <https://github.com/swook>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

declare module "debug" {

    function d(namespace: string): d.Debugger;

    module d {
        export var log: Function;

        function enable(namespaces: string): void;
        function disable(): void;

        function enabled(namespace: string): boolean;

        export interface Debugger {
            (formatter: any, ...args: any[]): void;

            enabled:   boolean;
            log:       Function;
            namespace: string;
        }
    }

    export = d;

}