import {Action} from 'app/library/store/index';

export default (state = {}, {type, payload}: Action) => {
  switch(type){
    case 'SET_NOTE':
      return payload;
    case 'CREATE_NOTE':
      return payload;
    case 'UPDATE_NOTE':
      return Object.assign({}, state, payload);
    case 'GET_NOTE':
      return state;
    case 'EDIT_NOTE':
      return Object.assign({}, state, payload);
    default:
      return state;
  }
};
