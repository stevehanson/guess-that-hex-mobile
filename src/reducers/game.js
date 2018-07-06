import Firebase from '../firebase/index';
import tinycolor from 'tinycolor2'

export const START_GAME = 'game/start'
export const CREATE_GAME = 'game/create'
export const REVEAL_ANSWER = 'game/reveal'
export const RESET_GAME = 'game/reset'
export const JOIN_GAME = 'game/join'
export const SUBMIT_GUESS = 'game/submit_guess'
export const UPDATE_GAME = 'game/update'

const firebase = new Firebase()

const initialState = {
  id: null,
  creator: false,
  started: false,
  revealed: false,
  players: [],
  hex: null,
  guess: null
}

export default function reducers(state = initialState, action) {
  switch (action.type) {
    case START_GAME:
      return { ...state, started: true }
    case CREATE_GAME:
      return { ...state, creator: true, ...action.payload }
    case REVEAL_ANSWER:
      return { ...state, revealed: true }
    case JOIN_GAME:
      return { ...state, creator: false, gameId: action.payload.gameId }
    case SUBMIT_GUESS:
      return { ...state, guess: action.payload.guess }
    case UPDATE_GAME:
      return { ...state, ...action.payload }
    case RESET_GAME:
      return { 
        ...state,
        guess: null,
        revealed: false,
        hex: action.payload.hex
      }
    default:
      return state
  }
}

export const createGame = (name) => {
  return (dispatch, getState) => {
    const hex = tinycolor.random().toHexString()
    const id = firebase.createGame(hex)

    subscribeToAndJoinGame(dispatch, getState, id, name)

    dispatch({
      type: CREATE_GAME, 
      payload: { id, hex }
    })

    // dispatch(push(`/game/${id}`))
  }
}

export const joinGame = (id, name) => {
  return (dispatch, getState) => {
    subscribeToAndJoinGame(dispatch, getState, id, name)
    dispatch({
      type: JOIN_GAME,
      payload: { id }
    })

    // dispatch(push(`/game/${id}`))
  }
}

const subscribeToAndJoinGame = (dispatch, getState, id, name) => {
  firebase.subscribeToAndJoinGame(id, name, (gameVals) => {
    // game was reset, clear guess
    if(getState().game.revealed && !gameVals.revealed) {
      gameVals.guess = null
    }

    dispatch({
      type: UPDATE_GAME,
      payload: gameVals
    })
  })
}

const updateGame = (vals) => {
  firebase.updateGame(vals)
}

export const submitGuess = (guess) => {
  firebase.submitGuess(guess)
  return { type: SUBMIT_GUESS, payload: { guess }}
}

export const resetGame = () => {
  return (dispatch, getState) => {
    const hex = tinycolor.random().toHexString()
    firebase.resetGame(hex, getState().game.players)
    dispatch({ type: RESET_GAME, payload: { hex } })
  }
}

export const revealAnswer = () => {
  firebase.updateGame({ revealed: true })
  return { type: REVEAL_ANSWER }
}

export const startGame = () => {
  firebase.updateGame({ started: true })
  return { type: START_GAME }
}
