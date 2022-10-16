import { Resolvers } from "./generated/graphql-types";
import {
  InvalidDataError,
  publyDomainService,
} from "../domain/PublyDomainService";
import { withFilter } from "graphql-subscriptions";

export const resolvers: Resolvers = {
  Query: {
    ping() {
      return "hello";
    },
    story(_, { storyId }) {
      return publyDomainService.findStoryById(storyId);
    },
    allStories() {
      return publyDomainService.findAllStories();
    },
    // frontend-only ------------------------------------------------------------
    stories(_, { page, pageSize, sortBy }) {
      return publyDomainService.findStories(page, pageSize, sortBy);
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
        const newComment = publyDomainService.addComment(
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
  Subscription: {
    onNewComment: {
      subscribe: withFilter(
        () => publyDomainService.getCommentSubscription(),
        (payload, variables) => {
          return variables.storyId === payload.onNewComment.newComment.story.id;
        }
      ) as any,
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
