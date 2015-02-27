'use strict';

module.exports = Robot;

var request = require('sync-request');

function Robot() {

  return {
    move_forwards: function() {
      sendCommand('forward', 10);
    },

    move_backwards: function() {
      sendCommand('backward', 10);
    },

    turn_left: function() {
      sendCommand('left', 10);
    },

    turn_right: function() {
      sendCommand('right', 10);
    }
  };

  function sendCommand(command, amount) {
    var amount_params = amount ? '?amount=' + amount : '';
    var server =  process.env.ENDPOINT || "localhost:4000"

    var url = "http://" + server + "/robotz/"
    var response = request('GET', url + command  + amount_params);

    console.log("response status: %s", response.statusCode);
  }
}
