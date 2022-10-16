import { Resolvers } from "./generated/graphql-types";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { ApolloServer } from "@apollo/server";
import {
  createPublyContext,
  createSubscriptionContext,
  PublyContext,
} from "./publy-context";
import cors from "cors";
import { json } from "body-parser";
import { expressMiddleware } from "@apollo/server/express4";

const SERVER_PATH = "/";

export async function startGraphQLServer(
  typeDefs: string,
  resolvers: Resolvers
) {
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  // Express for HTTP ---------------------------------
  const app = express();
  const httpServer = http.createServer(app);

  // WebSockets for Subscription ----------------------
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: SERVER_PATH,
  });
  const serverCleanup = useServer(
    { schema, context: createSubscriptionContext },
    wsServer
  );

  // Apollo Server --------------------------------------
  const server = new ApolloServer<PublyContext>({
    schema,
    csrfPrevention: true,
    includeStacktraceInErrorResponses: true,
    formatError(e) {
      console.error("ERROR", e);
      return e;
    },
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start();

  app.use(
    SERVER_PATH,
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(server, {
      context: createPublyContext,
    })
  );

  return httpServer.listen({ port: 4000 });
}
