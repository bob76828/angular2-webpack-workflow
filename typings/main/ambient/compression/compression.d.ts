// Compiled using typings@0.3.4
// Source: https://raw.githubusercontent.com/definitelytyped/DefinitelyTyped/9dbba87a0de04697b26391557f48acfff113b7ce/compression/compression.d.ts
// Type definitions for compression
// Project: https://github.com/expressjs/compression
// Definitions by: Santi Albo <https://github.com/santialbo/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped


declare module "compression" {
    import express = require('express');

    module e {
        interface CompressionOptions  {
            threshold?: number;
            filter?: Function;
        }
    }

    function e(options?: e.CompressionOptions): express.RequestHandler;
    export = e;
}