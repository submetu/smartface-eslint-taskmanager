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
    `serviceDispatch(test).then()`,
    "createApiTask(()=> {return serviceDispatch({method:\"PATCH\",endpoint:`testing-distribution/v1/profiles/${profileID}/app-versions/${appID}`,data:JSON.stringify({versionTags:tags.map(a=>a.text)||[]}),headers:{\"Content-Type\":\"application/json\"}})});",
    "createApiTask(()=> serviceDispatch({method:\"PATCH\",endpoint:`testing-distribution/v1/profiles/${profileID}/app-versions/${appID}`,data:JSON.stringify({versionTags:tags.map(a=>a.text)||[]}),headers:{\"Content-Type\":\"application/json\"}}));",
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
    },
    {
        code:`var createApiTask = ()=> serviceDispatch({method:"GET",endpoint:"x"})`,
        errors: getErrors("Identifier")
    },
    {
        code: "randomFunction(()=> {return serviceDispatch({method:\"PATCH\",endpoint:`testing-distribution/v1/profiles/${profileID}/app-versions/${appID}`,data:JSON.stringify({versionTags:tags.map(a=>a.text)||[]}),headers:{\"Content-Type\":\"application/json\"}})});",
        errors: getErrors("ReturnStatement")
    },
    {
        code: "randomFunction(()=>serviceDispatch({method:\"PATCH\",endpoint:`testing-distribution/v1/profiles/${profileID}/app-versions/${appID}`,data:JSON.stringify({versionTags:tags.map(a=>a.text)||[]}),headers:{\"Content-Type\":\"application/json\"}}));",
        errors: getErrors("Identifier")
    }
  ]
});
