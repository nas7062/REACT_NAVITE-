import { db } from "@/firebase";
import { CreatePostDto, Post, User } from "@/types/index";
import { getAuth } from "firebase/auth";
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  startAfter,
  updateDoc,
} from "firebase/firestore";

export async function CreatePost(body: CreatePostDto): Promise<Post> {
  const auth = getAuth(); // 유저 정보 가져오기
  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw new Error("로그인된 사용자가 없습니다.");
  }

  // 작성자 정보에 사용자 정보 넣기
  const author: User = {
    id: currentUser.uid,
    displayName: body.profile.displayName ?? currentUser.displayName,
    imageUri: currentUser.photoURL ?? "",
  };

  // 현재 시간을 id로
  const NumberId = Date.now();

  // post에 추가
  const docRef = await addDoc(collection(db, "posts"), {
    id: NumberId,
    userId: currentUser.uid,
    title: body.title,
    description: body.description,
    createdAt: serverTimestamp(),
    author,
    imageUris: body.imageUris ?? [],
    likes: [],
    hasVote: false,
    voteCount: 0,
    commentCount: 0,
    viewCount: 0,
    votes: [],
    comments: [],
  });

  // 넣은 posts 다시 불러오기
  const snap = await getDoc(docRef);
  const data = snap.data();

  //  Firestore의 Timestamp 타입은 자바스크립트 Date가 아니라 별도 객체라 toDate()로 JS Date 객체로 변환
  const createdAtString =
    data?.createdAt?.toDate().toISOString() ?? new Date().toISOString();

  // createdAtString 다시 넣어서 post로 return
  const post: Post = {
    docId: docRef.id,
    id: NumberId,
    userId: currentUser.uid,
    title: body.title,
    description: body.description,
    createdAt: createdAtString,
    author,
    imageUris: body.imageUris ?? [],
    likes: [],
    hasVote: false,
    voteCount: 0,
    commentCount: 0,
    viewCount: 0,
    votes: [],
    comments: [],
  };

  return post;
}

// 한 페이지당 가져올 posts 개수
const PAGE_SIZE = 5;

type GetPostsArgs = {
  pageParam?: string;
};

export type GetPostsResult = {
  posts: Post[];
  nextCursor?: string;
};

export async function getPosts({
  pageParam,
}: GetPostsArgs): Promise<GetPostsResult> {
  const baseRef = collection(db, "posts");

  let q;

  if (!pageParam) {
    // 첫 페이지
    q = query(baseRef, orderBy("createdAt", "desc"), limit(PAGE_SIZE));
  } else {
    const cursorDoc = await getDoc(doc(db, "posts", pageParam));

    if (!cursorDoc.exists()) {
      return { posts: [], nextCursor: undefined };
    }

    // posts createdAt 기준 최신순으로 다음 posts 불럴오기
    q = query(
      baseRef,
      orderBy("createdAt", "desc"),
      startAfter(cursorDoc),
      limit(PAGE_SIZE)
    );
  }

  // posts 불러오기
  const snap = await getDocs(q);

  //posts 모두 불러오기
  const posts: Post[] = snap.docs.map((d) => {
    // post
    const data = d.data() as any;

    const createdAt =
      data.createdAt?.toDate?.().toISOString?.() ?? data.createdAt ?? "";

    const post: Post = {
      docId: d.id,
      id: data.id,
      userId: data.userId,
      title: data.title,
      description: data.description,
      createdAt,
      author: data.author,
      imageUris: data.imageUris ?? [],
      likes: data.likes ?? [],
      hasVote: data.hasVote ?? false,
      voteCount: data.voteCount ?? 0,
      commentCount: data.commentCount ?? 0,
      viewCount: data.viewCount ?? 0,
      votes: data.votes ?? [],
      comments: data.comments ?? [],
    };

    return post;
  });

  // 마지막 post
  const lastDoc = snap.docs[snap.docs.length - 1];

  // posts 랑 마지막 postid return
  return {
    posts,
    nextCursor: lastDoc ? lastDoc.id : undefined,
  };
}

// 해당 post삭제
export async function deletePost(DocId: string): Promise<void> {
  await deleteDoc(doc(db, "posts", DocId));
}

export async function getPostById(docId: string): Promise<Post | null> {
  //  문서 ref
  const ref = doc(db, "posts", docId);

  // post 가져옴
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    return null;
  }

  const data = snap.data() as any;

  const createdAt =
    data.createdAt?.toDate?.().toISOString?.() ?? data.createdAt ?? "";

  const post: Post = {
    docId: snap.id,
    id: data.id,
    userId: data.userId,
    title: data.title,
    description: data.description,
    createdAt,
    author: data.author,
    imageUris: data.imageUris ?? [],
    likes: data.likes ?? [],
    hasVote: data.hasVote ?? false,
    voteCount: data.voteCount ?? 0,
    commentCount: data.commentCount ?? 0,
    viewCount: data.viewCount ?? 0,
    votes: data.votes ?? [],
    comments: data.comments ?? [],
  };

  return post;
}

export async function updatePost({
  docId,
  body,
}: {
  docId: string;
  body: CreatePostDto;
}): Promise<Post> {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error("로그인된 사용자가 없습니다.");
  }

  const author: User = {
    id: currentUser.uid,
    displayName: body.profile.displayName ?? currentUser.displayName,
    imageUri: currentUser.photoURL ?? "",
  };
  const ref = doc(db, "posts", docId);
  await updateDoc(ref, {
    title: body.title,
    description: body.description,
    imageUris: body.imageUris ?? [],
    author,
    updatedAt: serverTimestamp(),
  });

  const snap = await getDoc(ref);
  const data = snap.data();

  const createdAtString =
    data?.createdAt?.toDate().toISOString() ?? new Date().toISOString();

  const post: Post = {
    docId: snap.id,
    id: data?.id,
    userId: currentUser.uid,
    title: body.title,
    description: body.description,
    createdAt: createdAtString,
    author,
    imageUris: body.imageUris ?? [],
    likes: [],
    hasVote: false,
    voteCount: 0,
    commentCount: 0,
    viewCount: 0,
    votes: [],
    comments: [],
  };

  return post;
}


export async function toggleLike ({docId,userId,isLiked}:{docId:string,userId:string,isLiked:boolean} )  {
  const postRef = doc(db,"posts",docId);
  if(isLiked) {
    await updateDoc(postRef,{
      likes:arrayRemove(userId)
    });
  }
  else {
    await updateDoc(postRef,{
      likes:arrayUnion(userId)
    })
  }
}