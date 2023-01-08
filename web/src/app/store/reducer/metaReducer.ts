import { StoreModule, ActionReducer, MetaReducer, Action } from '@ngrx/store';
import {reducers} from '../state/appState' 
import { NgModule } from '@angular/core';
import { localStorageSync } from 'ngrx-store-localstorage';
export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({keys: ['token']})(reducer);
}
export const metaReducers: MetaReducer<any>[] = [localStorageSyncReducer];

@NgModule({
  imports: [
    StoreModule.forRoot(reducers, { metaReducers })
  ],
 })
 export class metaReducer {}