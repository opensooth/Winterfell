import React, { useContext } from 'react';
const ComponentsContext = React.createContext({});
export default ComponentsContext;
export const ComponentsContextConsumer = ComponentsContext.Consumer;
export const ComponentsContextProvider = ComponentsContext.Provider;
export function useComponentsContext() {
  return useContext(ComponentsContext);
}
// export function withComponentsContext(Component) {
//   return function ComponentWithComponentsContext(props) {
//     return (
//       <ComponentsContextConsumer>

//       </ComponentsContextConsumer>
//     );
//   }
// }
