import createComments, { CommentData } from "./comments";
import createMembers, { MemberData } from "./members";
import createStories, { StoryData } from "./stories";
import { CommentEntity, MemberEntity, StoryEntity } from "../publy.types";

type FakeData = {
  members: Record<string, MemberEntity>;
  stories: Record<string, StoryEntity>;
  comments: Record<string, CommentEntity>;
};

export default function createFakeData(): FakeData {
  const memberEntities = createMembers().reduce((p, c) => {
    p[c.id] = toMemberEntity(c);
    return p;
  }, {} as Record<string, MemberEntity>);

  const rawComments = createComments();

  function getMemberEntity(id: string): MemberEntity {
    const entity = memberEntities[id];
    if (!entity) {
      throw new Error("Member not found: " + id);
    }
    return entity;
  }

  function toStoryEntity(data: StoryData): StoryEntity {
    const storyEntity: StoryEntity = {
      id: data.id,
      version: data.version,
      createdAt: data.created_at,
      writtenBy: getMemberEntity(data.written_by_id),
      title: data.title,
      tags: data.tags,
      bodyMarkdown: data.body_markdown,
      comments: [],
    };

    storyEntity.comments = rawComments
      .filter((c) => c.story_id === storyEntity.id)
      .map((c) => toCommentEntity(c, storyEntity));

    return storyEntity;
  }

  function toCommentEntity(
    data: CommentData,
    story: StoryEntity
  ): CommentEntity {
    const commentEntity: CommentEntity = {
      id: data.id,
      version: data.version,
      createdAt: data.created_at,
      writtenBy: getMemberEntity(data.written_by_id),
      story: story,
      content: data.content,
    };
    return commentEntity;
  }

  function toMemberEntity(data: MemberData): MemberEntity {
    return {
      id: data.id,
      version: data.version,
      createdAt: data.created_at,
      userId: data.user_id,
      profileImage: data.profile_image,
      location: data.location,
      bio: data.bio,
      skills: data.skills,
      currentlyLearning: data.currently_learning,
      works: data.works,
    };
  }

  const storyEntities = createStories().reduce((p, c) => {
    p[c.id] = toStoryEntity(c);
    return p;
  }, {} as Record<string, StoryEntity>);

  const commentEntities = Object.values(storyEntities).reduce((p, s) => {
    s.comments.forEach((c) => {
      p[c.id] = c;
    });
    return p;
  }, {} as Record<string, CommentEntity>);

  const fakeData: FakeData = {
    members: memberEntities,
    stories: storyEntities,
    comments: commentEntities,
  };

  return fakeData;
}
