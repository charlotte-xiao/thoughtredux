function applyMiddlewares(...middlewares) {
  return (createStore) => (reducer, preloadState) => {
    const store = createStore(reducer, preloadState)

    middlewares = middlewares.reverse();
    middlewares.forEach(middlewares => {
      store.dispatch = middlewares(store.dispatch);
    })
    return store;
  }
}

export default applyMiddlewares;
