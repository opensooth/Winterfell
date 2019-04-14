import React from 'react';
import _ from 'lodash';
import KeyCodez from 'keycodez';

import Validation from './lib/validation';
import ErrorMessages from './lib/errors';
import QuestionSetController from './QuestionSetController';
import evaluatePredicates from './lib/evaluatePredicates';
import ComponentsContext from './lib/ComponentsContext';
import COMPONENT_TYPES from './enums/builtInComponentTypes';

export default class QuestionPanelController extends React.Component {
  constructor(props) {
    super(props);
    this.handleMainButtonClick = this.handleMainButtonClick.bind(this);

    this.state = {
      validationErrors: this.props.validationErrors
    };
  }

  handleAnswerValidate(questionId, questionAnswer, validations) {
    if (typeof validations === 'undefined' || validations.length === 0) {
      return;
    }

    /*
     * Run the question through its validations and
     * show any error messages if invalid.
     */
    var questionValidationErrors = [];
    validations.forEach(validation => {
      if (
        Validation.validateAnswer(
          questionAnswer,
          validation,
          this.props.questionAnswers
        )
      ) {
        return;
      }

      questionValidationErrors.push({
        type: validation.type,
        message: ErrorMessages.getErrorMessage(validation)
      });
    });

    var validationErrors = _.chain(this.state.validationErrors)
      .set(questionId, questionValidationErrors)
      .value();

    this.setState(
      {
        validationErrors: validationErrors
      },
      () => this.handleValidationErrors(false)
    );
  }

  handleMainButtonClick() {
    var action = this.props.action.default;
    var conditions = this.props.action.conditions || [];

    /*
     * We need to get all the question sets for this panel.
     * Collate a list of the question set IDs required
     * and run through the schema to grab the question sets.
     */
    var questionSetIds = this.props.questionSets.map(qS => qS.questionSetId);
    var questionSets = _.chain(this.props.schema.questionSets)
      .filter(qS => questionSetIds.indexOf(qS.questionSetId) > -1)
      .value();

    /*
     * Get any incorrect fields that need error messages.
     */
    var invalidQuestions = Validation.getQuestionPanelInvalidQuestions(
      questionSets,
      this.props.questionAnswers
    );

    /*
     * If the panel isn't valid...
     */
    if (Object.keys(invalidQuestions).length > 0) {
      var validationErrors = _.mapValues(invalidQuestions, validations => {
        return validations.map(validation => {
          return {
            type: validation.type,
            message: ErrorMessages.getErrorMessage(validation)
          };
        });
      });

      this.setState(
        {
          validationErrors: validationErrors
        },
        () => this.handleValidationErrors(true)
      );
      return;
    }

    /*
     * Panel is valid. So what do we do next?
     * Check our conditions and act upon them, or the default.
     */
    conditions.forEach(condition => {
      var conditionMet = Array.isArray(condition.predicates)
        ? this.handleEvaluatePredicate(condition.predicates)
        : _.get(this.props.questionAnswers, condition.questionId) ===
          condition.value;

      action = conditionMet
        ? {
            action: condition.action,
            target: condition.target
          }
        : action;
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

  handleValidationErrors(isActionAttempt) {
    const onValidationErrors = this.props.onValidationErrors;
    if (typeof onValidationErrors === 'function') {
      onValidationErrors(this.state.validationErrors, isActionAttempt);
    }
  }

  handleEvaluatePredicate(predicates) {
    return evaluatePredicates(predicates, this.props.questionAnswers);
  }

  handleBackButtonClick() {
    if (this.props.panelHistory.length === 0) {
      return;
    }

    this.props.onPanelBack();
  }

  handleAnswerChange(questionId, questionAnswer, validations, validateOn) {
    this.props.onAnswerChange(questionId, questionAnswer);

    this.setState({
      validationErrors: _.chain(this.state.validationErrors)
        .set(questionId, [])
        .value()
    });

    if (validateOn === 'change') {
      this.handleAnswerValidate(questionId, questionAnswer, validations);
    }
  }

  handleQuestionBlur(questionId, questionAnswer, validations, validateOn) {
    if (validateOn === 'blur') {
      this.handleAnswerValidate(questionId, questionAnswer, validations);
    }
  }

  handleInputKeyDown(e) {
    if (KeyCodez[e.keyCode] === 'enter') {
      e.preventDefault();
      this.handleMainButtonClick.call(this);
    }
  }

  render() {
    const { [COMPONENT_TYPES.QUESTION_PANEL]: QuestionPanel } = this.context;

    var questionSets = this.props.questionSets.map(questionSetMeta => {
      var questionSet = _.find(this.props.schema.questionSets, {
        questionSetId: questionSetMeta.questionSetId
      });

      if (!questionSet) {
        return undefined;
      }

      return (
        <QuestionSetController
          key={questionSet.questionSetId}
          id={questionSet.questionSetId}
          name={questionSet.name}
          questionSetHeader={questionSet.questionSetHeader}
          questionSetText={questionSet.questionSetText}
          questions={questionSet.questions}
          classes={this.props.classes}
          questionAnswers={this.props.questionAnswers}
          renderRequiredAsterisk={this.props.renderRequiredAsterisk}
          validationErrors={this.state.validationErrors}
          onAnswerChange={this.handleAnswerChange.bind(this)}
          onQuestionBlur={this.handleQuestionBlur.bind(this)}
          onKeyDown={this.handleInputKeyDown.bind(this)}
          handleMainButtonClick={this.handleMainButtonClick}
        />
      );
    });

    const {
      classes,
      panelId,
      panelHeader,
      panelText,
      panelFooter,
      panelHistory,
      backButton,
      button
    } = this.props;

    const isBackButtonEnabled = panelHistory.length > 1 && !backButton.disabled;

    return (
      <QuestionPanel
        classNames={classes}
        panelId={panelId}
        panelHeader={panelHeader}
        panelText={panelText}
        panelFooter={panelFooter}
        isBackButtonEnabled={isBackButtonEnabled}
        backButtonText={backButton.text}
        onBackButtonClick={this.handleBackButtonClick.bind(this)}
        isActionButtonEnabled={!button.disabled}
        actionButtonText={button.text}
        onActionButtonClick={this.handleMainButtonClick.bind(this)}
      >
        {questionSets}
      </QuestionPanel>
    );
  }
}

QuestionPanelController.contextType = ComponentsContext;

QuestionPanelController.defaultProps = {
  validationErrors: {},
  schema: {},
  classes: {},
  panelId: undefined,
  panelIndex: undefined,
  panelHeader: undefined,
  panelText: undefined,
  action: {
    default: {},
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
  onAnswerChange: () => {},
  onSwitchPanel: () => {},
  onPanelBack: () => {},
  panelHistory: []
};
