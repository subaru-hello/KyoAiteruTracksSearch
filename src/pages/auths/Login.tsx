import type { FC } from 'react';
import { useContext, useEffect, useState } from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { auth } from 'Firebase';
import { AuthContext } from 'auth/AuthProvider';

const Login: FC = () => {
  const [error, setError] = useState<string>('');
  const [authenticating, setAuthenticating] = useState<boolean>(false);
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  // TODO: Providerで定義する
  useEffect(() => {
    if (isLoggedIn) {
      // TODO: ログインしてくださいのバリデーションをつける
      navigate('/');
    }
  }, [isLoggedIn]);

  // TODO: 認証方式が何かを調べる
  const SignInWithEmailAndPassword = (
    event: React.FormEvent<HTMLFormElement>
  ): void => {
    event.preventDefault();
    if (error !== '') setError('');
    const target = event.target as typeof event.target & {
      email: { value: string };
      password: { value: string };
    };

    const email = target.email.value;
    const password = target.password.value;
    setAuthenticating(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        navigate('/');
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'ログインしました',
          showConfirmButton: false,
          timer: 1000,
        });
      })
      .catch((error) => {
        setAuthenticating(false);
        setError(error.mesasage);
      });
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Emailでログイン</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool{' '}
            <Link color={'blue.400'} to="/">
              features
            </Link>{' '}
            ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <form onSubmit={SignInWithEmailAndPassword}>
              <FormControl id="email">
                <FormLabel>メールアドレス</FormLabel>
                <Input
                  type="email"
                  id="emailSignIn"
                  name="email"
                  placeholder="your@email.com"
                  autoComplete="on"
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>パスワード</FormLabel>
                <Input
                  id="passwordSignIn"
                  name="password"
                  placeholder="password"
                  type="password"
                  autoComplete="on"
                />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}
                >
                  <Checkbox>ログインを維持する</Checkbox>
                  <Link color={'blue.400'} to="/">
                    パスワードをお忘れですか？
                  </Link>
                </Stack>
                <Button
                  bg={'teal.400'}
                  color={'white'}
                  type="submit"
                  _hover={{
                    bg: 'teal.500',
                  }}
                  disabled={authenticating}
                >
                  ログイン
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Login;
