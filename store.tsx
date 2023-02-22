import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import episodiosReducer from './episodiosSlice';

export const store = configureStore({
  reducer: {
    episodios: episodiosReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
