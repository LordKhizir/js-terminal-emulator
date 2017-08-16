// data island
var config = {
  "title": "Schibsted Spain's recruiting console",
  "prompt": "prospect@schibsted-spain:/$",
  "commands": [
    /* minimum set of commands */
    {"name": "clear",
      "syntax": "clear",
      "description": "clear history",
      "exec": "doCommandClear"},
    {"name": "help",
      "syntax": "help",
      "description": "show this list of available commands",
      "exec": "doCommandHelp"},
    /* extended commands */
    {"name": "positions",
      "syntax":"positions",
      "description":"get list of open positions",
      "exec":"doCommandPositions"},
    {"name": "position",
      "syntax":"position key",
      "description":"get info about specific 'key' position",
      "exec":"doCommandPosition"},
    {"name": "apply",
      "syntax":"apply key",
      "description":"apply to an open 'key' position",
      "exec":"doCommandApply"}
  ]
};
var data = {
  "emailRecipient" : "toni.navarro@infojobs.net",
  "positions": [
    {"key":"fr1", "role":"front-end developer"},
    {"key":"fr2", "role":"front-end-developer"}
  ]
}

// EXTENDED TERMINAL COMMANDS

function _getPositionByKey(key) {
  for (let position of data.positions) {
    if (position.key==key) {
      return position;
    }
  }
  return //not found
}

function doCommandPosition(arguments) {
  var key = arguments[1];
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

function doCommandApply(arguments) {
  var key = arguments[1];
  if (key) {
    var position = _getPositionByKey(key);
    if (position) {
      var mailURL = "mailto:" + data.emailRecipient + "?subject=Position%20" + position.key + "&body=Please%20get%20back%20to%20me%20with%20more%20info";
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
