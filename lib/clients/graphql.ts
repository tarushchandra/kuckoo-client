import { isClientSideRenderedPage } from "@/utils/isClient";
import { GraphQLClient } from "graphql-request";

// To check whether the page is server side or client side rendered.
// We should only send our token from client to server (Client Side Rendering)

export const graphqlEndPoint = "http://localhost:8000/graphql";

export const graphqlClient = new GraphQLClient(
  "http://localhost:8000/graphql",
  {
    headers: () => {
      const access_token = localStorage.getItem("__access__token");
      return {
        Authorization:
          isClientSideRenderedPage && access_token
            ? `Bearer ${access_token}`
            : "",
      };
    },
  }
);
