import UserServiceDataSource from "./UserServiceDataSource";
import { ContextFunction } from "apollo-server-core/src/types";
import { ExpressContext } from "apollo-server-express/src/ApolloServer";

type PublyDataSources = {
  userServiceDataSource: UserServiceDataSource;
};

export function createPublyDataSources(): PublyDataSources {
  return {
    userServiceDataSource: new UserServiceDataSource(),
  };
}

export type PublyBaseContext = {
  userId: string | null;
};

export type PublyContext = PublyBaseContext & {
  dataSources: PublyDataSources;
};

export const createPublyContext: ContextFunction<
  ExpressContext,
  PublyBaseContext
> = (config) => {
  const userId = config.req.get("X-Authorization") || null;

  return { userId };
};
