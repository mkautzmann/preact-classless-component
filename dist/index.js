(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', 'preact'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('preact'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.preact);
    global.preactComponent = mod.exports;
  }
})(this, function (module, exports, _preact) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (obj) {
    function preactComponent() {
      _preact.Component.apply(this, arguments);

      // auto-bind methods to the component
      for (var i in obj) {
        if (i !== 'render' && typeof obj[i] === 'function') {
          this[i] = obj[i].bind(this);
        }
      }

      if (obj.init) {
        obj.init.call(this);
      }
    }

    preactComponent.prototype = _extends(Object.create(_preact.Component.prototype), obj);

    preactComponent.prototype.constructor = preactComponent;

    return preactComponent;
  };

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  module.exports = exports['default'];
});