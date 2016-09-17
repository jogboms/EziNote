import {
  Component,
  EventEmitter,
  ViewChild,
  Input,
  Output,
  OnInit,
  AfterViewInit
  } from "angular2/core";

@Component({
  moduleId: module.id,
  selector: 'start',
  templateUrl: './start.html',
  styleUrls: ['./start.css'],
})
export class Start implements OnInit, AfterViewInit {
  @Input() note;
  @Input() user;
  @Output() onChangeEvent = new EventEmitter<string>();
  @ViewChild('input') inputElement;
  limit: number = 3;
  striped: string;


  ngOnInit(){
    // strip HTML content from content
    let f = document.createElement('b');
    f.innerHTML = this.note.content;
    this.striped = f.innerText;
    // this.striped = this.note.content.replace(/(<([^>]+)>)/ig);
  }

  ngAfterViewInit(){
    this.inputElement.nativeElement.focus();
  }

  onKeyUp(e){
    let content = this.inputElement.nativeElement.value.trim();

    if(e.keyCode == 13 && content.length > this.limit){
      this.inputElement.nativeElement.value = "";
      this.onChangeEvent.emit(content);
    }
  }
}
