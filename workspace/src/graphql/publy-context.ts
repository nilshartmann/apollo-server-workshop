import UserServiceDataSource from "./UserServiceDataSource";
import { ContextFunction } from "@apollo/server";
import { ExpressContextFunctionArgument } from "@apollo/server/express4";

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

export const createPublyContext: ContextFunction<
  [ExpressContextFunctionArgument],
  PublyContext
> = async (config) => {
  const userId = config.req.get("X-Authorization") || null;

  const context: PublyContext = {
    userId,
    dataSources: {
      userServiceDataSource: new UserServiceDataSource(),
    },
  };

  return context;
};
