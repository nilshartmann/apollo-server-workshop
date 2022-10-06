import { Resolvers } from "./generated/graphql-types";
import publyRepository from "../domain/PublyRepository";
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
};
