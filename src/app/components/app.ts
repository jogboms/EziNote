import {Window} from '../nw/main';
import {Component} from "angular2/core";

import {Menubar} from './menubar/menubar';
import {Book} from './book/book';
import {Note} from './note/note';
import {Start} from './start/start';

import {TimeService, SettingsService} from 'app/services/index';
import {NoteModel} from 'app/models/index';

@Component({
  moduleId: module.id,
  selector: 'main',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  directives: [Menubar, Book, Note, Start],
})
export class App {
  Window = Window;
  title: string = Window.App.name;
  note: NoteModel;
  settings: Object = {};

  constructor(
    private _time: TimeService,
    private _settings: SettingsService
    ){
    this.note = new NoteModel();
  }

  ngOnInit(){
    this._settings.select().subscribe(s => this.settings = s);

    this._time.init().subscribe(date => this.note.setDate(date));
  }

  onTypeEvent(content){
    this.note.content = content;
    this._settings.update({page: 'create', note: this.note});
  }

  onChangeEvent(note){
    this.note.title = note.title;
    this.note.content = note.content;
  }
}
