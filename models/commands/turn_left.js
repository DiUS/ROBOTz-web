'use strict';

module.exports = TurnLeft;

function TurnLeft() {
  return {
    canParse: function(command_string) {
      return /Turn Left/.test(command_string);
    },

    execute: function(robot) {
      robot.turn_left();
    }
  }
}