import { FC, SyntheticEvent, useState } from 'react';
import {
  Image,
  Box,
  Text,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Button,
  HStack,
} from '@chakra-ui/react';
import {
  addCommentDoc,
  CommentDoc,
  commentSnapshot,
  fetchComments,
} from 'apis/firebase/comments';
import Swal from 'sweetalert2';
import { DocumentData } from 'firebase-admin/firestore';
import Comments from '../global/Comments';
import { buildCommentDocs } from 'utils/trackUtils';

// Commentした人コンポーネント
interface BlogAuthorProps {
  date: Date;
  name: string;
}

export const BlogAuthor: React.FC<BlogAuthorProps> = (props) => {
  return (
    <HStack display="flex" alignItems="center">
      {/* 投稿者のimageに変える */}
      <Image
        // borderRadius="full"
        // boxSize="40px"
        src="https://100k-faces.glitch.me/random-image"
        alt={`Avatar of ${props.name}`}
      />
      <Text fontWeight="medium">{props.name}</Text>
      <Text>—</Text>
      <Text>{props.date.toLocaleDateString()}</Text>
    </HStack>
  );
};

interface ITrackCommentList {
  title: string;
  body: string;
}

export const TrackCommentList: FC<ITrackCommentList> = (props) => {
  return (
    <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
      <Text boxSize={10}>title</Text>
      <Box>{props.title}</Box>
      <Text boxSize={10}>body</Text>
      <Box>{props.body}</Box>
      <BlogAuthor name="subaru" date={new Date('2022-04-06T19:01:27Z')} />
    </HStack>
  );
};

interface IFirebaseProps {
  track_id: string;
  user_id: string;
}

const TrackCommentForm: FC<IFirebaseProps> = (props) => {
  const commentsFilteredByTrackId: CommentDoc[] = buildCommentDocs(
    commentSnapshot,
    props.track_id
  );

  const [comments, setComments] = useState(commentsFilteredByTrackId);

  // あるユーザーがコメントを作成する
  const handleSubmitAddComment = async (
    event: SyntheticEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      title: { value: string };
      body: { value: string };
    };
    await addCommentDoc(
      target.title.value,
      target.body.value,
      props.user_id,
      props.track_id
    );
    const updatedComments = await fetchComments();
    console.log('最新のコメント:', updatedComments);

    Swal.fire({
      position: 'top',
      icon: 'success',
      title: 'コメントを追加しました',
      showConfirmButton: false,
      timer: 1000,
    });
    setComments(buildCommentDocs(updatedComments, props.track_id));
  };

  // あるユーザーのコメントを削除する

  // あるユーザーのコメントを更新する

  return (
    <Box>
      <Comments comments={comments} />
      <Heading>使用した感想を書こう</Heading>
      <form onSubmit={handleSubmitAddComment}>
        <FormControl>
          <FormLabel>題名</FormLabel>
          <Input name="title" type="text" placeholder="久しぶりの..." />
        </FormControl>
        <FormControl>
          <FormLabel>内容</FormLabel>
          <Input
            name="body"
            type="text"
            placeholder="いい気分で走れた！いい施設！"
          />
        </FormControl>
        {/* <div>
          <ShoesImages />
        </div> */}

        <div>
          <Button type="submit">投稿</Button>
        </div>
      </form>
    </Box>
  );
};

export default TrackCommentForm;
