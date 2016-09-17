import {Component, Input, ViewChild, ElementRef} from 'angular2/core';

import {SettingsService} from 'app/services/settings';

@Component({
  moduleId: module.id,
  selector: 'menu-bar',
  templateUrl: 'menubar.html',
  styleUrls: ['./menubar.css'],
})
export class Menubar {
  @Input() user;
  @ViewChild('input') inputElement: ElementRef;
  show_modal = [];
  error = false;

  constructor(private _settings: SettingsService){}

  ngOnInit(){
    this.show_modal['user'] = this.user ? !this.user.length : true;
  }

  onSwitch(e, page){
    this._settings.update({page: page});
    e.preventDefault();
  }

  onModalShow(e, name){
    this.inputElement.nativeElement.focus();
    this.show_modal[name] = true;
    e.preventDefault();
  }

  onModalHide(name){
    this.show_modal[name] = false;
  }

  onModalSave(e){
    var name = this.inputElement.nativeElement.value.trim()

    if(name.length >= 3){
      this.error = false;
      this.onModalHide('user');
      this._settings.update({user: name});
    }
    else {
      this.error = true;
    }

    e.preventDefault()
  }
}
