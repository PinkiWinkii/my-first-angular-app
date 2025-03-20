import { createReducer, on } from "@ngrx/store";
import { clearUser, setUser } from "./user.actions";

export interface User {
    id: number;
    name: string;
    email: string;
}

export interface UserState {
    user: User | null;
}

export const initialUserState: UserState = {
  user: null,
};

export const userReducer = createReducer(
  initialUserState,
  on(setUser, (state, {user}) => {
    console.log('setUser action dispatched, user:', user);  // Aquí puedes ver qué usuario se está asignando
    return {...state, user};
  }),
  on(clearUser, (state) => {
    console.log('clearUser action dispatched');
    return {...state, user: null};
  }),
);
