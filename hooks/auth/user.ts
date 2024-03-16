import { graphqlClient } from "@/clients/graphql";
import { queryClient } from "@/clients/query";
import {
  getAllUsersQuery,
  getCurrentUserQuery,
  getSessionUserQuery,
} from "@/graphql/queries/user";
import { useQuery } from "@tanstack/react-query";

export const useCurrentUser = (username: string) => {
  const response = useQuery({
    queryKey: ["current-user"],
    queryFn: () => graphqlClient.request(getCurrentUserQuery, { username }),
  });
  return response.data?.getCurrentUser;
};

export const useSessionUser = async () => {
  const { getSessionUser } = await queryClient.fetchQuery({
    queryKey: ["session-user"],
    queryFn: () => graphqlClient.request(getSessionUserQuery),
  });
  return { user: getSessionUser };
};

export const useAllUsers = () => {
  const response = useQuery({
    queryKey: ["all-users"],
    queryFn: () => graphqlClient.request(getAllUsersQuery),
  });
  return response.data?.getAllUsers;
};
