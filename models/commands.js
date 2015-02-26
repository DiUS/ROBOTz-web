'use strict';

module.exports = Commands;

var MoveForwards  = require('./commands/move_forwards')();
var MoveBackwards = require('./commands/move_backwards')();
var TurnLeft      = require('./commands/turn_left')();
var TurnRight     = require('./commands/turn_right')();

function Commands(command_list) {

  var executableCommands = command_list.reduce(function(commands, command_string) {
    [ MoveForwards, 
      MoveBackwards, 
      TurnLeft, 
      TurnRight ].forEach(function(executableCommand) {
      if (executableCommand.canParse(command_string)) {
        commands.push(executableCommand);
      }
    });
    return commands;
  }, []);

  return {
    execute: function(robot) {
      executableCommands.forEach(function(command) {
        command.execute(robot);
      });
    }
  }
}