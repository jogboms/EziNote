import {Component, EventEmitter, Input, Output, ChangeDetectionStrategy} from "angular2/core";

import {Card} from "../card/card";

import {SettingsService, NotesService} from 'app/services/index';
import {NoteModel} from 'app/models/note';

@Component({
  moduleId: module.id,
  selector: 'book',
  templateUrl: './book.html',
  styleUrls: ['./book.css'],
  directives: [Card],
})
export class Book{
  isSort = false;
  isSearch = false;
  isList: boolean;
  notes: NoteModel[] = [];

  constructor(
    private _settings: SettingsService,
    private _notes: NotesService
    ){
    this._notes.select().subscribe(([notes, search, sort]) => {
      let final = this.isSearch ? search : notes;
      this.notes = final.sort(sort);
    });

    this._settings.select().subscribe(x => {
      this.isList = x.isList;
      this.isSort = x.isSort;
      this.isSearch = x.isSearch;
    })
  }

  onSwitch(state){
    this.isList = state;

    this._settings.update({isList: this.isList});
  }

  onSearch(e){
    this.isSearch = true;
    const query = e.value.trim();
    if(query.length > 1){
      this._notes.search(query);
      this._settings.update({isSearch: this.isSearch});
    }
  }

  onCancel(e){
    e.value = '';
    this.isSearch = false;
    this.isSort = false;
    this._notes.revert();
    this._settings.update({isSearch: this.isSearch, isSort: this.isSort});
  }


  onSort(){
    this.isSort = !this.isSort;
    this._notes.sort(this.isSort);
    this._settings.update({isSort: this.isSort});
  }

}
