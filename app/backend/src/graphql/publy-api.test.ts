import { readFileSync } from "fs";
import { resolvers } from "./resolvers";
import path from "path";
import { ApolloServer } from "@apollo/server";
import assert from "assert";
import UserServiceDataSource from "./UserServiceDataSource";
import { PublyContext } from "./publy-context";

const typeDefs = readFileSync(
  path.resolve(__dirname, "./schema.graphql"),
  "utf8"
);

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

it("ping resolver should work", () => {
  assert(typeof resolvers.Query?.ping === "function");
  expect(resolvers.Query.ping({}, {}, {} as any, {} as any)).toBe("hello");
});

it("should return single story by id", async () => {
  const result = await server.executeOperation<{
    story: { title: string };
  }>({
    query:
      "query GetStory($storyId: ID!) { story(storyId: $storyId) { title } }",
    variables: { storyId: "1" },
  });
  assert(result.body.kind === "single");
  expect(result.body.singleResult.errors).toBeFalsy();
  expect(result.body.singleResult.data?.story.title).toBe(
    "Authentication and Access Control with Relay"
  );
});

it("should add new comment with user id from context", async () => {
  const testContext: PublyContext = {
    userId: "U3",
    dataSources: {
      userServiceDataSource: new UserServiceDataSource(),
    },
  };

  const result = await server.executeOperation<{
    addComment: {
      newComment: { id: string };
    };
  }>(
    {
      // language=GraphQL
      query: `mutation AddComment($input: AddCommentInput!) {
			addComment(input: $input)	{
					...on AddCommentSuccessPayload {
							newComment {
									id
              }
					}
			}
    } 
	`,
      variables: {
        input: {
          storyId: "3",
          content: "New Comment!",
        },
      },
    },
    {
      contextValue: testContext,
    }
  );
  assert(result.body.kind === "single");
  expect(result.body.singleResult.errors).toBeFalsy();
  expect(result.body.singleResult.data?.addComment.newComment.id).toBe("15");
});
