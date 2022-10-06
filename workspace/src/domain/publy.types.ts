import { isNumber } from "util";

export type MemberEntity = {
  id: string;
  version: number;
  createdAt: string;
  userId: string;
  profileImage: string;
  location: string | null;
  bio: string | null;
  skills: string | null;
  currentlyLearning: string | null;
  works: string | null;
};

export type StoryEntity = {
  id: string;
  version: number;
  createdAt: string;
  writtenBy: MemberEntity;
  title: string;
  tags: string[];
  body: string;
  comments: CommentEntity[];
};

export type CommentEntity = {
  id: string;
  version: number;
  createdAt: string;
  story: StoryEntity;
  writtenBy: MemberEntity;
  content: string;
};

export type UserEntity = {
  id: string;
  name: string;
  email: string;
};

export type StoryEntityList = {
  page: Page;
  stories: StoryEntity[];
};

export type Page = {
  pageNumber: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};
