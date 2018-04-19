const loopback = require('loopback');
const boot = require('loopback-boot');

const app = loopback();
module.exports = app;

app.start = function () {
  app.use(/^\/(?!api).*$/, (req, res, next) => {
    res.setHeader('Cache-Control', 'private, max-age=3600');
    next();
  });
  // start the web server
  return app.listen(() => {
    app.emit('started');
    console.log('URL', app.get('url'));
    const baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      const explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
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
