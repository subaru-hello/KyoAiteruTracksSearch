import React, { ReactNode } from 'react';
import {
  Box,
  chakra,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
  Image,
} from '@chakra-ui/react';
import iine from 'assets/iine.svg';
// import { FaInstagram, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

// const Logo = () => {
//   return (
//     <>
//       <Image boxSize="3%" objectFit="cover" src={iine} />
//     </>
//   );
// };

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

const SmallCentered: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <Box as={Stack} justify={'center'} align={'center'}>
        {/* <Logo /> */}
        <Stack direction={'row'} fontSize={{ md: '10px' }}>
          <StyledLink to="/">ホーム</StyledLink>
          <StyledLink to="tracks">競技場一覧</StyledLink>
          <StyledLink to="tracks/kanagawa/calendar">
            個人開放状況（神奈川）
          </StyledLink>
        </Stack>
      </Box>

      <StyledText>
        © {currentYear} TrackPublicDB. All rights reserved
      </StyledText>
      <Stack direction={'row'} spacing={6} justifyContent={{ base: 'center' }}>
        <SocialButton label={'X'} href={'https://x.com'}>
          <FaXTwitter />
        </SocialButton>
        {/* <SocialButton label={'YouTube'} href={'#'}>
          <FaYoutube />
        </SocialButton> */}
        {/* <SocialButton label={'Instagram'} href={'#'}>
          <FaInstagram />
        </SocialButton> */}
      </Stack>
    </>
  );
};

export default SmallCentered;

const StyledLink = styled(Link)`
  font-size: 16px;
  @media (max-width: 768px) {
    font-size: 10px;
  }
`;

const StyledText = styled(Text)`
  font-size: 16px;
  text-align: center;
  @media (max-width: 768px) {
    font-size: 10px;
  }
`;
