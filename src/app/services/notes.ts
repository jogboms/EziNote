import {Injectable} from "angular2/core";
import {Observable} from "rxjs/Observable";
import "rxjs/Rx";

import {Store, Action} from 'app/library/store/index';
import {AppState} from 'app/store/index';
import {NoteModel} from "../models/note";
import {NotesDataService} from "./notesdata";

@Injectable()
export class NotesService {
  constructor(private store: Store<AppState>, private notesdata: NotesDataService){
    this.init();
  }

  select(){
    return Observable.combineLatest(
      this.store.select('notes'),
      this.store.select('search'),
      this.store.select('sort')
      )
    // return Observable.combineLatest(
    //   Observable.merge(this.store.select('notes'), this.store.select('search')),
    //   this.store.select('sort')
    //   )
  }

  init(){
    this.notesdata.fetch().subscribe(notes => {
      this.dispatch({type: 'SET_NOTES', payload: notes});
    })
  }

  create(note: NoteModel){
    let new_note = this.notesdata.create(note);
    this.dispatch({type: 'CREATE_NOTES', payload: new_note});
  }

  edit(old_note, note){
    let new_note = this.notesdata.edit(old_note, note);
    this.dispatch({type: 'EDIT_NOTES', payload: new_note});
  }

  sort(state){
    if(state == true)
     this.dispatch({type: 'SORT_NOTES_ASC'});
   else
     this.dispatch({type: 'SORT_NOTES_DESC'});
  }

  search(query){
    this.notesdata.search(query).subscribe(notes => {
      this.dispatch({type: 'SEARCH_NOTES', payload: notes});
    });
  }

  revert(){
    this.dispatch({type: 'SORT_NOTES_DESC'});
    this.dispatch({type: 'GET_NOTES'});
  }

  dispatch(action: Action){
    this.store.dispatch(action);
  }
}
