/// <reference types="next" />

declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_BACKEND_SERVER_URL: string;
    NEXT_PUBLIC_WEBSOCKET_URL: string;
  }
}
