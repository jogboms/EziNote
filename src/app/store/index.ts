import settings from './settings';
import notes from './notes';
import search from './search';
import sort from './sort';
import note from './note';

import {NoteModel} from 'app/models/note';

export interface AppState {
  settings: {
    user: string;
    page: string;
    note: NoteModel;
    isList: boolean;
  };
  notes;
  sort;
  search;
  note;
}

const reducers = {
  settings: settings,
  notes: notes,
  search: search,
  sort: sort,
  note: note,
}

export default reducers;
