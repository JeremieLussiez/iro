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
  console.log("Loading certificates");
  const options = {
    key: fs.readFileSync('/etc/letsencrypt/archive/my-iro.com/privkey1.pem').toString(),
    cert: fs.readFileSync('/etc/letsencrypt/archive/my-iro.com/cert1.pem').toString(),
  };
  console.log('KEY = ');
  console.log(options.key);
  console.log('CERT = ');
  console.log(options.cert);
  server = https.createServer(options, app);
  failServer = http.createServer(app);
  sslAvailable = true;
} else {
  server = http.createServer(app);
}

app.start = function () {
  // start the web server
  return server.listen(app.get('port'), () => {
    const baseUrl = (sslAvailable ? 'https://' : 'http://') + app.get('host') + ':' + app.get('port');
    app.emit('started', baseUrl);
    console.log('LoopBack server listening @ %s%s', baseUrl, '/');
    if (app.get('loopback-component-explorer')) {
      const explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
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
