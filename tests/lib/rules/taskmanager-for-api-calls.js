/**
 * @fileoverview Prevent API calls without the use of TaskManager
 * @author Subhan
 */
"use strict";

function getErrors(type) {
  let errorObject = {
    message: "Use TaskManager for API calls"
  };
  errorObject.type = type;
  return [errorObject];
}
//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/taskmanager-for-api-calls"),
  RuleTester = require("eslint").RuleTester;
RuleTester.setDefaultConfig({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module"
  }
});

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("taskmanager-for-api-calls", rule, {
  valid: [
    `var a={sendRequest(){serviceDispatch({method:"GET",endpoint:"x"})}}`,
    `var a={sendRequest(){serviceDispatch({a:1})}}`,
    `serviceDispatch({method:"GET",endpoint:"x"})`,
    `serviceDispatch().then()`,
    `serviceDispatch({}).then()`,
    `serviceDispatch({test:1}).then()`,
    `serviceDispatch(test).then()`
  ],

  invalid: [
    {
      code: `var a={sendRequest(){return serviceDispatch({method:"GET",endpoint:"x"})}}`,
      errors: getErrors("ReturnStatement")
    },
    {
      code: `function sendRequest(){return serviceDispatch({method:"GET",endpoint:"x"})}`,
      errors: getErrors("ReturnStatement")
    },
    {
      code: `serviceDispatch({method:"GET",endpoint:"x"}).then()`,
      errors: getErrors("MemberExpression")
    },
    {
      code: `serviceDispatch({method:"GET"}).then()`,
      errors: getErrors("MemberExpression")
    },
    {
      code: `serviceDispatch({endpoint:"x"}).then()`,
      errors: getErrors("MemberExpression")
    },
    {
      code: `serviceDispatch({method}).then()`,
      errors: getErrors("MemberExpression")
    }
  ]
});
