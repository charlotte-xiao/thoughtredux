import ActionTypes from "./utils/actionTypes";
import isPlainObject from "./utils/isPlainObject";
import kindOf from "./utils/kindOf";

function createStore(reducer, preloadState, enhancer) {

  if (enhancer){
    return enhancer(createStore)(reducer, preloadState);
  }

  let currentReducer = reducer;
  let currentState = preloadState;
  let currentListeners = [];
  let nextListeners = currentListeners;
  let isDispatching = false;

  function getState() {
    if (isDispatching) {
      throw new Error("in dispatching, can't get state");
    }
    return currentState;
  }

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }

  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error(`listener isn't a function. This is: '${kindOf(listener)}`);
    }

    if (isDispatching) {
      throw new Error("in dispatching, can't subscribe");
    }
    let isSubscribed = true;

    ensureCanMutateNextListeners();
    nextListeners.push(listener);

    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      if (isDispatching) {
        throw new Error("in dispatching, can't unsubscribe");
      }

      isSubscribed = false;

      ensureCanMutateNextListeners();
      const index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
      currentListeners = null;
    }
  }

  function dispatch(action) {

    if (!isPlainObject(action)) {
      throw new Error(`Action isn't plain object, it was ${kindOf(action)}`)
    }

    if (isDispatching) {
      throw new Error("in dispatching, can't dispatch");
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    const listeners = (currentListeners = nextListeners);
    listeners.forEach(listener => listener());

    return action;
  }

  function replaceReducer(nextReducer) {

    if (typeof nextReducer !== 'function') {
      throw new Error(`nextReducer isn't a function. This is: '${kindOf(nextReducer)}`)
    }

    currentReducer = nextReducer;

    dispatch({type: ActionTypes.REPLACE})
  }

  function observable() {
    const outerSubscribe = subscribe;

    return {
      subscribe(observer) {
        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        const unsubscribe = outerSubscribe(observeState);
        return {unsubscribe}
      }
    }
  }

  dispatch({type: ActionTypes.INIT})

  return {
    dispatch,
    getState,
    replaceReducer,
    subscribe,
    observable
  }

}

export default createStore;
