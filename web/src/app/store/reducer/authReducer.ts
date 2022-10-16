
import { User } from '../../model/auth';
import { AuthActionTypes } from '../actions/actionTypes';
import { All } from '../actions/auth.action';


export const initialState: State = {
    isAuthenticated: false,
    user: null,
    errorMessage: null
  };
  
export interface State {    
  isAuthenticated: boolean;
  user: User 
  errorMessage: string | null;
}

export function reducer(state = initialState, action: All): State {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: {
        
          email: action.payload.email
        },
        errorMessage: null
      };
    }
    case AuthActionTypes.LOGOUT: {
      return initialState;
    }
    
    default: {
      return state;
    }
  }
}
