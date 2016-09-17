import {Injectable} from "angular2/core";
import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import "rxjs/Rx";

import DB from "../db/ezinote";
import {NoteModel} from "../models/note";

const NOTES_DB = DB.collection("notes", {primaryKey: "id"});

@Injectable()
export class NotesDataService {
  notes: NoteModel[] = [];
  DATA: BehaviorSubject<any> = new BehaviorSubject([]);

  constructor(){
    this.DATA.take(1).subscribe(x => console.log('Initialized DB...'));

    NOTES_DB.load((x) => this.DATA.next(NOTES_DB.data()))
  }

  create(insert: NoteModel): NoteModel{
    let p = NOTES_DB.insert(Object.assign({}, insert, {
      created: new Date,
      updated: new Date
    }));
    NOTES_DB.save()
    return this.__fix(p.inserted[0]);
  }

  edit(id: string, update: NoteModel): NoteModel{
    let p = NOTES_DB.update({id: id}, {
      title: update.title,
      content: update.content,
      updated: new Date
    });
    NOTES_DB.save()
    return this.__fix(p[0]);
  }

  fetch(): Observable<NoteModel[]>{
    return Observable.from(this.DATA.filter(x => x.length))
      .map(x => x.map(this.__fix).sort(this.__sort))
  }

  search(query: string): Observable<NoteModel[]>{
    return Observable.of(NOTES_DB.find({title: new RegExp(query, 'i')}))
      .map(x => x.map(this.__fix).sort(this.__sort))
  }

  __fix(note: NoteModel): NoteModel{
    return new NoteModel(Object.assign({}, note, {
      date: new Date(note.date.toString()),
      created: new Date(note.created.toString()),
      updated: new Date(note.updated ? note.updated.toString() : note.created.toString())
    }));
  }

  __sort(a:NoteModel, b:NoteModel): number{
    if(a.updated.getTime() > b.updated.getTime())
      return -1;
    else if(a.updated.getTime() < b.updated.getTime())
      return 1;
  }

}
