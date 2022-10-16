import UserServiceDataSource from "./UserServiceDataSource";
import { ContextFunction } from "@apollo/server";
import { ExpressContextFunctionArgument } from "@apollo/server/express4";

export type PublyContext = {
  userId: string | null;
  dataSources: {
    userServiceDataSource: UserServiceDataSource;
  };
};

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
