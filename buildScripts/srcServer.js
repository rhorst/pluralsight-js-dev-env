var express = require('express');
var path = require('path');
var open = require('open');

var port = 3000;
var app = express();

//tell express which routes it should handle
app.get('/', function(req, res){
  //tells it to join the path to source directory to the current directory name
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

//tell express to listen to the port we named above, pls error handling
app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open('http://localhost:' + port);
  }
})
