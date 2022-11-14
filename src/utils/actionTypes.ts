const randomString = () =>
  Math.random().toString(36).substring(7).split('').join('.');


const ActionTypes = {
  INIT: `@@redux/INIT${randomString()}`,
  REPLACE: `@@redux/REPLACE${randomString()}`,
}

export default ActionTypes;
