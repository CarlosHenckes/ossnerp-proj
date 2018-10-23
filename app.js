var express = require('express');
var http = require('http');
var load = require('express-load')
var path = require('path');
var favicon = require('serve-favicon');
//var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

// -- read from port and transmit
var server = http.createServer(app);
var io = require('socket.io').listen(server);

var SerialPort = require('serialport');

io.on('connection', function (socket) {
  console.log('socket connected');
});

var port = new SerialPort("COM5", 9600);
var Readline = SerialPort.parsers.Readline; // make instance of Readline parser
var parser = new Readline(); // make a new parser to read ASCII lines
port.pipe(parser); // pipe the serial stream to the parser

port.on('error', function (err) {
    console.log(err);
});

port.on('open', function () {
    console.log("Porta serial iniciada...");
});

parser.on('data', function (data) {
   // {'read' : 102}
    io.sockets.emit('leitura', data);
});

port.on('close', function(){
    console.log('port connection lost.');
    io.sockets.emit('lostconn', 'Porta serial desconectada.');
});
// --/ read from port and transmit

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

load('models')
  .then('controllers')
  .then('routes')
  .into(app);

  server.listen(3000, ()=>{
    console.log('server is running...');
  });