import { Resolvers } from "./generated/graphql-types";
import { makeExecutableSchema } from "@graphql-tools/schema";
import express from "express";
import http from "http";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { ApolloServer } from "@apollo/server";
import { createPublyContext, PublyContext } from "./publy-context";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/dist/esm/plugin/drainHttpServer";
import cors from "cors";
import { json } from "body-parser";
import { expressMiddleware } from "@apollo/server/express4";

export async function startGraphQLServer(
  typeDefs: string,
  resolvers: Resolvers
) {
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const app = express();
  const httpServer = http.createServer(app);
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  });
  const serverCleanup = useServer({ schema }, wsServer);

  // Same ApolloServer initialization as before, plus the drain plugin
  // for our httpServer.
  const server = new ApolloServer<PublyContext>({
    schema,
    csrfPrevention: true,
    includeStacktraceInErrorResponses: true,
    formatError(e, y) {
      console.log("ERROR", e, y);
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
    "/graphql",
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(server, {
      context: createPublyContext,
    })
  );

  return httpServer.listen({ port: 4000 });
}
