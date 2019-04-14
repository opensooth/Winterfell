'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _checkboxInput = require('./checkboxInput');

var _checkboxInput2 = _interopRequireDefault(_checkboxInput);

var _checkboxOptionsInput = require('./checkboxOptionsInput');

var _checkboxOptionsInput2 = _interopRequireDefault(_checkboxOptionsInput);

var _emailInput = require('./emailInput');

var _emailInput2 = _interopRequireDefault(_emailInput);

var _fileInput = require('./fileInput');

var _fileInput2 = _interopRequireDefault(_fileInput);

var _hiddenInput = require('./hiddenInput');

var _hiddenInput2 = _interopRequireDefault(_hiddenInput);

var _passwordInput = require('./passwordInput');

var _passwordInput2 = _interopRequireDefault(_passwordInput);

var _radioOptionsInput = require('./radioOptionsInput');

var _radioOptionsInput2 = _interopRequireDefault(_radioOptionsInput);

var _selectInput = require('./selectInput');

var _selectInput2 = _interopRequireDefault(_selectInput);

var _textareaInput = require('./textareaInput');

var _textareaInput2 = _interopRequireDefault(_textareaInput);

var _textInput = require('./textInput');

var _textInput2 = _interopRequireDefault(_textInput);

var inputTypes = {
  checkboxInput: _checkboxInput2['default'],
  checkboxOptionsInput: _checkboxOptionsInput2['default'],
  emailInput: _emailInput2['default'],
  fileInput: _fileInput2['default'],
  hiddenInput: _hiddenInput2['default'],
  passwordInput: _passwordInput2['default'],
  radioOptionsInput: _radioOptionsInput2['default'],
  selectInput: _selectInput2['default'],
  textareaInput: _textareaInput2['default'],
  textInput: _textInput2['default']
};

/**
 * Add an input type
 *
 * @param  type      name     Name of InputType
 * @param  Component instance Input Type Component
 */
inputTypes.addInputType = function (name, instance) {
  if (typeof name !== 'string') {
    throw new Error('Winterfell: First parameter of addInputType must be of type string');
  }

  if (!_react2['default'].Component instanceof instance.constructor) {
    throw new Error('Winterfell: Cannot not assign "' + name + '" as an inputType. ' + 'Second paramter expects a React component');
  }

  inputTypes[name] = instance;
};

/**
 * Add multiple InputTypes
 *
 * @param  object types InputTypes to add. string => Component
 */
inputTypes.addInputTypes = function (types) {
  if (typeof types !== 'object') {
    throw new Error('Winterfell: First parameter of addInputTypes must be of type object');
  }

  for (var type in types) {
    inputTypes.addInputType(type, types[type]);
  }
};

exports['default'] = inputTypes;
module.exports = exports['default'];