import createStore from "../src/createStore";

const mockReducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return state + action.payload;
    case 'decrement':
      return state - action.payload;
    // 重点：需要默认返回
    default:
      return state;
  }
}

describe('test createStore', () => {

  it('test getState', () => {
    const mockInitState = 1;
    // @ts-ignore
    const store = createStore(mockReducer, mockInitState);

    const currentState = store.getState();
    expect(currentState).toEqual(mockInitState);
  })

  it('test dispatch', () => {
    const mockInitState = 1;
    // @ts-ignore
    const store = createStore(mockReducer, mockInitState);

    expect(store.getState()).toEqual(mockInitState);

    // 1 + 2
    store.dispatch({type: 'increment', payload: 2});
    expect(store.getState()).toEqual(3);

    // 3 - 4
    store.dispatch({type: 'decrement', payload: 4});
    expect(store.getState()).toEqual(-1);
  })

  it('测试 replaceReducer', () => {
    // @ts-ignore
    const store = createStore(mockReducer, 1);

    const newReducer = jest.fn((state, action) => {
      return 'the new state';
    })

    store.replaceReducer(newReducer);

    store.dispatch({type: 'increment', payload: 2});
    expect(store.getState()).toEqual('the new state');
    expect(newReducer).toBeCalledTimes(2);
  })
  it('测试 subscribe', () => {
    // @ts-ignore
    const store = createStore(mockReducer, 1);

    const listener = jest.fn();
    store.subscribe(listener);

    store.dispatch({type: 'increment', payload: 2});
    expect(store.getState()).toEqual(3);
    expect(listener).toBeCalledTimes(1);
  })
  it('测试 unsubscribe', () => {
    // @ts-ignore
    const store = createStore(mockReducer, 1);

    const listener = jest.fn();
    const unsubscribe = store.subscribe(listener);

    unsubscribe();

    store.dispatch({type: 'increment', payload: 2});
    expect(store.getState()).toEqual(3);
    expect(listener).toBeCalledTimes(0);
  })
})
