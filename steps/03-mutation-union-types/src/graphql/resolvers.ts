import { publyDomainService } from "../domain/PublyDomainService";

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
  Mutation: {
    addComment(_, { input }) {
      try {
        const newComment = publyDomainService.addComment(
          input.storyId,
          "U3",
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
