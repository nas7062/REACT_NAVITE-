import {
  addDoc,
  collection,
  serverTimestamp,
  getDoc,
  doc,
  updateDoc,
  increment,
  query,
  orderBy,
  getDocs,
  deleteDoc,
  where,
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

  const user: User = {
    id: currentUser.uid,
    displayName:
      body.profile.displayName ??
      currentUser.displayName ??
      "알 수 없는 사용자",
    imageUri: body.profile.imageUri ?? currentUser.photoURL ?? "",
  };

  const numberId = Date.now();

  // docId를 가진 posts의 coomnets 추가
  const commentDocRef = await addDoc(
    collection(db, "posts", body.docId, "comments"),
    {
      id: numberId,
      content: body.content,
      createdAt: serverTimestamp(),
      user,
      isDeleted: false,
      parentId: body.parentId ?? null,
    }
  );

  const snap = await getDoc(commentDocRef);
  const data = snap.data();

  const createdAtString =
    data?.createdAt?.toDate().toISOString() ?? new Date().toISOString();

  const postRef = doc(db, "posts", body.docId);
  await updateDoc(postRef, {
    commentCount: increment(1),
  });

  const newComment: Comment = {
    docId: commentDocRef.id,
    id: numberId,
    content: body.content,
    createdAt: createdAtString,
    user,
    isDeleted: false,
    parentId: body.parentId ?? null,
    replies: [],
  };

  return newComment;
}

export async function getComments(docId: string): Promise<Comment[]> {
  const commentsRef = collection(db, "posts", docId, "comments");

  //오래된 순으로 댓글이 아래로
  const q = query(commentsRef, orderBy("createdAt", "asc"));
  const snap = await getDocs(q);

  // comments 모두 가져오기
  const rawComments: Comment[] = snap.docs.map((d) => {
    const data = d.data() as any;

    const createdAtString =
      data.createdAt?.toDate?.().toISOString() ?? new Date().toISOString();

    return {
      docId: d.id,
      id: data.id,
      content: data.content,
      createdAt: createdAtString,
      user: data.user,
      isDeleted: data.isDeleted ?? false,
      parentId: data.parentId ?? null,
      replies: [], // 대댓글
    };
  });

  // 2) 부모/자식 묶기
  const commentMap = new Map<number, Comment>();
  const rootComments: Comment[] = [];

  // 부모 댓글을 먼저 map에 넣고 root 목록 구성
  rawComments.forEach((comment) => {
    if (!comment.parentId) {
      const clone = { ...comment, replies: [] };
      commentMap.set(comment.id, clone);
      rootComments.push(clone);
    }
  });

  // parentId가 있는 것들은 부모의 replies에 넣기
  rawComments.forEach((c) => {
    if (c.parentId) {
      const parent = commentMap.get(c.parentId);
      if (parent) {
        parent.replies.push({ ...c, replies: [] });
      } else {
        rootComments.push(c);
      }
    }
  });

  return rootComments;
}

export async function deleteComment({
  postDocId,
  commentDocId,
  commentId, 
}: {
  postDocId: string;
  commentDocId: string; 
  commentId: number; 
}): Promise<void> {
  const commentsRef = collection(db, "posts", postDocId, "comments");

  // 부모 댓글 조회.
  const q = query(commentsRef, where("parentId", "==", commentId));
  const snap = await getDocs(q);

  //답글 전부 삭제
  const repliesCount = snap.docs.length;
  for (const d of snap.docs) {
    await deleteDoc(doc(db, "posts", postDocId, "comments", d.id));
  }

  //부모 댓글 삭제
  await deleteDoc(doc(db, "posts", postDocId, "comments", commentDocId));

  // 부모 + 댓글 댓글 개수 감소 
  const postRef = doc(db, "posts", postDocId);
  await updateDoc(postRef, {
    commentCount: increment(-(1 + repliesCount)),
  });
}
