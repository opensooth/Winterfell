'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = QuestionSet;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _QuestionController = require('./QuestionController');

var _QuestionController2 = _interopRequireDefault(_QuestionController);

var _lodash = require('lodash');

var _libComponentsContext = require('./lib/ComponentsContext');

var _enumsBuiltInComponentTypes = require('./enums/builtInComponentTypes');

var _enumsBuiltInComponentTypes2 = _interopRequireDefault(_enumsBuiltInComponentTypes);

function QuestionSet(_ref) {
  var classes = _ref.classes;
  var handleMainButtonClick = _ref.handleMainButtonClick;
  var id = _ref.id;
  var onAnswerChange = _ref.onAnswerChange;
  var onKeyDown = _ref.onKeyDown;
  var onQuestionBlur = _ref.onQuestionBlur;
  var questionAnswers = _ref.questionAnswers;
  var questions = _ref.questions;
  var questionSetHeader = _ref.questionSetHeader;
  var questionSetText = _ref.questionSetText;
  var renderRequiredAsterisk = _ref.renderRequiredAsterisk;
  var validationErrors = _ref.validationErrors;

  var _useComponentsContext = (0, _libComponentsContext.useComponentsContext)();

  var QuestionSet = _useComponentsContext[_enumsBuiltInComponentTypes2['default'].QUESTION_SET];

  return _react2['default'].createElement(
    QuestionSet,
    {
      classNames: classes,
      questionSetHeader: questionSetHeader,
      questionSetText: questionSetText
    },
    questions.map(function (question, index) {
      return _react2['default'].createElement(_QuestionController2['default'], _extends({}, question, {
        key: '' + question.questionId + index,
        questionSetId: id,
        value: (0, _lodash.get)(questionAnswers, question.questionId),
        classes: classes,
        renderRequiredAsterisk: renderRequiredAsterisk,
        questionAnswers: questionAnswers,
        validationErrors: validationErrors,
        onAnswerChange: onAnswerChange,
        onQuestionBlur: onQuestionBlur,
        onKeyDown: onKeyDown,
        handleMainButtonClick: handleMainButtonClick
      }));
    })
  );
}

QuestionSet.defaultProps = {
  id: undefined,
  name: '',
  questionSetHeader: undefined,
  questionSetText: undefined,
  questions: [],
  questionAnswers: {},
  classes: {},
  validationErrors: {},
  renderRequiredAsterisk: undefined,
  onAnswerChange: function onAnswerChange() {},
  onQuestionBlur: function onQuestionBlur() {},
  onKeyDown: function onKeyDown() {}
};
module.exports = exports['default'];