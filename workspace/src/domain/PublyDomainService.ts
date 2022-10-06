import {
  CommentEntity,
  MemberEntity,
  StoryEntity,
  StoryEntityList,
} from "./publy.types";
import createFakeData from "./data/fake-data";

export class PublyDomainService {
  private data = createFakeData();

  findAllStories(): StoryEntity[] {
    return Object.values(this.data.stories).sort(sortByDate);
  }

  findStories(page: number, size: number): StoryEntityList {
    const orderedStories = Object.values(this.data.stories).sort(sortByDate);

    const result = orderedStories.slice(page * size, page * size + size);

    return {
      stories: result,
      page: {
        hasNextPage: page * size + size < orderedStories.length,
        hasPreviousPage: page > 0,
        totalCount: orderedStories.length,
        pageNumber: page,
      },
    };
  }

  findStoryById(id: string): StoryEntity | null {
    return this.data.stories[id] || null;
  }

  private getStoryById(storyId: string): StoryEntity {
    const result = this.data.stories[storyId];
    if (!result) {
      throw new Error("Story not found: " + storyId);
    }
    return result;
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
    return (
      Object.values(this.data.members).find((x) => x.userId === userId) || null
    );
  }

  getMemberByUserId(userId: string): MemberEntity {
    const member = Object.values(this.data.members).find(
      (x) => x.userId === userId
    );
    if (!member) {
      throw new Error("No Member with user id " + userId);
    }
    return member;
  }

  addComment(storyId: string, userId: string, content: string): CommentEntity {
    if (content.length < 5) {
      throw new InvalidDataError("New comment must be at least 5 chars long.");
    }

    const member = this.getMemberByUserId(userId);
    const story = this.getStoryById(storyId);
    const newComment: CommentEntity = {
      id: String(Object.keys(this.data.comments).length + 1),
      version: 1,
      createdAt: new Date().toISOString(),
      writtenBy: member,
      story,
      content,
    };

    this.data.comments = {
      ...this.data.comments,
      [newComment.id]: newComment,
    };
    story.comments = [newComment, ...story.comments];

    return newComment;
  }
}

const repository = new PublyDomainService();
export default repository;

export class InvalidDataError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, InvalidDataError.prototype);
  }
}

//
// memberRepository.findByUserId
//
// memberRepository.findById
//
// commentRepository.save(comment)

function sortByDate(a: StoryEntity, b: StoryEntity) {
  return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
}
