import { useState, createContext, useContext, useEffect, useMemo } from "react";
import { useLocalStorage } from "react-use";
import last from "lodash/last";

export const StackContext = createContext();

export const useStackArray = () => {
  const { state, setState } = useContext(StackContext);

  function push(item) {
    setState((prevState) => [...prevState, item]);
    return state;
  }

  function pop() {
    const index = state.length - 1;
    const newState = [...state.slice(0, index), ...state.slice(index + 1)];

    return setState(newState);
  }

  function remove(index) {
    const newState = [...state.slice(0, index), ...state.slice(index + 1)];
    return setState(newState);
  }

  function shift() {
    const newState = state.slice(1);
    return setState(newState);
  }

  function peek() {
    return last(state || []);
  }

  function head() {
    return state[0];
  }

  function isBlank() {
    return state.length <= 0;
  }

  function clear() {
    return setState([]);
  }

  const size = useMemo(() => state.length, [state]);

  const helpers = {
    push,
    pop,
    shift,
    head,
    peek,
    remove,
    isBlank,
    clear,
    size,
  };

  return [state, helpers];
};

export function StackArrayProvider(props) {
  const [value, setValue] = useLocalStorage("stacks:array", []);
  const [state, setState] = useState(value);

  useEffect(() => {
    setValue(state);
  }, [state]);

  return (
    <StackContext.Provider value={{ state, setState }}>
      {props.children}
    </StackContext.Provider>
  );
}
