(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{153:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",function(){return loadStringFromFile});__webpack_require__(67),__webpack_require__(88);function asyncGeneratorStep(gen,resolve,reject,_next,_throw,key,arg){try{var info=gen[key](arg),value=info.value}catch(error){return void reject(error)}info.done?resolve(value):Promise.resolve(value).then(_next,_throw)}function loadStringFromFile(){return _loadStringFromFile.apply(this,arguments)}function _loadStringFromFile(){return fn=regeneratorRuntime.mark(function _callee(uri){var response,text;return regeneratorRuntime.wrap(function(_context){for(;;)switch(_context.prev=_context.next){case 0:return _context.next=2,fetch(uri);case 2:return response=_context.sent,_context.next=5,response.text();case 5:return text=_context.sent,_context.abrupt("return",text);case 7:case"end":return _context.stop()}},_callee)}),(_loadStringFromFile=function(){var self=this,args=arguments;return new Promise(function(resolve,reject){function _next(value){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"next",value)}function _throw(err){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"throw",err)}var gen=fn.apply(self,args);_next(void 0)})}).apply(this,arguments);var fn}},154:function(module,exports,__webpack_require__){module.exports=__webpack_require__.p+"f67f74b5a779530af742afaa29bf6567.xjson"},155:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",function(){return SchemasComparison});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(4),react__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);__webpack_require__(356);function SchemasComparison(_ref){var leftPanel=_ref.leftPanel,rightPanel=_ref.rightPanel,onProcess=_ref.onProcess,processText=_ref.processText,pre=Object(react__WEBPACK_IMPORTED_MODULE_0__.useRef)();return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div",null,react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button",{onClick:function(){var value=pre.current.textContent;onProcess(value)}},processText),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div",{className:"comparison__cont"},react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("pre",{ref:pre,className:"comparison__left",contentEditable:!0},react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("code",null,leftPanel)),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("pre",{className:"comparison__right"},rightPanel)))}SchemasComparison.__docgenInfo={description:"",methods:[],displayName:"SchemasComparison"},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["stories/test-fixtures/Comparison.js"]={name:"SchemasComparison",docgenInfo:SchemasComparison.__docgenInfo,path:"stories/test-fixtures/Comparison.js"})},156:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__(0),__webpack_require__(138),__webpack_require__(151),__webpack_require__(152);var HTML_SECTION_REGEX=/#ESCAPE\(((?!#ESCAPE\()[\0-\uFFFF])*\)#ESCAPE/g,HTML_MARKER_LENGTH=8;function escapeText(string){var textToEscape=string.slice(HTML_MARKER_LENGTH,string.length-HTML_MARKER_LENGTH).trim();return JSON.stringify(textToEscape)}__webpack_require__(27),__webpack_require__(21),__webpack_require__(42),__webpack_require__(122),__webpack_require__(355),__webpack_require__(13),__webpack_require__(17);function _slicedToArray(arr,i){return function(arr){if(Array.isArray(arr))return arr}(arr)||function(arr,i){var _arr=[],_n=!0,_d=!1,_e=void 0;try{for(var _s,_i=arr[Symbol.iterator]();!(_n=(_s=_i.next()).done)&&(_arr.push(_s.value),!i||_arr.length!==i);_n=!0);}catch(err){_d=!0,_e=err}finally{try{_n||null==_i.return||_i.return()}finally{if(_d)throw _e}}return _arr}(arr,i)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var FRAGMENT_REGEX=/#FRAGMENT\(((?!#FRAGMENT\()[\0-\uFFFF])*\)#FRAGMENT/g,FRAGMENT_MARKER_LENGTH=10,FRAGMENTS_REGEX=/#FRAGMENTS\(((?!#FRAGMENTS\()[\0-\uFFFF])*\)#FRAGMENTS/g,FRAGMENTS_MARKER_LENGTH=11,FRAGMENT_DEFINITION_REGEX=/#FRAGMENT:((?!#FRAGMENT:)[\0-\uFFFF])*\(((?!#FRAGMENT:)[\0-\uFFFF])*\)#FRAGMENT/g,FRAGMENT_DEFINITION_MARKER_LENGTH=10;function resolveFragments(string,fragments){return string.replace(FRAGMENT_REGEX,function(fragmentRef){return function(fragmentRef,fragments){var fragmentId=function(fragmentRef){return fragmentRef.slice(FRAGMENT_MARKER_LENGTH,fragmentRef.length-FRAGMENT_MARKER_LENGTH).trim()}(fragmentRef),fragment=fragments[fragmentId];if(void 0===fragment)throw new Error("Fragment ".concat(fragmentId," is not found in fragment definitions"));return fragment.resolved||(fragment.content=resolveFragments(fragment.content,fragments),fragment.resolved=!0),fragment.content}(fragmentRef,fragments)})}function _defineProperties(target,props){for(var descriptor,i=0;i<props.length;i++)(descriptor=props[i]).enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}function _createClass(Constructor,protoProps,staticProps){return protoProps&&_defineProperties(Constructor.prototype,protoProps),staticProps&&_defineProperties(Constructor,staticProps),Constructor}__webpack_require__.d(__webpack_exports__,"a",function(){return XJSON});var processors=[function(textFile){return textFile.replace(HTML_SECTION_REGEX,escapeText)},function(string){var _extractFragmentDefin2=_slicedToArray(function(string){var fragmentDefinitionsBlocks=[];return[string.replace(FRAGMENTS_REGEX,function(fdBlock){return fragmentDefinitionsBlocks.push(fdBlock),""}),fragmentDefinitionsBlocks]}(string),2);return resolveFragments(_extractFragmentDefin2[0],function(fragmentDefinitionsBlocks){var fragments={};return fragmentDefinitionsBlocks.forEach(function(fragmentDefinitionsBlock){var fragmentDefinitions=fragmentDefinitionsBlock.slice(FRAGMENTS_MARKER_LENGTH,fragmentDefinitionsBlock.length-FRAGMENTS_MARKER_LENGTH).match(FRAGMENT_DEFINITION_REGEX)||[];fragmentDefinitions.forEach(function(fd){return function(fragmentDefinition,fragments){var startOfContent=fragmentDefinition.indexOf("("),id=fragmentDefinition.slice(FRAGMENT_DEFINITION_MARKER_LENGTH,startOfContent).trim(),content=fragmentDefinition.slice(startOfContent+1,fragmentDefinition.length-FRAGMENT_DEFINITION_MARKER_LENGTH).trim();fragments[id]={resolved:!1,content:content}}(fd,fragments)})}),fragments}(_extractFragmentDefin2[1]))}],XJSON=function(){function XJSON(){var processors=0<arguments.length&&void 0!==arguments[0]?arguments[0]:[];(function(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")})(this,XJSON),this.processors=processors}return _createClass(XJSON,null,[{key:"process",value:function(string){return processors.reduce(function(processedString,processor){return processor(processedString)},string)}},{key:"parse",value:function(string){var processedString=XJSON.process(string);return JSON.parse(processedString)}}]),_createClass(XJSON,[{key:"process",value:function(string){var preProcessedString=XJSON.process(string);return this.processors.reduce(function(processedString,processor){return processor(processedString)},preProcessedString)}},{key:"parse",value:function(string){var processedString=this.process(string);return JSON.parse(processedString)}}]),XJSON}()},157:function(module,exports,__webpack_require__){__webpack_require__(158),__webpack_require__(237),module.exports=__webpack_require__(238)},238:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),function(module){__webpack_require__(19),__webpack_require__(13),__webpack_require__(17);var _storybook_react__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(66),req=__webpack_require__(353);Object(_storybook_react__WEBPACK_IMPORTED_MODULE_3__.configure)(function(){req.keys().forEach(function(filename){return req(filename)})},module)}.call(this,__webpack_require__(119)(module))},353:function(module,exports,__webpack_require__){var map={"./XJSON.stories.js":354};function webpackContext(req){var id=webpackContextResolve(req);return __webpack_require__(id)}function webpackContextResolve(req){if(!__webpack_require__.o(map,req)){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}return map[req]}webpackContext.keys=function(){return Object.keys(map)},webpackContext.resolve=webpackContextResolve,module.exports=webpackContext,webpackContext.id=353},354:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),function(module){__webpack_require__(67),__webpack_require__(88),__webpack_require__(27),__webpack_require__(21),__webpack_require__(13),__webpack_require__(42),__webpack_require__(85),__webpack_require__(87);var react__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__(4),react__WEBPACK_IMPORTED_MODULE_8___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_8__),_storybook_react__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__(66),_src_index__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__(156),_test_fixtures_loadStringFromFile__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__(153),_test_fixtures_jsonWithFragmentsAndUnescapedText_xjson__WEBPACK_IMPORTED_MODULE_12__=__webpack_require__(154),_test_fixtures_jsonWithFragmentsAndUnescapedText_xjson__WEBPACK_IMPORTED_MODULE_12___default=__webpack_require__.n(_test_fixtures_jsonWithFragmentsAndUnescapedText_xjson__WEBPACK_IMPORTED_MODULE_12__),_test_fixtures_Comparison__WEBPACK_IMPORTED_MODULE_13__=__webpack_require__(155);function asyncGeneratorStep(gen,resolve,reject,_next,_throw,key,arg){try{var info=gen[key](arg),value=info.value}catch(error){return void reject(error)}info.done?resolve(value):Promise.resolve(value).then(_next,_throw)}function _slicedToArray(arr,i){return function(arr){if(Array.isArray(arr))return arr}(arr)||function(arr,i){var _arr=[],_n=!0,_d=!1,_e=void 0;try{for(var _s,_i=arr[Symbol.iterator]();!(_n=(_s=_i.next()).done)&&(_arr.push(_s.value),!i||_arr.length!==i);_n=!0);}catch(err){_d=!0,_e=err}finally{try{_n||null==_i.return||_i.return()}finally{if(_d)throw _e}}return _arr}(arr,i)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function Test(){var _useState2=_slicedToArray(Object(react__WEBPACK_IMPORTED_MODULE_8__.useState)(null),2),original=_useState2[0],setOriginal=_useState2[1],_useState4=_slicedToArray(Object(react__WEBPACK_IMPORTED_MODULE_8__.useState)(null),2),processed=_useState4[0],setProcessed=_useState4[1];return Object(react__WEBPACK_IMPORTED_MODULE_8__.useEffect)(function(){!function(){_loadFile.apply(this,arguments)}(setOriginal)},[]),react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_test_fixtures_Comparison__WEBPACK_IMPORTED_MODULE_13__.a,{leftPanel:original,rightPanel:processed,onProcess:function(string){!function(string,setProcessed){try{var result=_src_index__WEBPACK_IMPORTED_MODULE_10__.a.parse(string),jsonString=JSON.stringify(result,null,2);setProcessed(jsonString)}catch(err){setProcessed(err.toString())}}(string,setProcessed)},processText:"Parse"})}function _loadFile(){return fn=regeneratorRuntime.mark(function _callee(setOriginal){var string;return regeneratorRuntime.wrap(function(_context){for(;;)switch(_context.prev=_context.next){case 0:return _context.next=2,Object(_test_fixtures_loadStringFromFile__WEBPACK_IMPORTED_MODULE_11__.a)(_test_fixtures_jsonWithFragmentsAndUnescapedText_xjson__WEBPACK_IMPORTED_MODULE_12___default.a);case 2:string=_context.sent,setOriginal(string);case 4:case"end":return _context.stop()}},_callee)}),(_loadFile=function(){var self=this,args=arguments;return new Promise(function(resolve,reject){function _next(value){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"next",value)}function _throw(err){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"throw",err)}var gen=fn.apply(self,args);_next(void 0)})}).apply(this,arguments);var fn}Object(_storybook_react__WEBPACK_IMPORTED_MODULE_9__.storiesOf)("XJSON",module).add("parse",function(){return react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(Test,null)})}.call(this,__webpack_require__(119)(module))},356:function(module,exports,__webpack_require__){var content=__webpack_require__(357);"string"==typeof content&&(content=[[module.i,content,""]]);var options={hmr:!0,transform:void 0,insertInto:void 0};__webpack_require__(359)(content,options);content.locals&&(module.exports=content.locals)},357:function(module,exports,__webpack_require__){(module.exports=__webpack_require__(358)(!1)).push([module.i,".comparison__cont {\n  display: flex;\n}\n\n.comparison__left,\n.comparison__right {\n  width: 50%;\n  overflow-x: auto;\n  tab-size: 2;\n}\n\n.comparison__left {\n  border-right: 1px solid #8e44ad;\n}\n\n.comparison__left div,\n.comparison__left pre {\n  margin: 0;\n  padding: 0;\n}\n",""])}},[[157,1,2]]]);
//# sourceMappingURL=main.d8fbb41338ec0668b345.bundle.js.map