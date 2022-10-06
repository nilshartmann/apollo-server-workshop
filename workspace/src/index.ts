import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from "apollo-server-core";
import express from "express";
import http from "http";
import { readFileSync } from "fs";

import { Resolvers } from "./graphql/generated/graphql-types";
import PublyRepository from "./domain/PublyDomainService";
import path from "path";
import { resolvers } from "./graphql/resolvers";
import {
  createPublyContext,
  createPublyDataSources,
} from "./graphql/publy-context";
import UserServiceDataSource from "./graphql/UserServiceDataSource";

const schema = readFileSync(
  path.resolve(__dirname, "graphql/schema.graphql"),
  "utf8"
);

async function startApolloServer(typeDefs: string, resolvers: Resolvers) {
  // Required logic for integrating with Express
  const app = express();

  // Our httpServer handles incoming requests to our Express app.
  // Below, we tell Apollo Server to "drain" this httpServer,
  // enabling our servers to shut down gracefully.
  const httpServer = http.createServer(app);

  // Same ApolloServer initialization as before, plus the drain plugin
  // for our httpServer.
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: createPublyContext,
    dataSources: createPublyDataSources,
    csrfPrevention: true,
    cache: "bounded",
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
  });

  // More required logic for integrating with Express
  await server.start();
  server.applyMiddleware({
    app,

    // By default, apollo-server hosts its GraphQL endpoint at the
    // server root. However, *other* Apollo Server packages host it at
    // /graphql. Optionally provide this to match apollo-server.
    path: "/",
  });

  // Modified server startup
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer(schema, resolvers);
