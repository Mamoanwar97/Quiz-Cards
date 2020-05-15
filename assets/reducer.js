import {GET_DECK,ADD_DECK, ADD_CARD} from './actions.js'

export default function cardReducer (state = {} , action) {
  switch (action.type) {
    
    case GET_DECK:
      return  action.state
      
    case ADD_CARD:
      return {
        ...state,
        [action.deck]:{ 
          ...state[action.deck], 
          questions:
            [...state[action.deck]['questions'], 
            action.card] 
        }
      }

    case ADD_DECK:
      return  {
        ...state, 
        [action.deck] : {
           title: action.deck,
           questions: []
        }
      }
      
    default:
        return state
  }
}