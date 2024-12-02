import { CommentDoc } from 'apis/firebase/comments';
import { DocumentData } from 'firebase/firestore';

export const buildCommentDocs = (
  comments: DocumentData[],
  track_id: string = 'nissan'
): CommentDoc[] =>
  comments
    .map((comment) => {
      return {
        body: comment?.body,
        timestamp: comment?.timestamp,
        title: comment?.title,
        track_id: comment?.track_id,
        user_id: comment?.user_id,
      };
    })
    .filter((comment) => comment.track_id === track_id)
    .sort((a, b) => a?.timestamp?.seconds - b?.timestamp?.seconds);
