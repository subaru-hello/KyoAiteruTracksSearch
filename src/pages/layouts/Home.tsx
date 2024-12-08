import { type FC } from 'react';
import { Box, useColorModeValue, chakra } from '@chakra-ui/react';
import { prefectureData } from 'data';
import { Helmet } from 'react-helmet-async';
import Calender from 'components/organisms/Calender';
import SiteOutline from 'components/organisms/layouts/SiteOutline';
import TrackIndex from 'components/organisms/tracks/TrackIndex';
import { useAppSelector } from 'hooks/useStore';
import { selectAvailableDate } from 'examples/availableDate/availableDateSlice';
import { CommentDoc, commentSnapshot } from 'apis/firebase/comments';
import { buildCommentDocs } from 'utils/trackUtils';
import Comments from 'components/organisms/global/Comments';
import { useFetchTrackAvailabilityJson } from 'hooks/useFetchTrackAvailabilityJson';
import { selectTodayStatiumAvailability } from 'examples/stadiumAvailability/stadiumAvailabilitySlice';
const title = '競技場検索';

const Home: FC = () => {
  useFetchTrackAvailabilityJson();
  const availableDates = useAppSelector(selectAvailableDate);
  // TODO: 汎用性を持たせる
  const todayAvailability = useAppSelector(selectTodayStatiumAvailability);

  // TODO: constantsに寄せる

  // TODO: Reduxに寄せる
  const commentsFilteredByTrackId: CommentDoc[] =
    buildCommentDocs(commentSnapshot);
  console.log('comment', commentsFilteredByTrackId);

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
            // borderWidth={1}
            // borderRadius="lg"
            bg={useColorModeValue('white', 'gray.800')}
            // boxShadow="lg"
          >
            <chakra.h3
              py={4}
              fontSize={{ base: 24, md: 28 }}
              fontFamily={'Work Sans'}
              fontWeight={'bold'}
              textAlign={'center'}
              // color={useColorModeValue('teal.600', 'teal.300')}
              borderBottom="2px solid"
              borderColor={useColorModeValue('teal.500', 'teal.200')}
            >
              新着情報
            </chakra.h3>

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
        <Calender availableDates={availableDates[0]?.availableDates} />
      </Box>

      <Comments comments={commentsFilteredByTrackId} />
    </Box>
  );
};

export default Home;
