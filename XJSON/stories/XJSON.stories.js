import React, { useState, useEffect } from 'react';
import { storiesOf } from '@storybook/react';
import XJSON from '../src/index';
import loadStringFromFile from './test-fixtures/loadStringFromFile';
import stringUrl from './test-fixtures/jsonWithFragmentsAndUnescapedText.xjson';
import Comparison from './test-fixtures/Comparison';

function Test() {
  const [original, setOriginal] = useState(null);
  const [processed, setProcessed] = useState(null);
  useEffect(() => {
    loadFile(setOriginal);
  }, []);
  return (
    <Comparison
      leftPanel={original}
      rightPanel={processed}
      onProcess={(string) => {
        processString(string, setProcessed)
      }}
      processText="Parse"
    />
  );
}

async function loadFile(setOriginal) {
  const string = await loadStringFromFile(stringUrl);
  setOriginal(string);
}

function processString(string, setProcessed) {
  try {
    const result = XJSON.parse(string);
    const jsonString = JSON.stringify(result, null, 2);
    setProcessed(jsonString);
  } catch (err) {
    setProcessed(err.toString());
  }
}

storiesOf('XJSON', module)
  .add('parse', () =>  <Test />);
