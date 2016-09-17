import {Action} from 'app/library/store/index';

export default (state = [], {type, payload}: Action) => {
  switch(type){
    case 'SET_NOTES':
      return [...payload, ...state];
    case 'CREATE_NOTES':
      return [payload, ...state];
    case 'SORT_NOTES':
      return payload;
    case 'GET_NOTES':
      return [...state];
    case 'EDIT_NOTES':
      return [payload, ...state.filter(note => note.id != payload.id)];
    default:
      return state;
  }
};
