'use strict';

module.exports = TurnRight;

function TurnRight() {
  return {
    canParse: function(command_string) {
      return /Turn Right/.test(command_string);
    },

    execute: function(robot) {
      robot.turn_right();
    }
  }
}