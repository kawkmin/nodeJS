var express = require('express')
var http = require('http')
var routes = require('./routes')
var todo = require('./routes/todo')
var path = require('path');

var app = express();
var server = http.createServer(app);

app.configure(function () {
  app.set('port', 52273);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.get('/', routes.index);
app.get('/list', todo.list);
app.post('/add', todo.add);
app.post('/complete', todo.complete);
app.post('/del', todo.del);

server.listen(app.get('port'), function () {
  console.log('Server Running at http://127.0.0.1:52273');
});
