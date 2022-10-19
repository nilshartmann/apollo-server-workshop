import { readFileSync } from "fs";
import { resolvers } from "./resolvers";
import path from "path";
import { ApolloServer } from "@apollo/server";
import assert from "assert";

const typeDefs = readFileSync(
  path.resolve(__dirname, "./schema.graphql"),
  "utf8"
);

test("Resolvers and Typedefs are setup", () => {
  expect(resolvers).toBeTruthy();
  expect(typeDefs).toBeTruthy();
});

test("ping works", async () => {
  const server = new ApolloServer({ typeDefs, resolvers });

  const result: any = await server.executeOperation({
    query: "query { ping }",
  });

  expect(result.body.singleResult.data?.ping).toBe("hello");
});

test("get single story works", async () => {
  const server = new ApolloServer({ typeDefs, resolvers });

  const result: any = await server.executeOperation({
    query: "query Story($storyId: ID!) { story(storyId: $storyId) { title } }",
    variables: { storyId: "1" },
  });

  expect(result.body.singleResult.data?.story.title).toBe(
    "Authentication and Access Control with Relay"
  );
});
