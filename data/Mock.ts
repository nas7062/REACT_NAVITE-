import { ImageUri, Post, PostVote, User, PostComment } from "@/types";

export const MOCK_POSTS: Post[] = [
  {
    id: 1,
    userId: "user_1",
    title: "첫 번째 게시글 제목",
    description:
      "첫 번째 게시글 내용입니다. 커뮤니티 테스트용 더미 데이터입니다.",
    createdAt: "2025-12-03T09:00:00.000Z",
    author: "kms",
    imageUris: [] as ImageUri[],
    likes: [{ userId: "user_2" }, { userId: "user_3" }],
    hasVote: false,
    voteCount: 0,
    commentCount: 0,
    viewCount: 12,
    // votes, comments 생략 (optional)
  },
  {
    id: 2,
    userId: "user_2",
    title: "사이드 프로젝트 같이 하실 분?",
    description:
      "리액트 네이티브로 사이드 프로젝트 하실 분 구해요. 디자인/기획자도 환영입니다.",
    createdAt: "2025-12-02T20:30:00.000Z",
    author: "kms",
    imageUris: [] as ImageUri[],
    likes: [{ userId: "user_1" }],
    hasVote: true,
    voteCount: 3,
    commentCount: 2,
    viewCount: 45,
    votes: [] as PostVote[],
    comments: [] as PostComment[],
  },
  {
    id: 3,
    userId: "user_3",
    title: "오늘의 루틴 공유",
    description:
      "아침 러닝 30분, 공부 1시간, 코딩 2시간 채웠습니다. 다들 오늘 하루 어떠셨어요?",
    createdAt: "2025-12-01T07:15:00.000Z",
    author: "kms",
    imageUris: [] as ImageUri[],
    likes: [],
    hasVote: false,
    voteCount: 0,
    commentCount: 0,
    viewCount: 7,
  },
];
