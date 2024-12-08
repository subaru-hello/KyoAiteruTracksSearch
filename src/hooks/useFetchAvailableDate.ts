import axios from 'axios';
import { useEffect } from 'react';
import { useAppDispatch } from './useStore';
import { addAvailableDates } from 'examples/availableDate/availableDateSlice';

export const useFetchAvailableDate = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    // if (!hasFetched) {
    const fetchAvailableDates = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_FIREBASE_AVA_DATES_FUNCTION_URL
        );
        dispatch(addAvailableDates(response.data));
        console.log('Response:', response.data);
      } catch (error) {
        console.error('Error at fetchAvailableDates:', error);
      }
    };
    fetchAvailableDates();
    // }
  }, []);
};
