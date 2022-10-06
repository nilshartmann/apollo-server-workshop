import { CommentEntity, MemberEntity, StoryEntity } from "./publy.types";
import createFakeData from "./data/fake-data";

export default class PublyRepository {
  private data = createFakeData();

  findAllStories(): StoryEntity[] {
    return Object.values(this.data.stories);
  }

  findStoryById(id: string): StoryEntity | null {
    const story = this.data.stories[id];
    if (!story) {
      return null;
    }
    return story;
  }

  findAllCommentsByStoryId(storyId: string): CommentEntity[] {
    const story = this.findStoryById(storyId);
    if (!story) {
      return [];
    }
    return story.comments;
  }

  getMemberById(memberId: string): MemberEntity {
    const result = this.data.members[memberId];
    if (!result) {
      throw new Error("Member not found: " + memberId);
    }
    return result;
  }

  findMemberByUserId(userId: string): MemberEntity | null {
    const member =
      Object.values(this.data.members).find((x) => x.userId === userId) || null;
    return member;
  }

  saveComment(newEntity: CommentEntity) {
    this.data.comments = {
      ...this.data.comments,
      [newEntity.id]: newEntity,
    };
  }
}

//
// memberRepository.findByUserId
//
// memberRepository.findById
//
// commentRepository.save(comment)
