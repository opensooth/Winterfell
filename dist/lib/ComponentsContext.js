'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.useComponentsContext = useComponentsContext;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var ComponentsContext = _react2['default'].createContext({});
exports['default'] = ComponentsContext;
var ComponentsContextConsumer = ComponentsContext.Consumer;
exports.ComponentsContextConsumer = ComponentsContextConsumer;
var ComponentsContextProvider = ComponentsContext.Provider;
exports.ComponentsContextProvider = ComponentsContextProvider;

function useComponentsContext() {
  return (0, _react.useContext)(ComponentsContext);
}

// export function withComponentsContext(Component) {
//   return function ComponentWithComponentsContext(props) {
//     return (
//       <ComponentsContextConsumer>

//       </ComponentsContextConsumer>
//     );
//   }
// }