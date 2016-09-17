import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/distinctUntilChanged';

/**
 * Initial initializer Action for All Reducer functions within the Store
 * @type {String}
 */
export const INIT_ACTION = 'INIT_ACTION';

/**
 * States of state for the Store
 * @type {Object}
 */
export type States = {[name: string]: any};
/**
 * Action-type for Reducer
 */
export interface Action {
  type: string;
  payload?: any;
}
/**
 * Reducer-type function
 * @type {any}
 */
export type Reducer<T> = (state: T, action: Action) => T;

/**
 * Helper function Factory to create a Store
 * @param reducers
 * @param initialStates
 * @param debug
 */
export const __createStore = (
    reducers: {[name: string] : Reducer<any>},
    initialStates: States = {},
    debug: number = 3
  ) => new Store(reducers, initialStates, debug);

export class Store<T> extends BehaviorSubject<T> {
  /**
   * An Object of Reducers in the Store
   */
  private reducers: {[name: string]: BehaviorSubject<any>} = {};
  /**
   * Debug mode of the store
   * @type {number}
   */
  private debug: number;

  /**
   * Create a new Store of States
   * @param {{[name: string]: Reducer<any>}} reducers Object containing Reducer name and Reducer function
   * @param {T} initialStates Initial States to pass into the Store
   * @param {number = 3} debug Select debug mode. 0, 1, 2 or 3
   */
  constructor(reducers: {[name: string]: Reducer<any>}, initialStates: T, debug: number = 3) {
    super(initialStates);
    this.debug = debug;
    if(reducers){
      this.reducers = Object.keys(reducers).reduce((p, n) => {
        const reducer = reducers[n];
        if(typeof reducer === 'function'){
          const initialState = initialStates.hasOwnProperty(n) ? initialStates[n]: undefined;
          p[n] = new BehaviorSubject<any>(reducer(initialState, {type: INIT_ACTION}));

          p[n].scan(reducer).distinctUntilChanged()
            .subscribe(s => super.next(Object.assign({}, this.state, {[n]: s})));
        }
        return p;
      }, this.reducers);
    }
  }

  /**
   * Get a stream of a particular state
   * @param  {string} name Name of state provided at initialization
   * @return {Observable<any>} Stream of reducer state when new Actions are dispatched
   */
  select(name: string): Observable<any>{
    return this.map(states => states[name]).distinctUntilChanged();
  }

  /**
   * Get all States within the Store
   * @return {T} States Object
   */
  get state(): T {
    return this.value;
  }

  /**
   * Dispatch action to the Store's reducers
   * @param {Action} action Action object to dispatch
   */
  dispatch(action: Action){
    switch (this.debug) {
      case 3:
        console.trace('%c'+action.type, 'color:green', action.payload, this.state);
        break;
      case 2:
        console.trace('%c'+action.type, 'color:green', action.payload);
        break;
      case 1:
        console.trace('%c'+action.type, 'color:green');
        break;
    }
    Object.keys(this.reducers).forEach(n => this.reducers[n].next(action));
  }
}
