import {
  createContext,
  useCallback,
  useContext,
  useReducer,
  useMemo,
} from "react";

export const StackObjectContext = createContext();

export const useStackObject = () => {
  const { state, dispatch } = useContext(StackObjectContext);

  const keys = useCallback(() => Object.keys(state.items), [state]);
  const size = useMemo(() => keys().length, [keys]);

  function push(item) {
    return dispatch({ type: "PUSH", payload: item });
  }

  function remove(index) {
    return dispatch({ type: "REMOVE", payload: index });
  }

  function pop() {
    const index = keys()[size - 1];
    return remove(index);
  }

  function shift() {
    const index = keys()[0];
    return remove(index);
  }

  function clear() {
    return dispatch({ type: "CLEAR" });
  }

  function peek() {
    const index = keys()[size - 1];
    return state.items[index];
  }

  function head() {
    const index = keys()[0];
    return state.items[index];
  }

  function isBlank() {
    return size <= 0;
  }

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

function reducer(state, action) {
  let { items, count } = state;

  switch (action.type) {
    case "PUSH":
      items[count] = action.payload;
      count++;

      return { items, count };

    case "REMOVE":
      delete items[action.payload];
      return { items: state.items, count };

    case "CLEAR":
      return { items: {}, count: 0 };

    default:
      throw new Error(`Reducer type undefined`);
  }
}

export function StackObjectProvider(props) {
  const [state, dispatch] = useReducer(reducer, {
    count: 0,
    items: {},
  });

  return (
    <StackObjectContext.Provider value={{ state, dispatch }}>
      {props.children}
    </StackObjectContext.Provider>
  );
}
