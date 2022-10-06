import publyRepository, { PublyRepository } from "../domain/PublyRepository";
import UserServiceDataSource from "./UserServiceDataSource";

type PublyDataSources = {
  userServiceDataSource: UserServiceDataSource;
};

export function publyDataSources(): PublyDataSources {
  return {
    userServiceDataSource: new UserServiceDataSource(),
  };
}

export type PublyBaseContext = {
  publyRepository: PublyRepository;
};

export type PublyContext = PublyBaseContext & {
  dataSources: PublyDataSources;
};

export const publyBaseContext: PublyBaseContext = {
  publyRepository,
};
