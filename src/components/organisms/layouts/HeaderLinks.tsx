import { FC, useState, useEffect, useContext } from 'react';
// import escapeStringRegexp from 'escape-string-regexp';
import { HamburgerIcon } from '@chakra-ui/icons';
import {
  Box,
  Stack,
  Heading,
  Flex,
  useDisclosure,
  Center,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { auth } from 'Firebase';
import Profile from '../users/Profile';
import { AuthContext } from 'auth/AuthProvider';

const HeaderLinks: FC = (props) => {
  const { profile, isLoggedIn } = useContext(AuthContext);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleToggle = () => (isOpen ? onClose() : onOpen());
  // ログイン状態を確認する

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={6}
      bg="teal.500"
      color="white"
      {...props}
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={'tighter'}>
          <Link to="/">ニアラン</Link>
        </Heading>
      </Flex>
      <Flex align="center" mr={5} gap={12}>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          display={{ base: 'block', md: 'flex' }}
          width={{ base: 'full', md: 'auto' }}
          alignItems="left"
          flexGrow={1}
          pr={4}
          // mt={{ base: 4, md: 0 }}
        >
          {isLoggedIn ? (
            <Link to="mypage">
              <Profile image={profile?.profileImg?.key} />
            </Link>
          ) : (
            <>
              <Flex display={'flex'} gap={8}>
                <Link to="signup">アカウント登録</Link>
                <Link to="login">ログイン</Link>
              </Flex>
            </>
          )}
        </Stack>

        <Box display={{ base: 'block', md: 'none' }} onClick={handleToggle}>
          <HamburgerIcon />
        </Box>
      </Flex>

      <Stack
        direction={{ base: 'column', md: 'row' }}
        display={{ base: isOpen ? 'flex' : 'none', md: 'flex' }}
        width={{ base: 'full', md: 'auto' }}
        justifyContent={'right'}
        alignItems="right"
        flexGrow={1}
        p={4}
        mt={{ base: 4, md: 0 }}
      >
        {/* <Link to="/tracks/kanagawa/calender">個人開放状況</Link> */}
        <Link to="/tracks">競技場一覧</Link>
        {/* <Search2Icon />
        <Input
          htmlSize={30}
          width="auto"
          type="text"
          placeholder="競技場名を入れて下さい"
        /> */}
      </Stack>
    </Flex>
  );
};

export default HeaderLinks;
