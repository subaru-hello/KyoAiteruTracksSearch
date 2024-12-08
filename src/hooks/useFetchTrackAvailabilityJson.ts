import axios from 'axios';
import { useEffect } from 'react';
import { useAppDispatch } from './useStore';
import { addHoursToDate, formatToYYYYMMDD } from 'utils/timeUtils';
import {
  addTodayAvailability,
  STADIUM_NAME,
  stadiumKeyToName,
} from 'examples/stadiumAvailability/stadiumAvailabilitySlice';

export const useFetchTrackAvailabilityJson = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    // if (!hasFetched) {
    const _fetchSetagayaJson = async () => {
      try {
        const today = formatToYYYYMMDD(new Date());
        // TODO: 汎用性を持たせる
        const stadiumNameKey = STADIUM_NAME.setagaya; // Enum のキー（"setagaya"）
        const stadiumDisplayName = stadiumKeyToName[stadiumNameKey]; // 日本語名
        console.log('key', stadiumDisplayName, stadiumNameKey);
        const response = await axios.get(
          `${
            import.meta.env.VITE_FIREBASE_R2_URL
          }/${stadiumNameKey}/${today}/availability.json?bucket=nearun`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        if (response.data) {
          // global state に保存
          dispatch(
            addTodayAvailability({
              date: today,
              stadiumName: stadiumDisplayName,
              title: response.data.Title,
              body: response.data.Body,
            })
          );
        }

        console.log('Response:', response.data);
      } catch (error) {
        console.error('Error at fetchAvailableDates:', error);
      }
    };
    _fetchSetagayaJson();
    // }
  }, [dispatch]);
};
