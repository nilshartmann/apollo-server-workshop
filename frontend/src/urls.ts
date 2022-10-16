const backendHost = window.__publy__backend_host__.replace(
  "__BACKEND__",
  "http://localhost:4000"
);
const userserviceHost = window.__publy__userservice_host__.replace(
  "__USERSERVICE__",
  "http://localhost:4010"
);

export const userServiceUrl = `${userserviceHost}`;
export const graphqlApiUrl = `${backendHost}`;

export const graphqlWsApiUrl = `${backendHost}`
  .replaceAll("https", "wss")
  .replace("http", "ws");

export const graphiqlUrl = `${backendHost}/`;

console.log("USING GRAPHQL URL", graphqlApiUrl);
console.log("USING GRAPHQL WS URL", graphqlWsApiUrl);
console.log("USERSERVICE URL", userServiceUrl);
