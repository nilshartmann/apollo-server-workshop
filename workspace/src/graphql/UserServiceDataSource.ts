import { RESTDataSource } from "apollo-datasource-rest";

export default class UserServiceDataSource extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://localhost:4010";
  }

  async findUserById(id: string) {
    const path = `users/${encodeURIComponent(id)}`;
    console.log("PATH", path);
    return this.get(path);
  }
}
