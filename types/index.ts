interface User {
  id: string;
  displayName: string;
  imageUri?: string;
}

interface Profile extends User {
  email: string;
  introduce?: string;
  hatId: string;
  handId: string;
  skinId: string;
  topId: string;
  faceId: string;
  bottomId: string;
  background: string;
}

interface ImageUri {
  id?: number | string;
  uri: string;
}
interface VoteOption {
  id?: number;
  displayPriority: number;
  content: string;
}

interface CreatePostDto {
  title: string;
  description: string;
  imageUris: ImageUri[];
  voteTitle?: string;
  voteOptions?: VoteOption[];
  profile: {
    displayName: string;
  };
}

interface CreateCommentDto {
  docId: string;
  content: string;
  parentId?: number | null;
  profile: {
    displayName?: string;
    imageUri?: string;
  };
}

interface CreateVoteDto {
  postId: number;
  voteOptionId: number;
}

type PostVoteOption = VoteOption & { userVotes: { userId: string }[] };

interface PostVote {
  id: number;
  title: string;
  options: PostVoteOption[];
}
interface Comment {
  docId: string;
  id: number;
  content: string;
  createdAt: string;
  user: User;
  isDeleted: boolean;
  parentId?: number | null;
  replies: Comment[];
}

interface Post {
  docId: string;
  id: number;
  userId: string;
  title: string;
  description: string;
  createdAt: string;
  author: User;
  imageUris: ImageUri[];
  likes: string[];
  hasVote: boolean;
  voteCount: number;
  commentCount: number;
  viewCount: number;
  votes?: PostVote[];
  comments?: Comment[];
}

export type {
  Profile,
  PostVote,
  PostVoteOption,
  CreatePostDto,
  CreateCommentDto,
  CreateVoteDto,
  Post,
  User,
  Comment,
  ImageUri,
  VoteOption,
};
