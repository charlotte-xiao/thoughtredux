import createStore from "../src/createStore";
import applyMiddlewares from "../src/applyMiddlewares";

const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return state + action.payload;
    case 'decrement':
      return state - action.payload;
    default:
      return state;
  }
}

describe('test applyMiddlewares', () => {
  it('test applyMiddlewares with 2 middlewares', () => {
    const mockFn1 = jest.fn(dispatch => action => {
      console.log('mockFn 1 before');
      dispatch(action)
      console.log('mockFn 1 after');
    })
    const mockFn2 = jest.fn(dispatch => action => {
      console.log('mockFn 2 before');
      dispatch(action);
      console.log('mockFn 2 after');
    })

    const store = createStore(reducer, 1, applyMiddlewares(mockFn1, mockFn2))

    store.dispatch({type: 'increment', payload: 2});

    expect(store.getState()).toEqual(3);
    expect(mockFn1).toBeCalledTimes(1);
    expect(mockFn2).toBeCalledTimes(1);
  })
})
