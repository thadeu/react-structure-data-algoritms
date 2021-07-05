import { useState } from "react";

export const State = (props) => {
  const result = useState(props.default);

  return props.children(result);
};

export function connect(WrappedComponent, mapToProps) {
  return function (props) {
    const selectors = mapToProps();
    return <WrappedComponent {...selectors} {...props} />;
  };
}
