import {Action} from 'app/library/store/index';
import {NoteModel} from 'app/models/note';

export default (state = state => 0, {type, payload}: Action) => {
  switch(type){
    case 'SORT_NOTES_DESC':
      return (a:NoteModel, b:NoteModel) => {
        if(a.created.getTime() > b.created.getTime())
          return -1;
        else if(a.created.getTime() < b.created.getTime())
          return 1;
      };
    case 'SORT_NOTES_ASC':
      return (a:NoteModel, b:NoteModel) => {
        if(a.created.getTime() > b.created.getTime())
          return 1;
        else if(a.created.getTime() < b.created.getTime())
          return -1;
      };
    default:
      return state;
  }
};
