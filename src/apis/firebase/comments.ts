import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from 'Firebase';
import { DocumentData, Timestamp } from 'firebase-admin/firestore';
export type CommentDoc = {
  body: string;
  timestamp: Timestamp;
  title: string;
  track_id: string;
  user_id: string;
};

const docCommentRef = collection(db, 'comments');
const querySnapshot = await getDocs(docCommentRef);
export const commentSnapshot: DocumentData[] = querySnapshot.docs.map((doc) =>
  doc.data()
);

// Firestoreからコメントを取得（最新順）
export const fetchComments = async (): Promise<DocumentData[]> => {
  const querySnapshot = await getDocs(
    query(docCommentRef) // TODO: 最新順に並べる
  );
  console.log('最新===', querySnapshot);
  return querySnapshot.docs.map((doc) => doc.data());
};

export const addCommentDoc = async (
  title: string,
  body: string,
  user_id: string,
  track_id: string
) => {
  await addDoc(docCommentRef, {
    title,
    body,
    user_id,
    track_id,
    timpstamp: serverTimestamp(),
  });
};
