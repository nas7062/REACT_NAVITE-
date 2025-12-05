import {
  addDoc,
  collection,
  serverTimestamp,
  getDoc,
  doc,
  updateDoc,
  increment,
  arrayUnion,
  query,
  orderBy,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/firebase";
import { Comment, CreateCommentDto, User } from "@/types";
import { getAuth } from "firebase/auth";

export async function CreateComment(body: CreateCommentDto): Promise<Comment> {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error("로그인된 사용자가 없습니다.");
  }

  // 1) 댓글 작성자 정보 구성
  const user: User = {
    id: currentUser.uid,
    displayName:
      body.profile.displayName ??
      currentUser.displayName ??
      "알 수 없는 사용자",
    imageUri: body.profile.imageUri ?? currentUser.photoURL ?? "",
  };

  const numberId = Date.now();

  const commentDocRef = await addDoc(
    collection(db, "posts", body.docId, "comments"),
    {
      id: numberId,
      content: body.content,
      createdAt: serverTimestamp(),
      user,
      isDeleted: false,
    }
  );

  // 3) serverTimestamp를 실제 값으로 받기 위해 다시 스냅샷 조회
  const snap = await getDoc(commentDocRef);
  const data = snap.data();

  const createdAtString =
    data?.createdAt?.toDate().toISOString() ?? new Date().toISOString();

  // 4) Post 문서에 commentCount 증가 + comments 배열에 푸시 (선택)
  const postRef = doc(db, "posts", body.docId);

  const commentForPostArray: Comment = {
    docId: commentDocRef.id,
    id: numberId,
    content: body.content,
    createdAt: createdAtString,
    user,
    isDeleted: false,
  };

  await updateDoc(postRef, {
    commentCount: increment(1),
    comments: arrayUnion(commentForPostArray),
  });

  // 5) 호출 측에서 쓸 수 있도록 최종 Comment 객체 반환
  const newComment: Comment = {
    docId: commentDocRef.id,
    id: numberId,
    content: body.content,
    createdAt: createdAtString,
    user,
    isDeleted: false,
  };

  return newComment;
}

export async function getComments(docId: string): Promise<Comment[]> {
  const commentsRef = collection(db, "posts", docId, "comments");

  const q = query(commentsRef, orderBy("createdAt", "asc"));
  // orderBy("createdAt", "desc") 하면 최신순

  const snap = await getDocs(q);

  const comments: Comment[] = snap.docs.map((doc) => {
    const data = doc.data() as any;

    const createdAtString =
      data.createdAt?.toDate?.().toISOString() ?? new Date().toISOString();

    return {
      docId: doc.id,
      id: data.id,
      content: data.content,
      createdAt: createdAtString,
      user: data.user,
      isDeleted: data.isDeleted ?? false,
    };
  });

  return comments;
}

export async function deleteComment({
  postDocId,
  commentDocId,
}: {
  postDocId: string;
  commentDocId: string;
}): Promise<void> {
  await deleteDoc(doc(db, "posts", postDocId, "comments", commentDocId));
}
