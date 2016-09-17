interface Note {
  id: string;
  title: string;
  content: string;
  created: Date;
  updated: Date;
  date: Date;
  editing: boolean;
  viewing: boolean;
  state: string;
  success: boolean;
  greeting_code: number;
  greeting: string;
  time: string;
}

export class NoteModel implements Note {
  id;
  title = 'EziNote';
  content = "";
  date = new Date();
  created = new Date();
  updated = new Date();
  editing = true;
  viewing = false;
  state = 'am';
  success = false;
  greeting_code = 0;
  greeting = "Morning";
  time = "00:00";

  constructor(args = null) {
    if(typeof args == 'object'){
      Object.assign(this, args);
    }

    this.setDate(this.date);
  }

  setDate(date: Date) {
    this.date = date;

    var hours = date.getHours();
    var minutes = date.getMinutes();
    var _hours = ''+hours, _mins = ''+minutes;

    if(hours >= 12){
      if(hours > 12) hours -= 12;

      this.state = 'pm';
      this.greeting = 'Afternoon';
      this.greeting_code = 1;

      if(hours >= 5){
        this.greeting = 'Evening';
        this.greeting_code = 2;
      }
    }

    if(hours <= 9) _hours = '0'+hours;

    if(minutes <= 9) _mins = '0'+minutes;

    this.time = _hours+':'+_mins;
    return this;
  }
}
