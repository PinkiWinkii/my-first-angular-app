// src/app/store/counter.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { increment, decrement } from './counter.actions';

// Estado inicial
export interface State {
  count: number;
}

export const initialState: State = {
  count: 0
};

// Reducer que maneja las acciones
export const counterReducer = createReducer(
  initialState,
  on(increment, (state) => {
    console.log('Increment action triggered. Previous state:', state);
    const newState = { ...state, count: state.count + 1 };
    console.log('New state after increment:', newState);
    return newState;
  }),
  on(decrement, (state) => {
    console.log('Decrement action triggered. Previous state:', state);
    const newState = { ...state, count: state.count - 1 };
    console.log('New state after decrement:', newState);
    return newState;
  })
);
