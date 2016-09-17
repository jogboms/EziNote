import {provide} from "angular2/core";
import {Store, States, Reducer, __createStore} from './store';

/**
 * Provider function for Angular2
 */
export const provideStore = (reducers: {[name: string] : Reducer<any>}, initialStates: States = {}, debug: number = 3) => {
  return [
    provide('DEBUG', {useValue: debug}),
    provide('INITIAL_STATES', {useValue: initialStates}),
    provide('REDUCERS', {useValue: reducers}),
    provide(Store, {useFactory: __createStore, deps: ['REDUCERS', 'INITIAL_STATES', 'DEBUG']}),
  ]
};

export * from './store';
