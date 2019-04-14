'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = QuestionController;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _inputTypes = require('./inputTypes');

var _inputTypes2 = _interopRequireDefault(_inputTypes);

var _lodash = require('lodash');

var _libComponentsContext = require('./lib/ComponentsContext');

var _enumsBuiltInComponentTypes = require('./enums/builtInComponentTypes');

var _enumsBuiltInComponentTypes2 = _interopRequireDefault(_enumsBuiltInComponentTypes);

function QuestionController(_ref) {
  var classes = _ref.classes;
  var onAnswerChange = _ref.onAnswerChange;
  var onKeyDown = _ref.onKeyDown;
  var onQuestionBlur = _ref.onQuestionBlur;
  var handleMainButtonClick = _ref.handleMainButtonClick;
  var input = _ref.input;
  var postText = _ref.postText;
  var questionAnswers = _ref.questionAnswers;
  var question = _ref.question;
  var questionId = _ref.questionId;
  var questionSetId = _ref.questionSetId;
  var renderRequiredAsterisk = _ref.renderRequiredAsterisk;
  var text = _ref.text;
  var validateOn = _ref.validateOn;
  var validationErrors = _ref.validationErrors;
  var validations = _ref.validations;
  var value = _ref.value;
  var props = _ref.props;

  var otherProps = _objectWithoutProperties(_ref, ['classes', 'onAnswerChange', 'onKeyDown', 'onQuestionBlur', 'handleMainButtonClick', 'input', 'postText', 'questionAnswers', 'question', 'questionId', 'questionSetId', 'renderRequiredAsterisk', 'text', 'validateOn', 'validationErrors', 'validations', 'value', 'props']);

  var _useComponentsContext = (0, _libComponentsContext.useComponentsContext)();

  var ErrorMessage = _useComponentsContext[_enumsBuiltInComponentTypes2['default'].ERROR_MESSAGE];
  var Question = _useComponentsContext[_enumsBuiltInComponentTypes2['default'].QUESTION];

  var handleInputChange = function handleInputChange(value) {
    return onAnswerChange(questionId, value, validations, validateOn);
  };
  var handleInputBlur = function handleInputBlur(value) {
    return onQuestionBlur(questionId, value, validations, validateOn);
  };

  var inputType = input.type;
  var defaultValue = input['default'];

  (0, _react.useEffect)(function () {
    var initialValue = (0, _lodash.get)(questionAnswers, questionId);
    if (shouldInitWithDefaultValue({
      defaultValue: defaultValue,
      inputType: inputType,
      initialValue: initialValue
    })) {
      handleInputChange(defaultValue);
    }
  }, []);

  var Input = getInputComponent(inputType);
  var conditionalQuestions = getConditionalQuestions(input, value);

  var definedValue = typeof value === 'undefined' ? defaultValue : value;

  var questionValidationErrors = validationErrors[questionId] || [];
  var labelId = questionId + '-label';

  return _react2['default'].createElement(Question, _extends({}, otherProps, props, {
    className: classes.question,
    classNames: classes,
    isRequired: input.required,
    questionId: questionId,
    question: question,
    labelId: labelId,
    postText: postText,
    renderConditionalQuestions: function () {
      return conditionalQuestions.map(function (conditionalQuestion) {
        return _react2['default'].createElement(QuestionController, {
          key: conditionalQuestion.questionId,
          questionSetId: questionSetId,
          questionId: conditionalQuestion.questionId,
          question: conditionalQuestion.question,
          text: conditionalQuestion.text,
          postText: conditionalQuestion.postText,
          validateOn: conditionalQuestion.validateOn,
          validations: conditionalQuestion.validations,
          value: questionAnswers[conditionalQuestion.questionId],
          input: conditionalQuestion.input,
          classes: classes,
          questionAnswers: questionAnswers,
          validationErrors: validationErrors,
          onAnswerChange: onAnswerChange,
          onQuestionBlur: onQuestionBlur,
          onKeyDown: onKeyDown
        });
      });
    },
    renderInput: function () {
      return _react2['default'].createElement(Input, _extends({
        name: questionId,
        id: questionId,
        labelId: labelId,
        value: definedValue,
        text: input.text,
        options: input.options,
        placeholder: input.placeholder,
        required: input.required,
        classes: classes,
        onChange: handleInputChange,
        onBlur: handleInputBlur,
        onKeyDown: onKeyDown,
        handleAction: handleMainButtonClick
      }, (0, _lodash.merge)({}, input.props)));
    },
    renderRequiredAsterisk: renderRequiredAsterisk,
    renderValidationErrors: function () {
      return questionValidationErrors.map(function (error) {
        return _react2['default'].createElement(ErrorMessage, {
          key: questionId + 'Error' + error.type,
          className: classes.errorMessage,
          questionId: questionId,
          error: error
        });
      });
    },
    text: text
  }));
}

QuestionController.defaultProps = {
  questionSetId: undefined,
  questionId: undefined,
  question: '',
  validateOn: 'blur',
  validations: [],
  text: undefined,
  postText: undefined,
  value: undefined,
  input: {
    'default': undefined,
    type: 'textInput',
    limit: undefined,
    placeholder: undefined
  },
  classes: {},
  questionAnswers: {},
  validationErrors: {},
  onAnswerChange: function onAnswerChange() {},
  onQuestionBlur: function onQuestionBlur() {},
  onKeyDown: function onKeyDown() {},
  renderRequiredAsterisk: undefined,
  props: {}
};

function shouldInitWithDefaultValue(_ref2) {
  var defaultValue = _ref2.defaultValue;
  var inputType = _ref2.inputType;
  var initialValue = _ref2.initialValue;

  return typeof initialValue === 'undefined' && typeof defaultValue !== 'undefined' && inputType !== 'checkboxInput'; // todo: remove unnecessary inputType !== 'checkboxInput' check
}

function getInputComponent(inputType) {
  var Input = _inputTypes2['default'][inputType];
  if (!Input) {
    throw new Error('Winterfell: Input Type "' + inputType + '" not defined as Winterfell Input Type');
  }
  return Input;
}

function getConditionalQuestions(input, value) {
  var options = input.options;
  if (!Array.isArray(options)) {
    return [];
  }
  return options.filter(function (option) {
    return isSelectedOption(option, value) && hasConditionalQuestinos(option);
  }).reduce(flatternConditionalQuestions, []);
}

function isSelectedOption(option, value) {
  var optionValue = option.value;
  return Array.isArray(value) ? value.includes(optionValue) : value === optionValue;
}

function hasConditionalQuestinos(option) {
  var conditionalQuestions = option.conditionalQuestions;
  return Array.isArray(conditionalQuestions) && conditionalQuestions.length > 0;
}

function flatternConditionalQuestions(conditionalQuestions, option) {
  return [].concat(_toConsumableArray(conditionalQuestions), _toConsumableArray(option.conditionalQuestions));
}
module.exports = exports['default'];