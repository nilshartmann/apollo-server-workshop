import { RESTDataSource } from "@apollo/datasource-rest";

export default class UserServiceDataSource extends RESTDataSource {
  override baseURL = "http://localhost:4010";

  async findUserById(id: string) {
    const path = `users/${encodeURIComponent(id)}`;
    console.log("Calling external User Service REST API ", path);
    return this.get(path);
  }
}
