/**
 * @fileoverview Prevent API calls without the use of TaskManager
 * @author Subhan
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: "Prevent API calls without the use of TaskManager",
      category: "Fill me in",
      recommended: false
    },
    fixable: null, // or "code" or "whitespace"
    schema: [
      // fill in your schema
    ]
  },

  create: function(context) {
    let propertiesToCheck = ["method", "endpoint"];
    return {
      ReturnStatement: function ReturnStatement(node) {
        if (
          node.parent &&
          node.parent.parent &&
          node.parent.parent.parent &&
          node.parent.parent.parent.callee &&
          node.parent.parent.parent.callee.type === "Identifier" &&
          node.parent.parent.parent.callee.name === "createApiTask"
        )
          return;
        if (
          node.argument &&
          node.argument.type === "CallExpression" &&
          node.argument.callee &&
          node.argument.callee.type === "Identifier" &&
          node.argument.arguments[0] &&
          node.argument.arguments[0].properties.length &&
          node.argument.arguments[0].properties.filter(function(property) {
            return propertiesToCheck.includes(property.key.name);
          }).length
        ) {
          context.report({
            node: node,
            message: "Use TaskManager for API calls"
          });
        }
      },
      MemberExpression: function MemberExpression(node) {
        if (
          node.object.type === "CallExpression" &&
          node.object.arguments.length === 1 &&
          node.object.arguments[0].type === "ObjectExpression" &&
          node.object.arguments[0].properties.length &&
          node.object.arguments[0].properties.filter(function(property) {
            return propertiesToCheck.includes(property.key.name);
          }).length &&
          node.property &&
          node.property.type === "Identifier" &&
          node.property.name === "then"
        ) {
          context.report({
            node: node,
            message: "Use TaskManager for API calls"
          });
        }
      },
      Identifier: function Identifier(node) {
        if (
          node.parent.type === "CallExpression" &&
          node.parent.parent.type === "ArrowFunctionExpression" &&
          node.parent.parent.parent &&
          node.parent.arguments.length === 1 &&
          node.parent.arguments[0].properties &&
          node.parent.arguments[0].properties.filter(property =>
            propertiesToCheck.includes(property.key.name)
          ).length
        ) {
          if (
            node.parent.parent.parent.type === "CallExpression" &&
            node.parent.parent.parent.callee.name === "createApiTask"
          )
            return;
          context.report({
            node,
            message: "Use TaskManager for API calls"
          });
        }
      }
    };
  }
};
