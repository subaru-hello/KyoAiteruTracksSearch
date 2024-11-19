import { FC, useContext, useEffect } from 'react';
import {
  Button,
  Flex,
  Heading,
  Stack,
  useColorModeValue,
  Center,
  Container,
  Box,
  Text,
} from '@chakra-ui/react';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { auth } from 'Firebase';
import { AuthContext, useAuthContext } from 'auth/AuthProvider';
import Profile from 'components/organisms/users/Profile';

const ProfileOrganism: FC = () => {
  const { profile } = useAuthContext();
  const { isLoggedIn } = useContext(AuthContext);
  // ログアウトしたらログインページへリダイレクトさせる
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn === false) {
      // TODO: ログインしてくださいのバリデーションをつける
      navigate('/login');
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'ログアウトしました',
          showConfirmButton: false,
          timer: 1000,
        });
        navigate('/login');
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleNavigateEdit = () => {
    navigate('/mypage/edit');
  };

  return (
    <Flex
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
          <Text align={'center'} p={2}>
            基本情報
          </Text>
        </Heading>
        <Box id="userName">
          <Center>
            <Profile image={profile?.profileImg?.key} />
          </Center>
        </Box>
        <Flex id="firstName" justifyContent={'center'}>
          <Text as="b" fontSize="2xl" mx={1}>
            {profile?.firstName}
          </Text>
          <Text as="b" fontSize="2xl" mx={1}>
            {profile?.lastName}
          </Text>
        </Flex>
        <Container id="Email" centerContent={true}>
          <Box>{profile?.email}</Box>
        </Container>
        <Stack spacing={6} direction={['column', 'row']}>
          <Button
            bg={'teal.300'}
            colorScheme="teal"
            color={'white'}
            w={'full'}
            _hover={{
              bg: 'teal.400',
            }}
            onClick={handleNavigateEdit}
          >
            編集
          </Button>
        </Stack>
        <Button
          bg={'red.400'}
          color={'white'}
          w={'full'}
          _hover={{
            bg: 'red.500',
          }}
          onClick={handleLogout}
        >
          ログアウト
        </Button>
      </Stack>
    </Flex>
  );
};

export default ProfileOrganism;
