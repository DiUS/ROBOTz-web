'use strict';

module.exports = Robot;

var request = require('sync-request');

function Robot() {

  return {
    move_forwards: function() {
      sendCommand('forward');
    },

    move_backwards: function() {
      sendCommand('backward');
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
    var response = request('GET', 'http://localhost:4000/robotz/' + command  + amount_params);

    console.log("response status: %s", response.statusCode);
  }
}