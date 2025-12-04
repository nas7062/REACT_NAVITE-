import {
  addDoc,
  collection,
  serverTimestamp,
  getDoc,
  query,
  orderBy,
  limit,
  doc,
  startAfter,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/firebase";
import { CreatePostDto, Post, User } from "@/types/index";
import { getAuth } from "firebase/auth";

export async function CreatePost(body: CreatePostDto): Promise<Post> {
  const auth = getAuth();
  const currentUser = auth.currentUser;
  console.log(body.profile.displayName);
  if (!currentUser) {
    throw new Error("로그인된 사용자가 없습니다.");
  }

  const author: User = {
    id: currentUser.uid,
    displayName: body.profile.displayName ?? currentUser.displayName,
    imageUri: currentUser.photoURL ?? "",
  };

  const NumberId = Date.now();

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

  const snap = await getDoc(docRef);
  const data = snap.data();

  const createdAtString =
    data?.createdAt?.toDate().toISOString() ?? new Date().toISOString();

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

    q = query(
      baseRef,
      orderBy("createdAt", "desc"),
      startAfter(cursorDoc),
      limit(PAGE_SIZE)
    );
  }

  const snap = await getDocs(q);

  const posts: Post[] = snap.docs.map((d) => {
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

  const lastDoc = snap.docs[snap.docs.length - 1];

  return {
    posts,
    nextCursor: lastDoc ? lastDoc.id : undefined,
  };
}

export async function deletePost(DocId: string): Promise<void> {
  await deleteDoc(doc(db, "posts", DocId));
}
