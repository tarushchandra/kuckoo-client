import { GraphQLClient, RequestDocument, Variables } from "graphql-request";
import { verifyRefreshToken } from "@/services/auth";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { deleteTokensFromCookies } from "../actions/user";

// To check whether the page is server side or client side rendered.
// We should only send our token from client to server (Client Side Rendering)

class CustomGraphQLClient {
  private client: GraphQLClient;
  private refreshTokenVerificationPromise: Promise<{
    isRefreshTokenValid: any;
  }> | null = null;
  private maxRetries: number;

  constructor() {
    this.client = new GraphQLClient(graphqlEndPoint, {
      credentials: "include",
    });
    this.maxRetries = 1;
  }

  // This method is used to make GraphQL requests with automatic handling of access token expiration.
  public async request<TData, TVariables extends Variables>(
    query: RequestDocument | TypedDocumentNode<TData, TVariables>,
    variables?: TVariables,
    maxRetries: number = 0
  ): Promise<TData> {
    try {
      return await this.baseRequest(query, variables);
    } catch (err) {
      if (this.isAccessTokenExpired(err) && maxRetries < this.maxRetries) {
        await this.waitTillRefreshTokenVerifies();
        return await this.request(query, variables, maxRetries + 1);
      }
      throw err;
    }
  }

  // This method is used to make the actual GraphQL requests.
  public async baseRequest<T, V extends Variables>(
    query: RequestDocument | TypedDocumentNode<T, V>,
    variables?: V
  ) {
    // Type assertion needed due to complex GraphQLClient overloads
    return (
      this.client.request as (
        query: RequestDocument | TypedDocumentNode<T, V>,
        variables?: V
      ) => Promise<T>
    )(query, variables);
  }

  // --------------------------------------------------------------------------------------------------------------

  private isAccessTokenExpired(error: any): boolean {
    return error?.response?.status === 401;
  }

  private async waitTillRefreshTokenVerifies() {
    if (!this.refreshTokenVerificationPromise) {
      this.refreshTokenVerificationPromise =
        this.createRefreshTokenVerificationPromise();
    }

    try {
      const { isRefreshTokenValid } = await this
        .refreshTokenVerificationPromise;
      if (!isRefreshTokenValid) this.handleInvalidRefreshToken();
    } catch (err: any) {
      this.handleInvalidRefreshToken();
      throw err;
    }
  }

  private async createRefreshTokenVerificationPromise() {
    try {
      return await verifyRefreshToken();
    } finally {
      this.refreshTokenVerificationPromise = null;
    }
  }

  private async handleInvalidRefreshToken(): Promise<void> {
    try {
      await deleteTokensFromCookies();
      window.location.href = "/sign-in";
    } catch (err) {
      throw new Error("Failed to delete tokens from cookies");
    }
  }
}

export const graphqlEndPoint = `${process.env.NEXT_PUBLIC_BACKEND_SERVER_URL}/graphql`;
export const graphqlClient = new CustomGraphQLClient();
