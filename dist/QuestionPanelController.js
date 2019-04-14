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

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _keycodez = require('keycodez');

var _keycodez2 = _interopRequireDefault(_keycodez);

var _libValidation = require('./lib/validation');

var _libValidation2 = _interopRequireDefault(_libValidation);

var _libErrors = require('./lib/errors');

var _libErrors2 = _interopRequireDefault(_libErrors);

var _QuestionSetController = require('./QuestionSetController');

var _QuestionSetController2 = _interopRequireDefault(_QuestionSetController);

var _libEvaluatePredicates = require('./lib/evaluatePredicates');

var _libEvaluatePredicates2 = _interopRequireDefault(_libEvaluatePredicates);

var _libComponentsContext = require('./lib/ComponentsContext');

var _libComponentsContext2 = _interopRequireDefault(_libComponentsContext);

var _enumsBuiltInComponentTypes = require('./enums/builtInComponentTypes');

var _enumsBuiltInComponentTypes2 = _interopRequireDefault(_enumsBuiltInComponentTypes);

var QuestionPanelController = (function (_React$Component) {
  _inherits(QuestionPanelController, _React$Component);

  function QuestionPanelController(props) {
    _classCallCheck(this, QuestionPanelController);

    _get(Object.getPrototypeOf(QuestionPanelController.prototype), 'constructor', this).call(this, props);
    this.handleMainButtonClick = this.handleMainButtonClick.bind(this);

    this.state = {
      validationErrors: this.props.validationErrors
    };
  }

  _createClass(QuestionPanelController, [{
    key: 'handleAnswerValidate',
    value: function handleAnswerValidate(questionId, questionAnswer, validations) {
      var _this = this;

      if (typeof validations === 'undefined' || validations.length === 0) {
        return;
      }

      /*
       * Run the question through its validations and
       * show any error messages if invalid.
       */
      var questionValidationErrors = [];
      validations.forEach(function (validation) {
        if (_libValidation2['default'].validateAnswer(questionAnswer, validation, _this.props.questionAnswers)) {
          return;
        }

        questionValidationErrors.push({
          type: validation.type,
          message: _libErrors2['default'].getErrorMessage(validation)
        });
      });

      var validationErrors = _lodash2['default'].chain(this.state.validationErrors).set(questionId, questionValidationErrors).value();

      this.setState({
        validationErrors: validationErrors
      }, function () {
        return _this.handleValidationErrors(false);
      });
    }
  }, {
    key: 'handleMainButtonClick',
    value: function handleMainButtonClick() {
      var _this2 = this;

      var action = this.props.action['default'];
      var conditions = this.props.action.conditions || [];

      /*
       * We need to get all the question sets for this panel.
       * Collate a list of the question set IDs required
       * and run through the schema to grab the question sets.
       */
      var questionSetIds = this.props.questionSets.map(function (qS) {
        return qS.questionSetId;
      });
      var questionSets = _lodash2['default'].chain(this.props.schema.questionSets).filter(function (qS) {
        return questionSetIds.indexOf(qS.questionSetId) > -1;
      }).value();

      /*
       * Get any incorrect fields that need error messages.
       */
      var invalidQuestions = _libValidation2['default'].getQuestionPanelInvalidQuestions(questionSets, this.props.questionAnswers);

      /*
       * If the panel isn't valid...
       */
      if (Object.keys(invalidQuestions).length > 0) {
        var validationErrors = _lodash2['default'].mapValues(invalidQuestions, function (validations) {
          return validations.map(function (validation) {
            return {
              type: validation.type,
              message: _libErrors2['default'].getErrorMessage(validation)
            };
          });
        });

        this.setState({
          validationErrors: validationErrors
        }, function () {
          return _this2.handleValidationErrors(true);
        });
        return;
      }

      /*
       * Panel is valid. So what do we do next?
       * Check our conditions and act upon them, or the default.
       */
      conditions.forEach(function (condition) {
        var conditionMet = Array.isArray(condition.predicates) ? _this2.handleEvaluatePredicate(condition.predicates) : _lodash2['default'].get(_this2.props.questionAnswers, condition.questionId) === condition.value;

        action = conditionMet ? {
          action: condition.action,
          target: condition.target
        } : action;
      });

      /*
       * Decide which action to take depending on
       * the action decided upon.
       */
      switch (action.action) {
        case 'GOTO':
          this.props.onSwitchPanel(action.target);
          break;

        case 'SUBMIT':
          this.props.onSubmit(action.target);
          break;

        case 'SUBMIT-GOTO':
          this.props.onSubmit(action.target);
          this.props.onSwitchPanel(action.panel);
          break;
        default:
          console.error('Undefined acton case: ', action.action);
      }
    }
  }, {
    key: 'handleValidationErrors',
    value: function handleValidationErrors(isActionAttempt) {
      var onValidationErrors = this.props.onValidationErrors;
      if (typeof onValidationErrors === 'function') {
        onValidationErrors(this.state.validationErrors, isActionAttempt);
      }
    }
  }, {
    key: 'handleEvaluatePredicate',
    value: function handleEvaluatePredicate(predicates) {
      return (0, _libEvaluatePredicates2['default'])(predicates, this.props.questionAnswers);
    }
  }, {
    key: 'handleBackButtonClick',
    value: function handleBackButtonClick() {
      if (this.props.panelHistory.length === 0) {
        return;
      }

      this.props.onPanelBack();
    }
  }, {
    key: 'handleAnswerChange',
    value: function handleAnswerChange(questionId, questionAnswer, validations, validateOn) {
      this.props.onAnswerChange(questionId, questionAnswer);

      this.setState({
        validationErrors: _lodash2['default'].chain(this.state.validationErrors).set(questionId, []).value()
      });

      if (validateOn === 'change') {
        this.handleAnswerValidate(questionId, questionAnswer, validations);
      }
    }
  }, {
    key: 'handleQuestionBlur',
    value: function handleQuestionBlur(questionId, questionAnswer, validations, validateOn) {
      if (validateOn === 'blur') {
        this.handleAnswerValidate(questionId, questionAnswer, validations);
      }
    }
  }, {
    key: 'handleInputKeyDown',
    value: function handleInputKeyDown(e) {
      if (_keycodez2['default'][e.keyCode] === 'enter') {
        e.preventDefault();
        this.handleMainButtonClick.call(this);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var QuestionPanel = this.context[_enumsBuiltInComponentTypes2['default'].QUESTION_PANEL];

      var questionSets = this.props.questionSets.map(function (questionSetMeta) {
        var questionSet = _lodash2['default'].find(_this3.props.schema.questionSets, {
          questionSetId: questionSetMeta.questionSetId
        });

        if (!questionSet) {
          return undefined;
        }

        return _react2['default'].createElement(_QuestionSetController2['default'], {
          key: questionSet.questionSetId,
          id: questionSet.questionSetId,
          name: questionSet.name,
          questionSetHeader: questionSet.questionSetHeader,
          questionSetText: questionSet.questionSetText,
          questions: questionSet.questions,
          classes: _this3.props.classes,
          questionAnswers: _this3.props.questionAnswers,
          renderRequiredAsterisk: _this3.props.renderRequiredAsterisk,
          validationErrors: _this3.state.validationErrors,
          onAnswerChange: _this3.handleAnswerChange.bind(_this3),
          onQuestionBlur: _this3.handleQuestionBlur.bind(_this3),
          onKeyDown: _this3.handleInputKeyDown.bind(_this3),
          handleMainButtonClick: _this3.handleMainButtonClick
        });
      });

      var _props = this.props;
      var classes = _props.classes;
      var panelId = _props.panelId;
      var panelHeader = _props.panelHeader;
      var panelText = _props.panelText;
      var panelFooter = _props.panelFooter;
      var panelHistory = _props.panelHistory;
      var backButton = _props.backButton;
      var button = _props.button;

      var isBackButtonEnabled = panelHistory.length > 1 && !backButton.disabled;

      return _react2['default'].createElement(
        QuestionPanel,
        {
          classNames: classes,
          panelId: panelId,
          panelHeader: panelHeader,
          panelText: panelText,
          panelFooter: panelFooter,
          isBackButtonEnabled: isBackButtonEnabled,
          backButtonText: backButton.text,
          onBackButtonClick: this.handleBackButtonClick.bind(this),
          isActionButtonEnabled: !button.disabled,
          actionButtonText: button.text,
          onActionButtonClick: this.handleMainButtonClick.bind(this)
        },
        questionSets
      );
    }
  }]);

  return QuestionPanelController;
})(_react2['default'].Component);

exports['default'] = QuestionPanelController;

QuestionPanelController.contextType = _libComponentsContext2['default'];

QuestionPanelController.defaultProps = {
  validationErrors: {},
  schema: {},
  classes: {},
  panelId: undefined,
  panelIndex: undefined,
  panelHeader: undefined,
  panelText: undefined,
  action: {
    'default': {},
    conditions: []
  },
  button: {
    text: 'Submit'
  },
  backButton: {
    text: 'Back'
  },
  questionSets: [],
  questionAnswers: {},
  renderRequiredAsterisk: undefined,
  onAnswerChange: function onAnswerChange() {},
  onSwitchPanel: function onSwitchPanel() {},
  onPanelBack: function onPanelBack() {},
  panelHistory: []
};
module.exports = exports['default'];