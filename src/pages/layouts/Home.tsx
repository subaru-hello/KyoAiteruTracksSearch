import { type FC } from 'react';
import { Box, useColorModeValue, chakra } from '@chakra-ui/react';
import { prefectureData } from 'data';
import { Helmet } from 'react-helmet-async';
import SiteOutline from 'components/organisms/layouts/SiteOutline';
import TrackIndex from 'components/organisms/tracks/TrackIndex';
import HomeComments from 'components/organisms/home/HomeComments';
import HomeCalendar from 'components/organisms/home/HomeCalendar';
import TrackTodayAvailability from 'components/organisms/tracks/TrackTodayAvailability';
const title = '競技場検索';

const Home: FC = () => {
  return (
    <Box fontFamily={'YuMincho'}>
      <Box textAlign={'center'} justifyContent={'space-between'} mx="auto">
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <Box>
          <SiteOutline my={10} />
          <Box
            mx="auto"
            py={8}
            px={4}
            maxW="800px"
            bg={useColorModeValue('white', 'gray.800')}
          >
            <chakra.h3
              py={4}
              fontSize={{ base: 24, md: 28 }}
              fontFamily={'Work Sans'}
              fontWeight={'bold'}
              textAlign={'center'}
              borderBottom="2px solid"
              borderColor={useColorModeValue('teal.500', 'teal.200')}
            >
              新着情報
            </chakra.h3>
            <TrackTodayAvailability />
          </Box>
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
        <HomeCalendar />
      </Box>

      <HomeComments />
    </Box>
  );
};

export default Home;
