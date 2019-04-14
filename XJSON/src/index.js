import escapeProcessor from './processors/escape';
import fragmentsProcessor from './processors/fragments';

const processors = [fragmentsProcessor, escapeProcessor];

export default class XJSON {
  static process(string) {
    return processors.reduce(
      (processedString, processor) => processor(processedString),
      string
    );
  }

  static parse(string) {
    const processedString = XJSON.process(string);
    return JSON.parse(processedString);
  }

  constructor(processors = []) {
    this.processors = processors;
  }

  process(string) {
    const preProcessedString = XJSON.process(string);
    return this.processors.reduce(
      (processedString, processor) => processor(processedString),
      preProcessedString
    );
  }

  parse(string) {
    const processedString = this.process(string);
    return JSON.parse(processedString);
  }
}
