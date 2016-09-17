import {enableProdMode} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {App} from './components/app';
import {ENVIRONMENT} from './environment';

import {
  TimeService,
  NotesService,
  NotesDataService,
  SettingsService
} from 'app/services/index';

import {Store, provideStore} from 'app/library/store/index';
import reducers from 'app/store/index';

const SERVICES = [
  TimeService,
  NotesService,
  NotesDataService,
  SettingsService
];

if(ENVIRONMENT != 'dev')
  enableProdMode();

bootstrap(App, [
  provideStore(reducers, {}, 3),
  ...SERVICES
  ]);
