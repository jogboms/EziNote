import {Component, Input, ChangeDetectionStrategy} from "angular2/core";

import {SettingsService} from 'app/services/settings';
import {NoteModel} from 'app/models/note';

@Component({
  moduleId: module.id,
  selector: 'card-item',
  templateUrl: './card.html',
  styleUrls: ['./card.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardItem {
  @Input() note: NoteModel;
  @Input() state: boolean = true;

  constructor(private _settings: SettingsService){}

  onPreview(e){
    this._settings.update({
      page: 'preview',
      note: Object.assign({}, this.note, {editing: false, viewing: true}) as NoteModel
    });
    e.preventDefault();
  }
}


@Component({
  selector: 'card',
  template: `<card-item [note]="note" [state]="state" class="item col-md-{{ !state ? '6' : '3 col-xs-6' }}"></card-item>`,
  styles: [`
    .item {
      display: block;
      transition: all .5s ease-in-out;
    }
  `],
  directives: [CardItem],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Card {
  @Input() note: NoteModel;
  @Input() state: boolean = true;
}
