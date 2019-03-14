const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  // ...
  app.use(proxy('/backend', { target: 'http://meowbook.ru:5000/' }));
};
