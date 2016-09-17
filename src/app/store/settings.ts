import {Action} from 'app/library/store/index';

export default (state = {}, {type, payload}: Action) => {
  switch(type){
    case 'SET_SETTINGS':
      return payload;
    case 'GET_SETTINGS':
      return state;
    case 'UPDATE_SETTINGS':
      return payload;
    default:
      return state;
  }
};
