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
      sendCommand('left');
    },

    turn_right: function() {
      sendCommand('right');
    }
  };

  function sendCommand(command) {
    var response = request('GET', 'http://localhost:4000/robotz/' + command);

    console.log("response status: %s", response.getStatus());
    console.log(response.getBody());
  }
}