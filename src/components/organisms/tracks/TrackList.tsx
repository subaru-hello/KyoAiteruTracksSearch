import React, { FC, useState } from 'react';
import { Search2Icon } from '@chakra-ui/icons';
import {
  Box,
  Heading,
  Image,
  Text,
  HStack,
  Tag,
  SpaceProps,
  useColorModeValue,
  Container,
  Input,
  Flex,
} from '@chakra-ui/react';
import trackImage from 'assets/base_track.png';
import type { Track } from 'domains';
import escapeStringRegexp from 'escape-string-regexp';
import { Link } from 'react-router-dom';

type Props = {
  tracks: Track[];
  color?: string;
  isLoading?: boolean;
};

interface ITrackTags {
  tags: string[];
  marginTop?: SpaceProps['marginTop'];
}

const FeatureTags: FC<ITrackTags> = (props) => {
  return (
    <HStack spacing={2} marginTop={props.marginTop}>
      {props.tags.map((tag) => {
        return (
          <Tag size={'md'} variant="solid" colorScheme="orange" key={tag}>
            {tag}
          </Tag>
        );
      })}
    </HStack>
  );
};

interface CommenterProps {
  date: Date;
  name: string;
}

const CheckLocationAndCreateLink = (track: Track) => (
  <>
    {window.location.href.includes(track.prefectureID) ? (
      <Link to={track.id} style={{ cursor: 'pointer' }}>
        {track.name}
      </Link>
    ) : (
      <Link
        to={track.prefectureID + '/' + track.id}
        style={{ cursor: 'pointer' }}
      >
        {track.name}
      </Link>
    )}
  </>
);

export const CommentCommenter: React.FC<CommenterProps> = (props) => {
  return (
    <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
      <Image
        borderRadius="full"
        boxSize="40px"
        src="https://100k-faces.glitch.me/random-image"
        alt={`Avatar of ${props.name}`}
      />
      <Text fontWeight="medium">{props.name}</Text>
      <Text>—</Text>
      <Text>{props.date.toLocaleDateString()}</Text>
    </HStack>
  );
};

const TrackList: FC<Props> = ({ tracks = [] }) => {
  const [searchKeyword, updateSearchKeyword] = useState('');

  // 入力イベントに反応してStateを更新する
  const onInput = (event: React.FormEvent<HTMLInputElement>) => {
    // 入力キーワードをstateに格納する
    updateSearchKeyword(event.currentTarget.value);
  };

  const filteredTracks = tracks.filter((item) => {
    // ユーザー入力を安全に正規表現にする（このときすべて小文字化で正規化する）
    const escapedText = escapeStringRegexp(searchKeyword.toLowerCase());

    // 小文字で比較して部分一致するものだけを残す
    return new RegExp(escapedText).test(item.furigana.toLowerCase());
  });

  return (
    <Container p="12">
      <Heading as="h1">競技場一覧</Heading>
      <Flex
        direction={{ base: 'row' }}
        width={{ base: 'full' }}
        alignItems="center"
        gap={'8'}
        mt={{ base: 4, md: 0 }}
      >
        <Search2Icon />
        <Input
          type="text"
          onInput={onInput}
          placeholder="競技場名を入れて下さい"
        />
      </Flex>
      {filteredTracks.map((track) => (
        <Box
          marginTop={{ base: '1', sm: '5' }}
          display="flex"
          flexDirection={{ base: 'column', sm: 'row' }}
          justifyContent="space-between"
          key={track.id}
        >
          <Box
            display="flex"
            flex="1"
            marginRight="3"
            position="relative"
            alignItems="center"
          >
            <Box
              width={{ base: '100%', sm: '85%' }}
              zIndex="2"
              marginLeft={{ base: '0', sm: '5%' }}
              marginTop="5%"
            >
              <Image
                borderRadius="lg"
                src={trackImage}
                alt="some good alt text"
                objectFit="contain"
              />
            </Box>
            <Box zIndex="1" width="100%" position="absolute" height="100%">
              <Box
                bgGradient={useColorModeValue(
                  'radial(orange.600 1px, transparent 1px)',
                  'radial(orange.300 1px, transparent 1px)'
                )}
                backgroundSize="20px 20px"
                opacity="0.4"
                height="100%"
              />
            </Box>
          </Box>
          <Box
            display="flex"
            flex="1"
            flexDirection="column"
            justifyContent="center"
            marginTop={{ base: '3', sm: '0' }}
          >
            <FeatureTags tags={[track.prefectureID, 'ハードル可']} />
            {/* <Heading marginTop="1">{track.name}</Heading> */}

            <Text size={'md'}>{CheckLocationAndCreateLink(track)}</Text>
          </Box>
        </Box>
      ))}
    </Container>
  );
};

export default TrackList;
