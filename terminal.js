/*!
 *
 * This work is inspired & partially based by jQuery CLI: Simulating a command line interface with jQuery
 *
 * jQuery CLI:
 * @author : Paulo Nunes (http://syndicatefx.com)
 * @demo : https://codepen.io/syndicatefx/pen/jPxXpz
 * @license: MIT
 */

// Initialize
var company = "Schibsted Spain";
var prompt = "prospect@schibsted-spain:/$";
var emailRecipient = "toni.navarro@infojobs.net";
// Declare html elements
var commandInput;
var histo;
$(document).ready(function() {
  $('span.command').prepend(prompt);
  commandInput = $('input[type="text"]');
  histo = $('span#history');
  histo.append("<pre>Welcome to " + company + "\n" +
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
  histo.append("<pre>" + prompt + " " + issuedCommand + "</pre>");
  // analyze command
  if (issuedCommand) {
    commandArgs = issuedCommand.split(" ")
    switch (commandArgs[0]) {
      case "positions":
        doCommandPositions();
        break;
      case "position":
        doCommandPosition(commandArgs[1]);
        break;
      case "apply":
        doCommandApply(commandArgs[1]);
        break;
      case "clear":
          doCommandClear()
          break;
      case "help":
        if (commandArgs.length==1) {
          doCommandHelp()
        } else {
          doCommandNotImplementedYet();
        }
        break;
      default :
        doCommandUnknown(commandArgs[0]);
        break;
    }
  }
  // move focus
  $("screen-bottom").scrollIntoView({block: "end", behavior: "smooth"});
  commandInput.focus();
}

function doCommandPosition(key) {
  if (key) {
    var position = _getPositionByKey(key);
    if (position) {
      histo.append("<pre>key: " + position.key + "\n"
        + "role: " + position.role + "</pre>");
    } else {
      histo.append("<pre>No position found for key '" + key + "'</pre>");
    }
  } else {
    histo.append("<pre>Missing position key</pre>");
  }
}

function doCommandPositions() {
    for (let position of data.positions) {
      histo.append("<pre>" + position.key + "</pre>")
    }
}

function _getPositionByKey(key) {
  for (let position of data.positions) {
    if (position.key==key) {
      return position;
    }
  }
  return //not found
}

function doCommandApply(key) {
  if (key) {
    var position = _getPositionByKey(key);
    if (position) {
      var mailURL = "mailto:" + emailRecipient + "?subject=Position%20" + position.key + "&body=Please%20get%20back%20to%20me%20with%20more%20info";
      histo.append("<pre>Creating application email to position key: " + position.key + ", role: " + position.role + "\n"
        + "Please add your contact information and send it\n"
        + "If nothing happens, due to pop-up blocking or other issues, you can also send it through this link</pre>");
      histo.append("<a href='" + mailURL + "'>Click here to send email</a><br/><br/>");
      window.location.href(mailURL);
    } else {
      histo.append("<pre>No position found for key " + key + "</pre>");
    }
  } else {
    histo.append("<pre>Missing position key</pre>");
  }
}

function doCommandClear() {
  histo.empty();
}

function doCommandHelp() {
  histo.append("<pre>" + company + "'s recruitment console\n"
    + "These shell commands are defined internally.  Type 'help' to see this list.\n"
    + "Type 'help name' to find out more about the function 'name'\n\n"
    + "positions                  get list of open positions\n"
    + "position key               get info about specific 'key' position\n"
    + "apply key                  apply to an open 'key' position\n"
    + "clear                      clear history\n"
    + "help                       show this list of available commands\n"
    + "</pre>");
}

function doCommandNotImplementedYet() {
  histo.append("<pre>Sorry this command is not implemented yet</pre>")
}
function doCommandUnknown(command) {
  histo.append("<pre>" + command + " : command not found</pre>");
}
