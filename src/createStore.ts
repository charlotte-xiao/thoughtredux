import ActionTypes from "./utils/actionTypes";

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

  dispatch({type: ActionTypes.INIT})

  return {
    dispatch,
    getState,
  }

}

export default createStore;
