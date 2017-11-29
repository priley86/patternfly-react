"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  bindMethods: function bindMethods(context, methods) {
    methods.forEach(function (method) {
      context[method] = context[method].bind(context);
    });
  },
  noop: Function.prototype // empty function
};