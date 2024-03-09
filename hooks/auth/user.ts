import { graphqlClient } from "@/clients/graphql";
import { queryClient } from "@/clients/query";
import { getCurrentUserQuery } from "@/graphql/queries/user";
import { useQuery } from "@tanstack/react-query";

export const useCurrentUser = () => {
  const response = useQuery({
    queryKey: ["current-user"],
    queryFn: () => graphqlClient.request(getCurrentUserQuery),
  });
  return response.data?.getCurrentUser;
};

export const useSessionUser = async () => {
  try {
    const { getCurrentUser } = await queryClient.fetchQuery({
      queryKey: ["current-user"],
      queryFn: () => graphqlClient.request(getCurrentUserQuery),
    });
    await queryClient.invalidateQueries({
      queryKey: ["current-user"],
    });
    if (!getCurrentUser) throw new Error("User not found");
    return { user: getCurrentUser };
  } catch (err) {
    return { error: err };
  }
};
