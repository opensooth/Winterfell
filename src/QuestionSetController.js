import React from 'react';
import QuestionController from './QuestionController';
import { get } from 'lodash';
import { useComponentsContext } from './lib/ComponentsContext';
import COMPONENT_TYPES from './enums/builtInComponentTypes';

export default function QuestionSet({
  classes,
  handleMainButtonClick,
  id,
  onAnswerChange,
  onKeyDown,
  onQuestionBlur,
  questionAnswers,
  questions,
  questionSetHeader,
  questionSetText,
  renderRequiredAsterisk,
  validationErrors
}) {
  const {
    [COMPONENT_TYPES.QUESTION_SET]: QuestionSet
  } = useComponentsContext();

  return (
    <QuestionSet
      classNames={classes}
      questionSetHeader={questionSetHeader}
      questionSetText={questionSetText}
    >
      {questions.map((question, index) => (
        <QuestionController
          {...question}
          key={`${question.questionId}${index}`}
          questionSetId={id}
          value={get(questionAnswers, question.questionId)}
          classes={classes}
          renderRequiredAsterisk={renderRequiredAsterisk}
          questionAnswers={questionAnswers}
          validationErrors={validationErrors}
          onAnswerChange={onAnswerChange}
          onQuestionBlur={onQuestionBlur}
          onKeyDown={onKeyDown}
          handleMainButtonClick={handleMainButtonClick}
        />
      ))}
    </QuestionSet>
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
  onAnswerChange: () => {},
  onQuestionBlur: () => {},
  onKeyDown: () => {}
};
