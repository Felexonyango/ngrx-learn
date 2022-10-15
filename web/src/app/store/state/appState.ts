import * as auth from '../reducer/authReducer';

export interface AppState {
  authState: auth.State;
}

export const reducers = {
  auth: auth.reducer
};
