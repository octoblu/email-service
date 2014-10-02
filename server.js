var express = require('express'),
http        = require('http'),
https        = require('https'),
path        = require('path'),
fs          = require('fs'),
morgan        = require('morgan'),
methodOverride = require('method-override'),
session        = require('express-session'),
bodyParser     = require('body-parser'),
config         = require('./config/config'),
skynet         = require('skynet'),
errorHandler   = require('errorhandler');

var port       = process.env.EMAIL_PORT || process.env.PORT || 9011;
var meshblu    = skynet.createConnection(config.meshblu);
var meshbluAuth = require('./middleware/meshblu-auth');

app = express();
app.use(bodyParser.json());
app.use(session({resave: true, saveUninitialized: true, secret: 'sqrt0fSaturn'}));
app.use(morgan('combined'));
app.use(methodOverride());
app.use(errorHandler());
app.use(express.static(path.join(__dirname, 'public')));

var MessageController = require('./controllers/message-controller');
var messageController = new MessageController();

app.post('/messages', meshbluAuth.authenticate, messageController.create);

var httpServer = http.createServer(app);

httpServer.listen(port, function(){
  console.log('Listening on port ' + port);
});