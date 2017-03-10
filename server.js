var express = require('express');
var app = express();
var fs=require('fs');
app.use(express.static('src/main/webapp/build'));

app.get('/', function (req, res) {
	fs.readFile('src/main/webapp/index.html',function(err,data){
		if(err){
			res.end('404');
		}
		else{
			res.end(data.toString());
		}
	})
  
});

var server = app.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});