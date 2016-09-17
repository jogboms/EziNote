import {
  Component,
  EventEmitter,
  Input,
  Output,
  AfterViewInit,
  OnInit,
  OnDestroy} from "angular2/core";
import {Observable} from "rxjs/Observable";
import "rxjs/Rx";

import {NoteModel} from 'app/models/note';

import {NotesService} from 'app/services/notes';

declare var $;

@Component({
  moduleId: module.id,
  selector: 'note',
  templateUrl: './note.html',
  styleUrls: ['./note.css'],
})
export class Note implements AfterViewInit, OnInit, OnDestroy {
  @Input() user;
  @Input() note: NoteModel;
  @Output() onChangeEvent = new EventEmitter<NoteModel>();
  private summernote;
  success = false;
  __subscription;

  constructor(private _notes: NotesService){}

  onKeyUp(t, c){
    if(t !== null)
      this.note.title = t.value.trim();

    if(typeof c == 'string')
      this.note.content = c.trim();

    this.onChangeEvent.emit(this.note)
  }

  onSave(){
    this.success = true;

    if(this.note.id){
      this._notes.edit(this.note.id, this.note)
    }
    else {
      this._notes.create(this.note);
    }

    setTimeout(() => this.success = false, 5000)
  }

  onViewNote(e){
    this.note.viewing = !(this.note.editing = false);

    e.preventDefault()
  }

  onEditNote(e){
    this.note.viewing = !(this.note.editing = true);

    e.preventDefault()
  }

  ngOnInit(){
    this.note = Object.assign({editing: true, viewing: false}, this.note) as NoteModel;
  }

  ngAfterViewInit(){
    this.summernote = $("#summernote").summernote({focus: true})

    this.__subscription = Observable.fromEvent(document.getElementsByClassName('note-editable'), 'keyup')
       .map((x:Event) => x.currentTarget as HTMLElement)
       .map(x => x.innerHTML)
       .debounce(() => Observable.timer(750))
       .subscribe(x => this.onKeyUp(null, x));
  }

  ngOnDestroy(){
    this.__subscription.unsubscribe();
  }
}
