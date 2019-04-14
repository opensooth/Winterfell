import XJSON from '../index';
import fs from 'fs';
import { promisify } from 'util';
import customProcessor from './customProcessor';

const readFile = promisify(fs.readFile);

describe('XJSON class', () => {
  let jsonWithUnescapedText;
  let processedJsonWithUnescapedText;
  let jsonWithFragments;
  let processedJsonWithFragments;
  let jsonWithFragmentsAndUnescapedText;
  let processedJsonWithFragmentsAndUnescapedText;
  let processedWithCustomProcessors;

  beforeAll(async () => {
    jsonWithUnescapedText = await readFile(
      `${__dirname}/jsonWithUnescapedText.xjson`,
      'utf8'
    );
    processedJsonWithUnescapedText = await readFile(
      `${__dirname}/processedJsonWithUnescapedText.json`,
      'utf8'
    );
    jsonWithFragments = await readFile(
      `${__dirname}/jsonWithFragments.xjson`,
      'utf8'
    );
    processedJsonWithFragments = await readFile(
      `${__dirname}/processedJsonWithFragments.json`,
      'utf8'
    );
    jsonWithFragmentsAndUnescapedText = await readFile(
      `${__dirname}/jsonWithFragmentsAndUnescapedText.xjson`,
      'utf8'
    );
    processedJsonWithFragmentsAndUnescapedText = await readFile(
      `${__dirname}/processedJsonWithFragmentsAndUnescapedText.json`,
      'utf8'
    );
    processedWithCustomProcessors = await readFile(
      `${__dirname}/processedWithCustomProcessors.json`,
      'utf8'
    );
  });

  describe('static process()', () => {
    it('replaces #ESCAPE(json unfriendly string)#ESCAPE with json-escaped string', () => {
      const processedString = XJSON.process(jsonWithUnescapedText);
      const parsedResult = JSON.parse(processedString);
      const expectedResult = JSON.parse(processedJsonWithUnescapedText);
      expect(parsedResult).toEqual(expectedResult);
    });

    it('injects fragments', () => {
      const processedString = XJSON.process(jsonWithFragments);
      const parsedResult = JSON.parse(processedString);
      const expectedResult = JSON.parse(processedJsonWithFragments);
      expect(parsedResult).toEqual(expectedResult);
    });

    it('processes xjson strings with both fragments and escape directives', () => {
      const processedString = XJSON.process(jsonWithFragmentsAndUnescapedText);
      const parsedResult = JSON.parse(processedString);
      const expectedResult = JSON.parse(
        processedJsonWithFragmentsAndUnescapedText
      );
      expect(parsedResult).toEqual(expectedResult);
    });
  });

  describe('static parse()', () => {
    it('returns JS object from string that contains #ESCAPE(json unfriendly string)#ESCAPE entries', () => {
      const parsedResult = XJSON.parse(jsonWithUnescapedText);
      const expectedResult = JSON.parse(processedJsonWithUnescapedText);
      expect(parsedResult).toEqual(expectedResult);
    });

    it('returns JS object parsed from xjson string with fragments', () => {
      const parsedResult = XJSON.parse(jsonWithFragments);
      const expectedResult = JSON.parse(processedJsonWithFragments);
      expect(parsedResult).toEqual(expectedResult);
    });

    it('returns JS object parsed from xjson string with both fragments and escape directives', () => {
      const parsedResult = XJSON.parse(jsonWithFragmentsAndUnescapedText);
      const expectedResult = JSON.parse(
        processedJsonWithFragmentsAndUnescapedText
      );
      expect(parsedResult).toEqual(expectedResult);
    });
  });

  describe('new XJSON([customProcessor])', () => {
    const xJSON = new XJSON([customProcessor]);

    describe('process()', () => {
      it('applies custom processor after built-in pre-processors', () => {
        const processedString = xJSON.process(
          jsonWithFragmentsAndUnescapedText
        );
        const parsedResult = JSON.parse(processedString);
        const expectedResult = JSON.parse(processedWithCustomProcessors);
        expect(parsedResult).toEqual(expectedResult);
      });
    });

    describe('parse()', () => {
      it('returns JS object from string processed with custom processor and built-in pre-processors', () => {
        const parsedResult = xJSON.parse(jsonWithFragmentsAndUnescapedText);
        const expectedResult = JSON.parse(processedWithCustomProcessors);
        expect(parsedResult).toEqual(expectedResult);
      });
    });
  });
});
