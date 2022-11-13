# 来造一个轮子吧，造一个不被定义的轮子(不被定义文学)

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8708739b76f94e7e86b6825c7efac988~tplv-k3u1fbpfcp-zoom-1.image)

> 源码：https://github.com/charlotte-xiao/thoughtredux

> Redux源码：https://github.com/reduxjs/redux

## E-1_createStore

函数创建一个 Object，里面存放数据，并提供读和写方法。

- getState 返回当前数据
- dispatch reducer 计算新的数据（状态）从而修改 currentState
- isDispatching 防止多重 dispatch 调用问题,如下代码：

```javascript
const reducer = (state = {}, action) => {
  store.dispatch({type: 'XXX'})
  return state
}
```

## E-2_initState

- 执行初始化`dispatch({type: actionTypes.INIT})`
- 自定义Reducer需要默认返回值
