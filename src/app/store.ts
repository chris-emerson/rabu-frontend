import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import itineraryReducer from '../features/itinerary/itinerarySlice';

const rootReducer = combineReducers({
  itinerary: itineraryReducer
})

export const store = configureStore({
  reducer: rootReducer,
});

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}

export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
