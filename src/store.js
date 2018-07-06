import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import gameReducers from './reducers/game'
import countReducers from './reducers/count'

const enhancers = []
const middleware = [
  thunk,
  logger
]

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

const combinedReducers = combineReducers({
  game: gameReducers,
  count: countReducers
})

const store = createStore(
  combinedReducers,
  composedEnhancers
)

export default store
