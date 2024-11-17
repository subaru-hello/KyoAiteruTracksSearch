import type { FC } from 'react';
import { Box, Container, chakra, useColorModeValue } from '@chakra-ui/react';
type Props = {
  my?: number | string;
};

const SiteOutline: FC<Props> = ({ my = 0 }) => {
  return (
    <Box textAlign="center">
      <Container mt={8}>
        {/* <Heading lineHeight="tall">
          <Text fontWeight="bold">
            <Highlight
              query="information"
              styles={{ px: '2', py: '1', rounded: 'full', bg: 'yellow.100' }}
            >
            
            </Highlight>
          </Text>
          <Text fontWeight="bold">
            <Highlight
              query="run"
              styles={{ px: '2', py: '1', rounded: 'full', bg: 'yellow.100' }}
            >
              the easier you run
            </Highlight>
          </Text>
        </Heading> */}
        <chakra.h3
          py={2}
          fontSize={48}
          fontFamily={'Work Sans'}
          fontWeight={'bold'}
          color={useColorModeValue('gray.700', 'gray.50')}
        >
          近くの競技場を探す
        </chakra.h3>
      </Container>
    </Box>
  );
};

export default SiteOutline;
