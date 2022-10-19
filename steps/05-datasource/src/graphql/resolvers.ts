import { publyDomainService } from "../domain/PublyDomainService";
import { GraphQLError } from "graphql/error";
import UserServiceDataSource from "./UserServiceDataSource";

export const resolvers = {
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
  },
  Story: {
    excerpt(storyEntity, { maxLength }) {
      return storyEntity.body.substring(0, maxLength);
    },
  },
  Member: {
    user(memberEntity, _args, context) {
      const ds = context.datasources.userServiceDataSource;
      return ds.getUser(memberEntity.userId);
    },
  },
  Mutation: {
    addComment(_, { input }, context) {
      if (!context.userId) {
        throw new GraphQLError("Please log in", {
          extensions: {
            code: "NOT_LOGGED_IN",
          },
        });
      }
      try {
        const newComment = publyDomainService.addComment(
          input.storyId,
          context.userId,
          input.content
        );

        return { newComment };
      } catch (err) {
        return {
          errorMsg: String(err),
        };
      }
    },
  },
  AddCommentPayload: {
    __resolveType(payload) {
      if ("errorMsg" in payload) {
        return "AddCommentFailedPayload";
      }
      return "AddCommentSuccessPayload";
    },
  },
};
