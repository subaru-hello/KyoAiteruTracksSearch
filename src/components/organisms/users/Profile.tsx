import { FC } from 'react';
import { isLocal } from 'utils/urlUtils';
import { Avatar } from '@chakra-ui/react';

const Profile: FC<{ image: string }> = ({ image }) => {
  // TODO: NODE_ENVを使ってローカルか判断する
  const displaySrc = `${import.meta.env.VITE_FIREBASE_R2_URL}/${image}`;
  return (
    <>
      <Avatar src={displaySrc} />
    </>
  );
};

export default Profile;
