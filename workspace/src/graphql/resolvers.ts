import { Resolvers } from "./generated/graphql-types";
import publyRepository, {
  InvalidDataError,
} from "../domain/PublyDomainService";
import publyDomainService from "../domain/PublyDomainService";
export const resolvers: Resolvers = {
  Query: {
    ping() {
      return "hello";
    },
    story(_, { storyId }) {
      return publyRepository.findStoryById(storyId);
    },
    allStories() {
      return publyRepository.findAllStories();
    },
    // frontend-only ------------------------------------------------------------
    stories(_, { page, pageSize, sortBy }) {
      return publyRepository.findStories(page, pageSize, sortBy);
    },
    me(_, __, { userId }) {
      if (!userId) {
        return null;
      }
      return publyDomainService.getMemberByUserId(userId);
    },
    comments(_, { storyId }) {
      return publyDomainService.findAllCommentsByStoryId(storyId);
    },
  },
  Story: {
    excerpt(storyEntity, { maxLength }) {
      return storyEntity.body.substring(0, maxLength);
    },
  },
  Member: {
    user(memberEntity, _, context) {
      return context.dataSources.userServiceDataSource.findUserById(
        memberEntity.userId
      );
    },
  },
  Mutation: {
    addComment(_, { input }, { userId }) {
      if (!userId) {
        throw new Error("Please login!");
      }
      try {
        const newComment = publyRepository.addComment(
          input.storyId,
          userId,
          input.content
        );
        return { newComment };
      } catch (err) {
        if (err instanceof InvalidDataError) {
          return {
            errorMsg: err.message,
          };
        }
        throw err;
      }
    },
  },
  AddCommentPayload: {
    __resolveType(x) {
      if ("newComment" in x) {
        return "AddCommentSuccessPayload";
      }
      return "AddCommentFailedPayload";
    },
  },
};
