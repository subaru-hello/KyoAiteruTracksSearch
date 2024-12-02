import React from 'react';
import {
  Box,
  Heading,
  Stack,
  Container,
  SimpleGrid,
  useColorModeValue,
} from '@chakra-ui/react';
import { Comment } from './Comment';
import { CommentDoc } from 'apis/firebase/comments';

type TComment = {
  comments: CommentDoc[];
};

const Comments = ({ comments }: TComment) => {
  return (
    <Box
      bg={useColorModeValue('gray.100', 'gray.700')}
      borderRadius="lg"
      my={2}
    >
      <Container maxW={'7xl'} py={16} as={Stack} spacing={12}>
        <Stack spacing={0} align={'center'}>
          <Heading>利用者の声</Heading>
        </Stack>
        <Stack
          direction={{ base: 'column' }}
          spacing={{ base: 10, md: 4, lg: 10 }}
        >
          <SimpleGrid columns={{ sm: 2, md: 1 }}>
            {comments.map((comment, idx) => (
              <Box key={idx} alignContent={'center'} my={6}>
                <Comment title={comment.title} body={comment.body} />
              </Box>
            ))}
          </SimpleGrid>
        </Stack>
      </Container>
    </Box>
  );
};

export default Comments;
