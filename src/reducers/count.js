export const INCREASE = 'count/increase'

const initialState = 1

export default function reducers(state = initialState, action) {
  switch(action.type) {
    case INCREASE:
      return state + action.payload
    default:
      return state
  }
}

export function addToCount(num) {
  return {
    type: INCREASE,
    payload: num
  }
}
