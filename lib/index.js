/**
 * @fileoverview Smartface cloud 2.0 development linter
 * @author Subhan Naeem
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var requireIndex = require("requireindex");

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------


// import all rules in lib/rules
module.exports.configs = {
  recommended: {
    rules: {
      'smartface-cloud/taskmanager-for-api-calls': 2,
    },
  },
};
module.exports.rules = requireIndex(__dirname + "/rules");



