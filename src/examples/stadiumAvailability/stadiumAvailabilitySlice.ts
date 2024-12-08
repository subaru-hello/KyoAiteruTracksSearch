import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';

export enum STADIUM_NAME {
  setagaya = 'setagaya',
}

export const stadiumKeyToName: Record<STADIUM_NAME, string> = {
  [STADIUM_NAME.setagaya]: '世田谷総合運動公園',
};

export interface IStadiumAvailability {
  stadiumName: string;
  title: string;
  body: string;
  date: string;
}

export interface IStadiumState {
  availabilities: IStadiumAvailability[];
  todayAvailability: IStadiumAvailability | undefined;
}

const initialState: IStadiumState = {
  availabilities: [],
  todayAvailability: undefined,
};

// 各種競技場の個人利用空き情報を操作
export const stadiumAvailabilitySlice = createSlice({
  name: 'stadiumAvailability',
  initialState,
  reducers: {
    addAvailabilities: (
      state,
      action: PayloadAction<IStadiumAvailability[]>
    ) => {
      state.availabilities = action.payload;
    },
    addTodayAvailability: (
      state,
      action: PayloadAction<IStadiumAvailability>
    ) => {
      state.todayAvailability = action.payload;
    },
    clearAvailability: (state) => {
      state.availabilities = [];
    },
  },
});

export const { addAvailabilities, addTodayAvailability, clearAvailability } =
  stadiumAvailabilitySlice.actions;

// セレクター
export const selectStatiumAvailability = (state: RootState) =>
  state.stadiumAvailability.availabilities;

export const selectTodayStatiumAvailability = (state: RootState) =>
  state.stadiumAvailability.todayAvailability;

export default stadiumAvailabilitySlice.reducer;
