import { readFileSync } from "fs";
import path from "path";
import { resolvers } from "./graphql/resolvers";
import { startGraphQLServer } from "./graphql/start-graphql-server";

const schema = readFileSync(
  path.resolve(__dirname, "graphql/schema.graphql"),
  "utf8"
);

startGraphQLServer(schema, resolvers).then((_) => {
  console.log(`Server ready at http://localhost:4000/graphql`);
});
