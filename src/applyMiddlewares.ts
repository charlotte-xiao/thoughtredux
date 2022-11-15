import compose from './compose'

function applyMiddlewares(...middlewares) {
  return (createStore) => (reducer, preloadState) => {
    const store = createStore(reducer, preloadState)

    let dispatch = compose(...middlewares)(store.dispatch)
    return {...store, dispatch};
  }
}

export default applyMiddlewares;
