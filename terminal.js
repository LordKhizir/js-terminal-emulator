/*!
 *
 * This work is inspired & partially based by jQuery CLI: Simulating a command line interface with jQuery
 *
 * jQuery CLI:
 * @author : Paulo Nunes (http://syndicatefx.com)
 * @demo : https://codepen.io/syndicatefx/pen/jPxXpz
 * @license: MIT
 */

// Initialization - defined in terminal_config.js

// Declare html elements
var commandInput;
var histo;
$(document).ready(function() {
  $('span.command').prepend(config.prompt);
  commandInput = $('input[type="text"]');
  histo = $('span#history');
  histo.append("<pre>Welcome to " + config.title + "\n" +
    "Type 'help' + Enter -- for available commands.</pre>");
  commandInput.focus();
  commandInput.keyup(function(e){
    if(e.which == 13){// ENTER key pressed
      var issuedCommand = commandInput.val();
      if (issuedCommand) {
        issuedCommand=issuedCommand.replace(/[^a-z0-9\s]/gi, '') // sanitize
      }
      doCommand(issuedCommand);
    }
  });
});

function doCommand(issuedCommand) {
  // remove command
  commandInput.val("");
  // add prompt + command to history
  histo.append("<pre>" + config.prompt + " " + issuedCommand + "</pre>");
  // analyze command
  if (issuedCommand) {
    commandArgs = issuedCommand.split(" ")
    // search for matching command
    var command = _getCommandByName(commandArgs[0]);
    if (command) {
      window[command.exec](commandArgs);
    } else {
      doCommandUnknown(commandArgs[0]);
    }
  }
  // move focus
  $("screen-bottom").scrollIntoView({block: "end", behavior: "smooth"});
  commandInput.focus();
}

function _getCommandByName(name) {
  for (let command of config.commands) {
    if (command.name==name) {
      return command;
    }
  }
  return //not found
}

// Utils
String.prototype.padRight = function(char, length) {
    return this + char.repeat(Math.max(0, length - this.length));
}


/* BASE COMMANDS */
function doCommandClear() {
  histo.empty();
}

function doCommandHelp() {
  histo.append("<pre>" + config.title + "\n"
    + "These shell commands are defined internally.  Type 'help' to see this list.\n"
    + "Type 'help name' to find out more about the function 'name'\n\n</pre>")
  var allCommandsText = "";
  for (let command of config.commands) {
    allCommandsText+= command.syntax.padRight(" ", 24) +  command.description + "\n";
  }
  histo.append("<pre>" + allCommandsText + "</pre>")
}

function doCommandUnknown(command) {
  histo.append("<pre>" + command + " : command not found</pre>");
}
