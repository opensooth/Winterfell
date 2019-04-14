# enhanced-json-parser

> Parser of strings that contain JSON mixed with enhancers.

Built-in enhancers:
 - auto-escaping strings
 - compliling fragmented content

## Installation

yarn
```
yarn add @opensooth/enhanced-json-parser
```

npm
```
npm i --save @opensooth/enhanced-json-parser
```

## Usage

### Escaping strings

Enhanced JSON syntax: `#ESCAPE(`your text here`)#ESCAPE` directive will be replaced with escaped string `"your text here"`.

Example:

> example.xjson
```
{
  "htmlString": #ESCAPE(
    <h1>
      We want to write html in multiple lines
    </h1>
    <p class="we-do-not-want-to-maually-escape-quotes">
      We do not want to manually escape any special chartacers. //~!@#$%^&**(),.:{{{
        /.,?><}{:\|}   
    </p>
  )#ESCAPE
}
```

> js code
```js
import XJSON from '@opensooth/enhanced-json-parser';

const xJsonString = loadFileSomehow();

XJSON.parse(xJsonString); // js object
```

> result
```js
{
  htmlString: '<h1>\n      We want to write html in multiple lines\n    </h1>\n    <p class=\"we-do-not-want-to-maually-escape-quotes\">\n      We do not want to manually escape any special chartacers. //~!@#$%^&**(),.:{{{\n        /.,?><}{:\\|}   \n    </p>'
}
```

### Using fragments

Enhanced JSON syntax:

 - Fragment injection: `#FRAGMENT(`YOUR_FRAGMENT_ID`)#FRAGMENT` directive will be replaced with contents specified in fragment definition.
 - Fragments definition:

 ```
  #FRAGMENTS(
    #FRAGMENT:YOUR_FRAGMENT_ID(
      {
        "someProperty": "some value"
      }
    )#FRAGMENT

    #FRAGMENT:ANOTHER_FRAGMENT_ID(
      "fragmentCanBeAnything"
    )#FRAGMENT

    #FRAGMENT:YET_ANOTHER_FRAGMENT_ID(
      "fragmentCanIncludeEscapeDirectives": #ESCAPE(
        multi
        line
        text
      )#ESCAPE
    )#FRAGMENT
  )#FRAGMENTS
 ```

Example:

> example.xjson
```
{
  #FRAGMENT(FIRST_FRAGMENT_ID)#FRAGMENT,
  "someProperty": {
    "anotherProperty": 111
  }
}

#FRAGMENTS(
  #FRAGMENT:FIRST_FRAGMENT_ID(
    "notes": {
      "anything": "fragment can be anything: value, key, key/value, any piece of text that when injected, forms valid json with surrounding code"
    }
  )#FRAGMENT
)#FRAGMENTS

```

> js code
```js
import XJSON from '@opensooth/enhanced-json-parser';

const xJsonString = loadFileSomehow();

XJSON.parse(xJsonString); // js object
```

> result
```js
{
  notes: {
    anything: 'fragment can be anything: value, key, key/value, any piece of text that when injected, forms valid json with surrounding code'
  },
  someProperty: {
    anotherProperty: 111
  }
}
```

### XJSON parser methods

```js
XJSON.process(string): string // string result of applying all directives
```

```js
XJSON.parse(string): object // equivalent to JSON.parse(XJSON.process(string))
```

### XJSON with custom processors

```js
const xJSON = new XJSON([...customProcessorFunctions]);

xJSON.process(string): string
xJSON.parse(string): object
```

Custom processor functions must accept a string and return processed string. Custom processors are applied after built-in processors.

## license

MIT
