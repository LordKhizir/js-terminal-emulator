/*!
 *
 * This work is inspired & partially based by jQuery CLI: Simulating a command line interface with jQuery
 *
 * jQuery CLI:
 * @author : Paulo Nunes (http://syndicatefx.com)
 * @demo : https://codepen.io/syndicatefx/pen/jPxXpz
 * @license: MIT
 */


// Declare html elements
var histo;
var commandInput;

// Initialization - defined in terminal_config.js
document.getElementById("commandSpan").innerHTML=config.prompt + document.getElementById("commandSpan").innerHTML;
commandInput = document.getElementById('commandInput');
histo = document.getElementById('histo');
histo.innerHTML+="<pre>Welcome to " + config.title + "\n" +
  "Type 'help' + Enter -- for available commands.</pre>";
commandInput.focus();
addEvent(commandInput, "keyup", commandKeyPress);

function commandKeyPress(e) {
  if(e.which == 13){// ENTER key pressed
    var issuedCommand = commandInput.value;
    if (issuedCommand) {
      issuedCommand=issuedCommand.replace(/[^a-z0-9\s]/gi, '') // sanitize
    }
    commandInput.value = "";
    doCommand(issuedCommand);
  }
}

function doCommand(issuedCommand) {
  // add prompt + command to history
  histo.innerHTML+="<pre>" + config.prompt + " " + issuedCommand + "</pre>";
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
  document.getElementById("screenBottom").scrollIntoView({block: "end", behavior: "smooth"});
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

function addEvent(element, eventName, callback) {
    if (element.addEventListener) {
        element.addEventListener(eventName, callback, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + eventName, callback);
    }
}

/* BASE COMMANDS */
function doCommandClear() {
  histo.innerHTML="";
}

function doCommandHelp() {
  histo.innerHTML+="<pre>" + config.title + "\n"
    + "These shell commands are defined internally.  Type 'help' to see this list.\n"
    + "Type 'help name' to find out more about the function 'name'\n\n</pre>";
  var allCommandsText = "";
  for (let command of config.commands) {
    allCommandsText+= command.syntax.padRight(" ", 24) +  command.description + "\n";
  }
  histo.innerHTML+="<pre>" + allCommandsText + "</pre>";
}

function doCommandUnknown(command) {
  histo.innerHTML+="<pre>" + command + " : command not found</pre>";
}
