import { RESTDataSource } from "@apollo/datasource-rest";

export default class UserServiceDataSource extends RESTDataSource {
  baseURL = "http://localhost:4010/";
  memoizeGetRequests = false;

  didReceiveResponse(response, _request) {
    if (response.status === 404) {
      return Promise.resolve(null);
    }
    return super.didReceiveResponse(response, _request);
  }

  getUser(userId) {
    console.log("Loading User " + userId);
    return this.get(this.baseURL + "users/" + userId);
  }
}
