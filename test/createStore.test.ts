import createStore from "../src/createStore";

const mockReducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return state + action.payload
    case 'decrement':
      return state - action.payload
    default:
      return state;
  }
}

describe('test createStore', () => {

  it('test getState', () => {
    const mockInitState = 1;
    // @ts-ignore
    const store = createStore(mockReducer, mockInitState)

    const currentState = store.getState()
    expect(currentState).toEqual(mockInitState)
  })

  it('test dispatch', () => {
    const mockInitState = 1;
    // @ts-ignore
    const store = createStore(mockReducer, mockInitState)

    expect(store.getState()).toEqual(mockInitState)

    // 1 + 2
    store.dispatch({type: 'increment', payload: 2})
    expect(store.getState()).toEqual(3)

    // 3 - 4
    store.dispatch({type: 'decrement', payload: 4})
    expect(store.getState()).toEqual(-1)
  })
})
