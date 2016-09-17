import {Injectable} from "angular2/core";
import {Observable} from "rxjs/Observable";
import "rxjs/Rx";

@Injectable()
export class TimeService {
  init(){
    return Observable.interval(1000).map(() => new Date)
      // .map((date) => [date.getFullYear(), date.getMonth()+1, date.getDate(), date.getHours(), date.getMinutes()])
      // .distinctUntilChanged((x, y) => x[4] == y[4]);
      // .map((date) => date)
      .distinctUntilChanged((x, y) => x.getMinutes() == y.getMinutes());
  }
}
