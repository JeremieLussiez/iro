const loopback = require('loopback');
const boot = require('loopback-boot');
const http = require('http');
const https = require('https');
const path = require('path');
const fs = require('fs');

const app = loopback();
module.exports = app;

let sslAvailable = false;
if (process.env.NODE_ENV === 'production') {
  const options = {
    key: fs.readFileSync('/etc/letsencrypt/archive/my-iro.com/privkey1.pem').toString(),
    cert: fs.readFileSync('/etc/letsencrypt/archive/my-iro.com/cert1.pem').toString(),
  };
  server = https.createServer(options, app);
  sslAvailable = true;
  http.createServer((req, res) => {
    res.writeHead(301, {'Location': 'https://' + req.headers['host'] + req.url});
    res.end();
  }).listen(80);
} else {
  server = http.createServer(app);
}

app.start = function () {
  // start the web server
  server.listen(app.get('port'), () => {
    const baseUrl = (sslAvailable ? 'https://' : 'http://') + app.get('host') + ':' + app.get('port');
    app.emit('started', baseUrl);
    console.log('LoopBack server listening @ %s%s', baseUrl, '/');
    if (app.get('loopback-component-explorer')) {
      const explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
  return server;
  /*
  return app.listen(() => {
    app.emit('started');
    console.log('URL', app.get('url'));
    const baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      const explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });*/
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, (err) => {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module) {
    app.start();
  }
});
