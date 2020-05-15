import { AsyncStorage } from 'react-native';

export const ADD_CARD="ADD_CARD"
export const ADD_DECK='ADD_DECK'
export const GET_DECK="GET_DECK"

export const getData = () => {
  return async dispatch => {
      let data =  JSON.parse( AsyncStorage.getItem("quizes")) || {};
      dispatch(recieve_decks(data))
  }
}
  
const recieve_decks = (decks) => {
  return {
      type: GET_DECK,
      decks
    }
}
  
export const new_deck =  (deck) => {
  return async (dispatch, getState) => {
    dispatch(add_deck(deck))
    const state = getState();
     AsyncStorage.setItem("quizes", JSON.stringify(state))
  }
}

const add_deck= (deck) => {
  return {
      type: ADD_DECK,
      deck
    }
}

export const new_card = (deck, card) => {
  return async (dispatch,getState) => {
    dispatch(add_card(deck, card))
    const state= getState();
     AsyncStorage.setItem("quizes",JSON.stringify(state));
  }
}

const add_card= (deck, card) => {
  return {
    type: ADD_CARD,
    deck,
    card
  }
}


export function remove_deck (deck) {
  return AsyncStorage.getItem("quizes")
    .then((results) => {
      const data = JSON.parse(results)
      data[deck] = undefined
      delete data[deck]
      AsyncStorage.setItem("quizes", JSON.stringify(data))
    })
}