import { type FC } from 'react';
import { Box, useColorModeValue, chakra } from '@chakra-ui/react';
import { prefectureData } from 'data';
import { Helmet } from 'react-helmet-async';
import { AmazonBanner } from 'components/atoms/AmazonBanner';
import Calender from 'components/organisms/Calender';
import SiteOutline from 'components/organisms/layouts/SiteOutline';
import WithSpeechBubbles from 'components/organisms/layouts/Testimonial';
import TrackIndex from 'components/organisms/tracks/TrackIndex';
import { useFetchAvailableDate } from 'hooks/useFetchAvailableDate';
import { useAppSelector } from 'hooks/useStore';
import { selectAvailableDate } from 'examples/availableDate/availableDateSlice';
import axios from 'axios';
const title = '競技場検索';

const Home: FC = () => {
  useFetchAvailableDate();
  const availableDates = useAppSelector(selectAvailableDate);
  const fetchTrackDetail = async (trackId: string) => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_FIREBASE_TRACK_DETAIL_FUNCTION_URL,
        {
          trackId: trackId,
        }
      );
      return response.data; // or handle response as needed
    } catch (error) {
      console.error('Error fetching track detail:', error);
      // Handle error appropriately
    }
  };

  return (
    <Box fontFamily={'YuMincho'}>
      <Box textAlign={'center'} justifyContent={'space-between'} mx="auto">
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <Box>
          <SiteOutline my={10} />
          <TrackIndex prefectures={prefectureData} />
        </Box>
      </Box>
      <Box textAlign={'center'} w="75%" mx="auto">
        <chakra.h3
          py={5}
          fontSize={20}
          fontFamily={'Work Sans'}
          fontWeight={'bold'}
          color={useColorModeValue('gray.700', 'gray.50')}
        >
          現在の個人開放状況
        </chakra.h3>
        <Calender availableDates={availableDates[0]?.availableDates} />
      </Box>
      <WithSpeechBubbles />
      <AmazonBanner />
    </Box>
  );
};

export default Home;
