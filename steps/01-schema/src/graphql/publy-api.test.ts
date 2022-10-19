import { readFileSync } from "fs";
import { resolvers } from "./resolvers";
import path from "path";

const typeDefs = readFileSync(
  path.resolve(__dirname, "./schema.graphql"),
  "utf8"
);

test("Resolvers and Typedefs are setup", () => {
  expect(resolvers).toBeTruthy();
  expect(typeDefs).toBeTruthy();
});
