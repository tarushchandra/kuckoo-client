import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Stale Time Configuration
      staleTime: 1 * 1000 * 60,
      gcTime: 2 * 1000 * 60,

      // Retry Configuration
      retry: (failureCount, error: any) => {
        if (error?.response?.status >= 400 && error?.response?.status < 500) {
          return false; // Do not retry on client errors
        }
        return failureCount < 3; // Retry up to 3 times for any other types of errors
      },

      // Refetch Configuration
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      refetchOnMount: true,

      // Network Mode Configuration
      networkMode: "online",
    },

    mutations: {
      retry: 1,
      networkMode: "online",
    },
  },
});

// // ===== DEVELOPMENT HELPERS =====
// if (process.env.NODE_ENV === "development") {
//   // Enable more detailed logging in development
//   queryClient.setDefaultOptions({
//     queries: {
//       ...queryClient.getDefaultOptions().queries,
//       // More aggressive refetching in development
//       staleTime: 0, // Always refetch in development
//       // Enable detailed logging
//       meta: { logLevel: "debug" },
//     },
//   });
// }
