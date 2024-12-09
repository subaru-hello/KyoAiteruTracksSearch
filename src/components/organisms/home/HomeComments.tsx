import React from 'react';
import Comments from '../global/Comments';
import { buildCommentDocs } from 'utils/trackUtils';
import { CommentDoc, commentSnapshot } from 'apis/firebase/comments';
const HomeComments = () => {
  const commentsFilteredByTrackId: CommentDoc[] =
    buildCommentDocs(commentSnapshot);
  return <Comments comments={commentsFilteredByTrackId} />;
};

export default HomeComments;
