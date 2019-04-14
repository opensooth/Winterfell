import React, { useEffect } from 'react';
import InputTypes from './inputTypes';
import { get, merge } from 'lodash';
import { useComponentsContext } from './lib/ComponentsContext';
import COMPONENT_TYPES from './enums/builtInComponentTypes';

export default function QuestionController({
  classes,
  onAnswerChange,
  onKeyDown,
  onQuestionBlur,
  handleMainButtonClick,
  input,
  postText,
  questionAnswers,
  question,
  questionId,
  questionSetId,
  renderRequiredAsterisk,
  text,
  validateOn,
  validationErrors,
  validations,
  value,
  props,
  ...otherProps
}) {
  const {
    [COMPONENT_TYPES.ERROR_MESSAGE]: ErrorMessage,
    [COMPONENT_TYPES.QUESTION]: Question
  } = useComponentsContext();
  const handleInputChange = value =>
    onAnswerChange(questionId, value, validations, validateOn);
  const handleInputBlur = value =>
    onQuestionBlur(questionId, value, validations, validateOn);

  const inputType = input.type;
  const defaultValue = input.default;

  useEffect(() => {
    const initialValue = get(questionAnswers, questionId);
    if (
      shouldInitWithDefaultValue({
        defaultValue,
        inputType,
        initialValue
      })
    ) {
      handleInputChange(defaultValue);
    }
  }, []);

  const Input = getInputComponent(inputType);
  const conditionalQuestions = getConditionalQuestions(input, value);

  const definedValue = typeof value === 'undefined' ? defaultValue : value;

  const questionValidationErrors = validationErrors[questionId] || [];
  const labelId = `${questionId}-label`;

  return (
    <Question
      {...otherProps}
      {...props}
      className={classes.question}
      classNames={classes}
      isRequired={input.required}
      questionId={questionId}
      question={question}
      labelId={labelId}
      postText={postText}
      renderConditionalQuestions={() =>
        conditionalQuestions.map(conditionalQuestion => (
          <QuestionController
            key={conditionalQuestion.questionId}
            questionSetId={questionSetId}
            questionId={conditionalQuestion.questionId}
            question={conditionalQuestion.question}
            text={conditionalQuestion.text}
            postText={conditionalQuestion.postText}
            validateOn={conditionalQuestion.validateOn}
            validations={conditionalQuestion.validations}
            value={questionAnswers[conditionalQuestion.questionId]}
            input={conditionalQuestion.input}
            classes={classes}
            questionAnswers={questionAnswers}
            validationErrors={validationErrors}
            onAnswerChange={onAnswerChange}
            onQuestionBlur={onQuestionBlur}
            onKeyDown={onKeyDown}
          />
        ))
      }
      renderInput={() => (
        <Input
          name={questionId}
          id={questionId}
          labelId={labelId}
          value={definedValue}
          text={input.text}
          options={input.options}
          placeholder={input.placeholder}
          required={input.required}
          classes={classes}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={onKeyDown}
          handleAction={handleMainButtonClick}
          {...merge({}, input.props)}
        />
      )}
      renderRequiredAsterisk={renderRequiredAsterisk}
      renderValidationErrors={() =>
        questionValidationErrors.map(error => (
          <ErrorMessage
            key={`${questionId}Error${error.type}`}
            className={classes.errorMessage}
            questionId={questionId}
            error={error}
          />
        ))
      }
      text={text}
    />
  );
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
    default: undefined,
    type: 'textInput',
    limit: undefined,
    placeholder: undefined
  },
  classes: {},
  questionAnswers: {},
  validationErrors: {},
  onAnswerChange: () => {},
  onQuestionBlur: () => {},
  onKeyDown: () => {},
  renderRequiredAsterisk: undefined,
  props: {}
};

function shouldInitWithDefaultValue({ defaultValue, inputType, initialValue }) {
  return (
    typeof initialValue === 'undefined' &&
    typeof defaultValue !== 'undefined' &&
    inputType !== 'checkboxInput'
  ); // todo: remove unnecessary inputType !== 'checkboxInput' check
}

function getInputComponent(inputType) {
  const Input = InputTypes[inputType];
  if (!Input) {
    throw new Error(
      `Winterfell: Input Type "${inputType}" not defined as Winterfell Input Type`
    );
  }
  return Input;
}

function getConditionalQuestions(input, value) {
  const options = input.options;
  if (!Array.isArray(options)) {
    return [];
  }
  return options
    .filter(
      option =>
        isSelectedOption(option, value) && hasConditionalQuestinos(option)
    )
    .reduce(flatternConditionalQuestions, []);
}

function isSelectedOption(option, value) {
  const optionValue = option.value;
  return Array.isArray(value)
    ? value.includes(optionValue)
    : value === optionValue;
}

function hasConditionalQuestinos(option) {
  const conditionalQuestions = option.conditionalQuestions;
  return Array.isArray(conditionalQuestions) && conditionalQuestions.length > 0;
}

function flatternConditionalQuestions(conditionalQuestions, option) {
  return [...conditionalQuestions, ...option.conditionalQuestions];
}
