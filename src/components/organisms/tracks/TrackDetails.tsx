import { useContext, useState } from 'react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import {
  Box,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  List,
  ListItem,
} from '@chakra-ui/react';
// import axios from 'axios';
import { trackData } from 'data';
import { useEffect } from 'preact/hooks';
import { useParams } from 'react-router-dom';
import { AuthContext } from 'auth/AuthProvider';
import TrackComment from './TrackComment';
import R2Image from '../global/R2Image';

type Props = {
  prefecture_name: string;
};

function TrackDetails({ prefecture_name }: Props) {
  const { trackID = '' } = useParams();
  const [userId, setUserId] = useState('');
  // const [resp, setresp] = useState();
  const trackDetail = trackData.filter((track) => track.id === trackID);
  const { currentUser } = useContext(AuthContext);

  const userHook = async () => {
    useEffect(() => {
      if (currentUser) {
        setUserId(currentUser.uid);
      } else {
        setUserId('subaru');
      }
    }, []);
  };
  userHook;

  return (
    <Box>
      {trackDetail.map((track) => (
        <SimpleGrid key={track.id}>
          <Flex justifyContent="center">
            <R2Image src="base_track.png" />
          </Flex>
          <Stack spacing={{ base: 6, md: 10 }}>
            <Box as={'header'}>
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}
              >
                {track.name}
              </Heading>
              <Text
                color={useColorModeValue('gray.900', 'gray.400')}
                fontWeight={300}
                fontSize={'2xl'}
              >
                {prefecture_name}
              </Text>
            </Box>

            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={'column'}
              divider={
                <StackDivider
                  borderColor={useColorModeValue('gray.200', 'gray.600')}
                />
              }
            >
              <VStack spacing={{ base: 4, sm: 6 }}>
                <Text
                  color={useColorModeValue('gray.500', 'gray.400')}
                  fontSize={'2xl'}
                  fontWeight={'300'}
                >
                  歴史ある競技場
                </Text>
                <Text fontSize={'lg'}>詳細</Text>
              </VStack>
              <Box>
                <Text
                  fontSize={{ base: '16px', lg: '18px' }}
                  color={useColorModeValue('yellow.500', 'yellow.300')}
                  fontWeight={'500'}
                  textTransform={'uppercase'}
                  mb={'4'}
                >
                  特徴
                </Text>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                  <List spacing={2}>
                    <ListItem>ハードル可(木製)</ListItem>
                    <ListItem>400mトラック</ListItem>{' '}
                    <ListItem>高速タータン</ListItem>
                  </List>
                  <List spacing={2}>
                    <ListItem>個人利用可</ListItem>
                    <ListItem>砲丸・幅跳び可</ListItem>
                    <ListItem>Small seconds</ListItem>
                  </List>
                </SimpleGrid>
              </Box>
              <Box>
                <Text
                  // fontSize={{ base: '16px', lg: '18px' }}
                  color={useColorModeValue('yellow.500', 'yellow.300')}
                  fontWeight={'500'}
                  textTransform={'uppercase'}
                  mb={'4'}
                >
                  詳細情報
                </Text>

                <List spacing={2}>
                  <ListItem>
                    <Text as={'span'} fontWeight={'bold'}>
                      場所:
                    </Text>{' '}
                    {track.address}
                  </ListItem>
                  <ListItem>
                    <Text as={'span'} fontWeight={'bold'}>
                      個人解放時間:
                    </Text>{' '}
                    {track.open_hour}
                  </ListItem>
                  <ListItem>
                    <Text as={'span'} fontWeight={'bold'}>
                      利用料金
                    </Text>{' '}
                    {track.entrance_fee}
                  </ListItem>
                  <ListItem>
                    <Text as={'span'} fontWeight={'bold'}>
                      サイトURL:
                    </Text>{' '}
                    <a href={track.site_url} target="_blank" rel="noreferrer">
                      サイトURL: {track.site_url}
                      <ExternalLinkIcon mx="2px" />
                    </a>
                  </ListItem>
                </List>
              </Box>
            </Stack>

            <Button
              rounded={'none'}
              // w={'full'}
              // mt={8}
              // size={'lg'}
              // py={'7'}
              bg={useColorModeValue('gray.900', 'gray.50')}
              color={useColorModeValue('white', 'gray.900')}
              textTransform={'uppercase'}
              _hover={{
                transform: 'translateY(2px)',
                boxShadow: 'lg',
              }}
            >
              お気に入りに登録
            </Button>
          </Stack>
          <TrackComment track_id={track.id} user_id={userId} />
        </SimpleGrid>
      ))}
    </Box>
  );
}

export default TrackDetails;
