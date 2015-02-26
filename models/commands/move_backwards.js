'use strict';

module.exports = MoveBackwards;

function MoveBackwards() {
  return {
    canParse: function(command_string) {
      return /Backward/.test(command_string);
    },

    execute: function(robot) {
      robot.move_backwards();
    }
  }
}