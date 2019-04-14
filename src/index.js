import React from 'react';
import { extend, chain, find } from 'lodash';
import QuestionPanelController from './QuestionPanelController';
import inputTypes from './inputTypes';
import errorMessages from './lib/errors';
import validation from './lib/validation';
import getInitialPanel from './lib/getInitialPanel';
import { ComponentsContextProvider } from './lib/ComponentsContext';

export default class Winterfell extends React.Component {
  constructor(props) {
    super(props);
    this.formComponent = null;
    this.state = this.getInitialState();
    this.components = props.components;
  }

  componentWillReceiveProps(nextProps) {
    this.setState(state => ({
      action: nextProps.action,
      schema: nextProps.schema,
      questionAnswers: nextProps.questionAnswers || state.questionAnswers
    }));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.schema !== this.props.schema) {
      this.setState(this.getInitialState());
    }
  }

  getInitialState() {
    this.panelHistory = [];
    var schema = extend(
      {
        classes: {},
        formPanels: [],
        questionPanels: [],
        questionSets: []
      },
      this.props.schema
    );

    schema.formPanels = schema.formPanels.sort((a, b) => a.index > b.index);

    var currentPanel = getInitialPanel(schema.formPanels, this.props.panelId);

    if (!currentPanel) {
      throw new Error(
        'Winterfell: Could not find initial panel and failed to render.'
      );
    }

    return {
      schema: schema,
      currentPanel: currentPanel,
      action: this.props.action,
      questionAnswers: this.props.questionAnswers || {}
    };
  }

  handleAnswerChange(questionId, questionAnswer) {
    var questionAnswers = chain(this.state.questionAnswers)
      .set(questionId, questionAnswer)
      .value();

    this.setState(
      {
        questionAnswers: questionAnswers
      },
      this.props.onUpdate.bind(null, questionAnswers)
    );
  }

  handleSwitchPanel(panelId, preventHistory) {
    var panel = find(this.props.schema.formPanels, {
      panelId: panelId
    });

    if (!panel) {
      throw new Error(
        'Winterfell: Tried to switch to panel "' +
          panelId +
          '", which does not exist.'
      );
    }

    if (!preventHistory) {
      this.panelHistory.push(panel.panelId);
    }

    this.setState(
      {
        currentPanel: panel
      },
      this.props.onSwitchPanel.bind(null, panel)
    );
  }

  handleBackButtonClick() {
    this.panelHistory.pop();

    this.handleSwitchPanel.call(
      this,
      this.panelHistory[this.panelHistory.length - 1],
      true
    );
  }

  handleSubmit(action) {
    if (this.props.disableSubmit) {
      if (action) {
        return this.props.onSubmit(this.state.questionAnswers, action, () =>
          this.handleSwitchPanel(action)
        );
      }
      return this.props.onSubmit(this.state.questionAnswers, action);
    }

    /*
     * If we are not disabling the functionality of the form,
     * we need to set the action provided in the form, then submit.
     */
    this.setState(
      {
        action: action
      },
      () => {
        if (!this.formComponent) {
          return;
        }

        this.formComponent.submit();
      }
    );
  }

  render() {
    var currentPanel = find(
      this.state.schema.questionPanels,
      panel => panel.panelId === this.state.currentPanel.panelId
    );

    return (
      <ComponentsContextProvider value={this.components}>
        <form
          method={this.props.method}
          encType={this.props.encType}
          action={this.state.action}
          ref={ref => (this.formComponent = ref)}
          className={this.state.schema.classes.form}
        >
          <div className={this.state.schema.classes.questionPanels}>
            <QuestionPanelController
              schema={this.state.schema}
              classes={this.state.schema.classes}
              panelFooter={currentPanel.panelFooter}
              panelId={currentPanel.panelId}
              panelIndex={currentPanel.panelIndex}
              panelHeader={currentPanel.panelHeader}
              panelText={currentPanel.panelText}
              action={currentPanel.action}
              button={currentPanel.button}
              backButton={currentPanel.backButton}
              questionSets={currentPanel.questionSets}
              questionAnswers={this.state.questionAnswers}
              panelHistory={this.panelHistory}
              renderRequiredAsterisk={this.props.renderRequiredAsterisk}
              onAnswerChange={this.handleAnswerChange.bind(this)}
              onPanelBack={this.handleBackButtonClick.bind(this)}
              onSwitchPanel={this.handleSwitchPanel.bind(this)}
              onSubmit={this.handleSubmit.bind(this)}
              onValidationErrors={this.props.onValidationErrors}
            />
          </div>
        </form>
      </ComponentsContextProvider>
    );
  }

  componentDidMount() {
    this.panelHistory.push(this.state.currentPanel.panelId);
    this.props.onRender();
  }
}

Winterfell.inputTypes = inputTypes;
Winterfell.errorMessages = errorMessages;
Winterfell.validation = validation;

Winterfell.addInputType = Winterfell.inputTypes.addInputType;
Winterfell.addInputTypes = Winterfell.inputTypes.addInputTypes;

Winterfell.addErrorMessage = Winterfell.errorMessages.addErrorMessage;
Winterfell.addErrorMessages = Winterfell.errorMessages.addErrorMessages;

Winterfell.addValidationMethod = Winterfell.validation.addValidationMethod;
Winterfell.addValidationMethods = Winterfell.validation.addValidationMethods;

Winterfell.defaultProps = {
  encType: 'application/x-www-form-urlencoded',
  method: 'POST',
  action: '',
  panelId: undefined,
  disableSubmit: false,
  renderRequiredAsterisk: undefined,
  onSubmit: () => {},
  onUpdate: () => {},
  onSwitchPanel: () => {},
  onRender: () => {}
};
