
import { User } from '../../model/auth';
import { AuthActionTypes } from '../actions/actionTypes';
import { AuthAction } from '../actions/auth.action';


export const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    errorMessage: null
  };
  
export interface AuthState {    
  isAuthenticated: boolean;
  user: User 
  errorMessage: string | null;
}

export function authreducer(state = initialState, action:AuthAction): AuthState {
  switch (action.type) {
  case AuthActionTypes.LOGIN:{
    return{
      ...state
    }
  }

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
