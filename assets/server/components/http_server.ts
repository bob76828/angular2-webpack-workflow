import Debug = require('debug');
import http = require('http');

const debug = Debug('vynca-security-service:http_server');

export default class HttpServer {

  private _server:any;
  private _port:any;

  constructor(middleware:any, port = 3000) {
    let config = middleware;
    if (config === undefined) {
      config = () => {
      };
    }

    this._server = http.createServer(config);
    this._port = this._normalizePort(process.env.PORT || port);
  }

  start() {
    this._server.listen(this._port);
    this._server.on('error', this._onError);
    this._server.on('listening', this._onListening);
  }

  close() {
    this._server.close();
  }

  private _normalizePort(val:any) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
      return val;
    }

    if (port >= 0) {
      return port;
    }

    return false;
  }

  get _onError() {
    return (error:any) => {
      if (error.syscall !== 'listen') {
        throw error;
      }

      const binding = (() => {
        let result = '';
        if (typeof this._port === 'string') {
          result = 'Pipe ' + this._port;
        } else {
          result = 'Port ' + this._port;
        }
        return result;
      })();

      // handle specific listen errors with friendly messages
      switch (error.code) {
        case 'EACCES':
          debug(`error : ${binding} requires elevated privileges`);
          process.exit(1);
          break;
        case 'EADDRINUSE':
          debug(`error : ${binding} is already in use`);
          process.exit(1);
          break;
        default:
          throw error;
      }
    };
  }

  get _onListening() {
    return () => {
      const addr = this._server.address();
      const port = addr.port;
      const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${port}`;
      debug(`Listening on ${bind}`);
    };
  }
}
