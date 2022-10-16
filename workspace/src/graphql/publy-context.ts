import UserServiceDataSource from "./UserServiceDataSource";
import { ContextFunction } from "@apollo/server";
import { ExpressContextFunctionArgument } from "@apollo/server/express4";
import { KeyValueCache } from "@apollo/utils.keyvaluecache";

export type PublyContext = {
  userId: string | null;
  dataSources: {
    userServiceDataSource: UserServiceDataSource;
  };
};

export function createSubscriptionContext(): PublyContext {
  const context: PublyContext = {
    userId: null,
    dataSources: {
      userServiceDataSource: new UserServiceDataSource(),
    },
  };

  return context;
}

export async function createPublyContext(
  config: ExpressContextFunctionArgument,
  cache: KeyValueCache<string>
): Promise<PublyContext> {
  const userId = config.req.get("X-Authorization") || null;

  const context: PublyContext = {
    userId,
    dataSources: {
      userServiceDataSource: new UserServiceDataSource({ cache }),
    },
  };

  return context;
}
