import {Injectable} from "angular2/core";

import {Store, Action} from 'app/library/store/index';
import {AppState} from 'app/store/index';
import {NoteModel} from 'app/models/note';

@Injectable()
export class SettingsService {
  storage = localStorage;

  constructor(private store: Store<AppState>){
    const settings = (storage) => {
      return storage.hasOwnProperty('name') && storage['name'] ?
        JSON.parse(storage['name']) :
        {
          user: '',
          page: 'main',
          note: new NoteModel,
          isList: false,
          isSearch: false,
          isSort: false,
        };
    }
    this.dispatch({type: 'SET_SETTINGS', payload: settings(this.storage)});
  }

  select(){
    return this.store.select('settings');
  }

  update(payload){
    const update = Object.assign({}, this.store.state.settings, payload);
    this.storage['name'] = JSON.stringify(update);

    this.dispatch({type: 'UPDATE_SETTINGS', payload: update});
  }

  dispatch(action: Action){
    this.store.dispatch(action);
  }
}
