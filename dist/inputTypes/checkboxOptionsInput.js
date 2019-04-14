'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _libCloneArray = require('../lib/cloneArray');

var _libCloneArray2 = _interopRequireDefault(_libCloneArray);

var CheckboxOptionsInput = (function (_React$Component) {
  _inherits(CheckboxOptionsInput, _React$Component);

  function CheckboxOptionsInput(props) {
    _classCallCheck(this, CheckboxOptionsInput);

    _get(Object.getPrototypeOf(CheckboxOptionsInput.prototype), 'constructor', this).call(this, props);

    this.state = {
      value: this.props.value.length > 0 ? (0, _libCloneArray2['default'])(this.props.value) : []
    };
  }

  _createClass(CheckboxOptionsInput, [{
    key: 'handleChange',
    value: function handleChange(newVal, e) {
      var currentValue = this.state.value;

      if (e.target.checked) {
        currentValue.push(newVal);
      } else {
        currentValue = currentValue.filter(function (v) {
          return v !== newVal;
        });
      }

      this.setState({
        value: currentValue
      }, this.props.onChange.bind(null, currentValue));
    }
  }, {
    key: 'render',
    value: function render() {
      var _this = this;

      return _react2['default'].createElement(
        'ul',
        { className: this.props.classes.checkboxList },
        this.props.options.map(function (opt) {
          return _react2['default'].createElement(
            'li',
            { key: opt.value, className: _this.props.classes.checkboxListItem },
            _react2['default'].createElement(
              'label',
              {
                className: _this.props.classes.checkboxLabel,
                id: _this.props.labelId
              },
              _react2['default'].createElement('input', {
                type: 'checkbox',
                name: _this.props.name,
                'aria-labelledby': _this.props.labelId,
                value: opt.value,
                checked: _this.state.value.indexOf(opt.value) > -1,
                className: _this.props.classes.checkbox,
                required: _this.props.required ? 'required' : undefined,
                onChange: _this.handleChange.bind(_this, opt.value),
                onBlur: _this.props.onBlur.bind(null, _this.state.value)
              }),
              opt.text
            )
          );
        })
      );
    }
  }]);

  return CheckboxOptionsInput;
})(_react2['default'].Component);

CheckboxOptionsInput.defaultProps = {
  classes: {},
  name: '',
  value: [],
  options: [],
  onChange: function onChange() {},
  onBlur: function onBlur() {}
};

exports['default'] = CheckboxOptionsInput;
module.exports = exports['default'];