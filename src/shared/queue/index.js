import {
  createContext,
  useCallback,
  useContext,
  useReducer,
  useMemo,
} from "react";

/**
 * Queue module of FIFO - first-in/first-out
 */
export const QueueContext = createContext();

export const useQueue = () => {
  const { state, dispatch } = useContext(QueueContext);
  const { items } = state;

  const keys = useCallback(() => Object.keys(items), [items]);
  const size = useMemo(() => Object.keys(state.items).length, [state]);

  function enqueue(item) {
    return dispatch({ type: "ENQUEUE", payload: item });
  }

  // remove first item
  async function dequeue(props) {
    const { isRemove } = { isRemove: true, ...props };

    if (isBlank()) {
      return undefined;
    }

    const index = keys()[0];
    const item = items[index];

    if (isRemove) {
      remove(index);
    }

    return Promise.resolve(item);
  }

  function pop() {
    const index = keys()[size - 1];
    return remove(index);
  }

  function shift() {
    const index = keys()[0];
    return remove(index);
  }

  function remove(index) {
    return dispatch({ type: "REMOVE", payload: index });
  }

  // get first item
  function head() {
    const index = keys()[0];
    return state.items[index];
  }

  // get last item
  function tail() {
    const index = keys()[size - 1];
    return state.items[index];
  }

  function isBlank() {
    return size <= 0;
  }

  const helpers = {
    enqueue,
    dequeue,
    pop,
    shift,
    remove,
    isBlank,
    tail,
    head,
    size,
  };

  return [state, helpers];
};

function reducer(state, action) {
  let { items, count } = state;

  switch (action.type) {
    case "ENQUEUE":
      items[`queue#${count}`] = { ...action.payload };
      count++;

      return { items, count };

    case "REMOVE":
      delete items[action.payload];
      return { items: state.items, count };

    default:
      throw new Error(`Reducer type undefined`);
  }
}

export function QueueProvider(props) {
  const [state, dispatch] = useReducer(reducer, {
    count: 0,
    items: {},
  });

  return (
    <QueueContext.Provider value={{ state, dispatch }}>
      {props.children}
    </QueueContext.Provider>
  );
}
