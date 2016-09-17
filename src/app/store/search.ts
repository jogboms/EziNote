import {Action} from 'app/library/store/index';

export default (state = [], {type, payload}: Action) => {
  if(type == 'SEARCH_NOTES'){
    return payload;
  }

  return state;
};
