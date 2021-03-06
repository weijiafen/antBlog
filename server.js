var express = require('express');
var app = express();

var router=require('./src/main/server/routers/router.js');
app.use(express.static('src/main/webapp/build',{maxAge:36000000}));
app.use(express.static('upload',{maxAge:36000000}));
router(app);


var server = app.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});