import React from 'react';
import { Box, chakra, useColorModeValue } from '@chakra-ui/react';
import { selectTodayStatiumAvailability } from 'examples/stadiumAvailability/stadiumAvailabilitySlice';
import { useFetchTrackAvailabilityJson } from 'hooks/useFetchTrackAvailabilityJson';
import { useAppSelector } from 'hooks/useStore';

const TrackTodayAvailability = () => {
  useFetchTrackAvailabilityJson();
  // TODO: 他の競技場にも適用できるよう、汎用性を持たせる
  const todayAvailability = useAppSelector(selectTodayStatiumAvailability);
  return (
    <Box mt={6} textAlign={'left'}>
      {todayAvailability ? (
        <div>
          <small
            style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '14px',
              color: useColorModeValue('gray.600', 'gray.400'),
            }}
          >
            {todayAvailability.date} - {todayAvailability.stadiumName}
          </small>
          <chakra.h2
            fontSize={{ base: 20, md: 22 }}
            fontWeight="bold"
            color={useColorModeValue('gray.700', 'gray.50')}
            mb={4}
          >
            {todayAvailability.title}
          </chakra.h2>
          <chakra.p
            fontSize={{ base: 16, md: 18 }}
            lineHeight="1.8"
            color={useColorModeValue('gray.600', 'gray.300')}
          >
            {todayAvailability.body}
          </chakra.p>
        </div>
      ) : (
        <chakra.p
          fontSize={{ base: 16, md: 18 }}
          textAlign="center"
          color={useColorModeValue('red.600', 'red.300')}
          mt={4}
        >
          本日空いている競技場はありませんでした
        </chakra.p>
      )}
    </Box>
  );
};

export default TrackTodayAvailability;
