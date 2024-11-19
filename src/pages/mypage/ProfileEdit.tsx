import { useContext, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  Center,
  Text,
} from '@chakra-ui/react';
import { AuthContext } from 'auth/AuthProvider';
import { updateProfileImage, updateProfile } from 'apis/firebase/users';
import axios from 'axios';
import { putPresignedUrl } from 'apis/cloudflare/r2';

const ProfileEdit = (): JSX.Element => {
  const { profile, isLoggedIn } = useContext(AuthContext);
  // TODO: 初期値にcontextを入れていいのか確認

  const [formData, setFormData] = useState({ firstName: '', lastName: '' });
  const [image, setImage] = useState<File>();
  const [previewImageUrl, setPreviewImageUrl] = useState<string>('');

  // ログアウトしたらログインページへリダイレクトさせる
  const navigate = useNavigate();
  const refInputFirstName = useRef<HTMLInputElement>(null);
  const refInputLastName = useRef<HTMLInputElement>(null);
  const inputImageRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (isLoggedIn === false) {
      // TODO: ログインしてくださいのバリデーションをつける
      navigate('/login');
    }

    if (isLoggedIn && profile) {
      setFormData({
        firstName: profile.firstName,
        lastName: profile.lastName,
      });
    }
  }, [isLoggedIn, profile]);

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewImageUrl(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (e: any) => {
    // TODO: バリデーション追加
    // - 空白不許可
    // - 必須
    // - 50字以内
    // - 英数漢字かなカナのみ
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const updateUserInfo = async (id: string) => {
    // TODO: 許可する拡張子を決める
    // DBを更新
    try {
      if (image) {
        const bucket: string = import.meta.env
          .VITE_FIREBASE_R2_PROFILE_IMAGE_BUCKET;
        console.log(bucket);
        // 画像名に空白が入っていたら取り除く
        const imageName: string = image.name.split(' ').join('');
        const key: string = `${id}/${imageName}`;
        const uploadUrl: string = await putPresignedUrl(bucket, key, image);
        // R2を更新
        const response = await axios.put(uploadUrl, image, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        // DBを更新
        await updateProfileImage({
          id,
          key,
          name: imageName,
        });
        console.log('===upload result==', response.data);
      }

      await updateProfile({
        id,
        firstName: formData.firstName,
        lastName: formData.lastName,
      });
    } catch (error) {
      console.error('upload failed', error);
    }
  };

  const onClickProfileImage = () => {
    inputImageRef?.current?.click();
  };

  // if (loading) return <Loading />;

  return (
    <Flex
      minH={'100vh'}
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
          プロフィール編集
        </Heading>
        <FormControl id="userName">
          <Stack direction={['column', 'row']} spacing={6}>
            <Center>
              {/* FIXME: もっと綺麗にしたい */}
              <Avatar
                size="xl"
                src={
                  previewImageUrl
                    ? previewImageUrl
                    : profile?.profileImg?.key
                    ? `${import.meta.env.VITE_FIREBASE_R2_URL}/${
                        profile?.profileImg?.key
                      }`
                    : 'https://bit.ly/sage-adebayo'
                }
              ></Avatar>
            </Center>
            <Center w="full"></Center>
          </Stack>
          <Center>
            <button onClick={onClickProfileImage}>画像変更</button>
            <input
              ref={inputImageRef}
              style={{ visibility: 'hidden' }}
              onChange={handleImageChange}
              type="file"
              id="avatar"
              name="avatar"
              accept="image/png, image/jpeg"
            />
          </Center>
        </FormControl>
        <FormControl id="firstName" isRequired>
          <FormLabel>First name</FormLabel>
          <Input
            _placeholder={{ color: 'gray.500' }}
            value={formData.firstName}
            onChange={handleInputChange}
            id="firstName"
            name="firstName"
            type="text"
            ref={refInputFirstName}
          />
        </FormControl>
        <FormControl id="lastName" isRequired>
          <FormLabel>Last name</FormLabel>
          <Input
            value={formData.lastName}
            onChange={handleInputChange}
            _placeholder={{ color: 'gray.500' }}
            id="lastName"
            name="lastName"
            type="text"
            ref={refInputLastName}
          />
        </FormControl>
        <FormLabel>Email</FormLabel>
        <Text>{profile?.email}</Text>
        {/* <FormControl id="email" isRequired>
          <FormLabel>Email address</FormLabel>
          <Input
            placeholder={user.email}
            _placeholder={{ color: 'gray.500' }}
            type="email"
            ref={refInputEmail}
          />
        </FormControl> */}
        {/* <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            placeholder="password"
            _placeholder={{ color: 'gray.500' }}
            type="password"
            ref={refInputPassword}
          />
        </FormControl> */}
        <Stack spacing={6} direction={['column', 'row']}>
          <Button
            bg={'red.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'red.500',
            }}
          >
            キャンセル
          </Button>
          <Button
            bg={'blue.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'blue.500',
            }}
            onClick={() => updateUserInfo(profile?.uid)}
          >
            更新
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
};

export default ProfileEdit;
