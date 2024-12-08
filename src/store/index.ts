import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../examples/counter/counterSlice';
import availableDateReducer from '../examples/availableDate/availableDateSlice';
import stadiumAvailabilityReducer from '../examples/stadiumAvailability/stadiumAvailabilitySlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    availableDates: availableDateReducer,
    stadiumAvailability: stadiumAvailabilityReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
