'use strict';

module.exports = Robot;

function Robot() {

  // TOOD - uncomment the serial port code below when we're
  // ready to talk to the arduino

  // var serialPortName = "/dev/tty.usbmodem1411";
  // var SerialPort     = require('serialport').SerialPort;
  // var serialPort     = new SerialPort(serialPortName);

  var serialPort = {
    write: function(some_string, callback) {
      console.log("writing %s to the serial port", some_string);
    }
  }

  return {
    move_forwards: function() {
      serialPort.write('Move Forwards?', serialPortCallback);
    },

    move_backwards: function() {
      serialPort.write('Move Backwards?', serialPortCallback);
    },

    turn_left: function() {
      serialPort.write('Turn Left?', serialPortCallback);
    },

    turn_right: function() {
      serialPort.write('Turn Right?', serialPortCallback);
    }
  };

  function serialPortCallback(err, results) {
    console.log('err ' + err);
    console.log('results ' + results);
  }
}