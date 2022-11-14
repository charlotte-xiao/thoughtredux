import ActionTypes from "./utils/actionTypes";
import isPlainObject from "./utils/isPlainObject";
import kindOf from "./utils/kindOf";

function createStore(reducer, preloadState, enhancer) {

  let currentReducer = reducer;
  let currentState = preloadState;
  let isDispatching = false;

  function getState() {
    if (isDispatching) {
      throw new Error("in dispatching, can't get state");
    }
    return currentState;
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
    return action;
  }

  function replaceReducer(nextReducer) {

    if (typeof nextReducer !== 'function') {
      throw new Error(`nextReducer isn't a function. This is: '${kindOf(nextReducer)}`)
    }

    currentReducer = nextReducer;

    dispatch({type: ActionTypes.REPLACE})
  }

  dispatch({type: ActionTypes.INIT})

  return {
    dispatch,
    getState,
    replaceReducer
  }

}

export default createStore;
