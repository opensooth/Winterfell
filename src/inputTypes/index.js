import React from 'react';
import checkboxInput from './checkboxInput';
import checkboxOptionsInput from './checkboxOptionsInput';
import emailInput from './emailInput';
import fileInput from './fileInput';
import hiddenInput from './hiddenInput';
import passwordInput from './passwordInput';
import radioOptionsInput from './radioOptionsInput';
import selectInput from './selectInput';
import textareaInput from './textareaInput';
import textInput from './textInput';

var inputTypes = {
  checkboxInput,
  checkboxOptionsInput,
  emailInput,
  fileInput,
  hiddenInput,
  passwordInput,
  radioOptionsInput,
  selectInput,
  textareaInput,
  textInput
};

/**
 * Add an input type
 *
 * @param  type      name     Name of InputType
 * @param  Component instance Input Type Component
 */
inputTypes.addInputType = (name, instance) => {
  if (typeof name !== 'string') {
    throw new Error(
      'Winterfell: First parameter of addInputType must be of type string'
    );
  }

  if (!React.Component instanceof instance.constructor) {
    throw new Error(
      'Winterfell: Cannot not assign "' +
        name +
        '" as an inputType. ' +
        'Second paramter expects a React component'
    );
  }

  inputTypes[name] = instance;
};

/**
 * Add multiple InputTypes
 *
 * @param  object types InputTypes to add. string => Component
 */
inputTypes.addInputTypes = types => {
  if (typeof types !== 'object') {
    throw new Error(
      'Winterfell: First parameter of addInputTypes must be of type object'
    );
  }

  for (var type in types) {
    inputTypes.addInputType(type, types[type]);
  }
};

export default inputTypes;
