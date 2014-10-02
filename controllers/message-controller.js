var Mailgun = require('mailgun').Mailgun;
var config = require('../config/config');
var _ = require('lodash');

var MessageController = function(){
  var self = this;

  self.create = function(req, res) {
    var mg = new Mailgun(config.mailgun.apiKey);
    var from = req.body.flowId + '@webhook.octoblu.com';
    var to = req.body.to;
    var subject = req.body.subject;
    var body = req.body.body;
    mg.sendText(from, to, subject, body, function(err) {
      if (err) {
        console.error(err.message, err.stack);
        res.send(422, err);
        return;
      }
      res.send(201);
    })
  }
}
module.exports = MessageController;
