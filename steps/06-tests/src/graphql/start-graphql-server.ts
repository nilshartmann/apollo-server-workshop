import { makeExecutableSchema } from "@graphql-tools/schema";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { ApolloServer } from "@apollo/server";
import cors from "cors";
import { json } from "body-parser";
import { expressMiddleware } from "@apollo/server/express4";
import UserServiceDataSource from "./UserServiceDataSource";

const SERVER_PATH = "/";

export async function startGraphQLServer(typeDefs: string, resolvers: any) {
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  // Express for HTTP ---------------------------------
  const app = express();
  const httpServer = http.createServer(app);

  // WebSockets for Subscription ----------------------
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: SERVER_PATH,
  });
  const serverCleanup = useServer({ schema }, wsServer);

  // Apollo Server --------------------------------------
  const server = new ApolloServer({
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
      context: (config) => createPublyContext(config, server.cache),
    })
  );

  return httpServer.listen({ port: 4000 });
}

async function createPublyContext(config, cache) {
  const userId = config.req.get("X-Authorization") || null;
  const userServiceDataSource = new UserServiceDataSource({ cache });

  return {
    userId,
    datasources: {
      userServiceDataSource,
    },
  };
}
