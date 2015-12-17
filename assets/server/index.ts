import HttpServer from './components/http_server';
import Express = require('express');
import helmet = require('helmet');
import compression = require('compression');
import controllers from './controllers';
import path = require('path');

const rootPath = path.dirname(module.parent.filename);
const config = require(path.join(rootPath, 'config/server.json'));

class Main {

  private _express:any;

  constructor() {
    this._express = Express();
    this._setMiddlewares();
    this._setStaticPath();
  }

  getApp() {
    return this._express;
  }

  private _setMiddlewares() {
    this._express.use(controllers);
    this._express.use(helmet());
    this._express.use(compression());
  }

  private _setStaticPath() {
    this._express.use('/public', Express.static('build/public'));
    this._express.get('/404/', (req:any, res:any)=> {
      res.sendFile(path.join(rootPath, 'build/public/404.html'));
    });
    this._express.get('/*', (req:any, res:any)=> {
      res.sendFile(path.join(rootPath, 'build/public/index.html'));
    });
  }
}

const main = new Main();
const server = new HttpServer(main.getApp(), config.port);
server.start();
