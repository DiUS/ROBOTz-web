'use strict';

module.exports = MoveForwards;

function MoveForwards() {
  return {
    canParse: function(command_string) {
      return /Forward/.test(command_string);
    },

    execute: function(robot) {
      robot.move_forwards();
    }
  }
}