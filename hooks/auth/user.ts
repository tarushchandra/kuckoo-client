import { graphqlClient } from "@/clients/graphql";
import { queryClient } from "@/clients/query";
import {
  getAllUsersQuery,
  getUserQuery,
  getSessionUserQuery,
} from "@/graphql/queries/user";
import { useQuery } from "@tanstack/react-query";

export const useUser = (username: string) => {
  const response = useQuery({
    queryKey: ["user"],
    queryFn: () => graphqlClient.request(getUserQuery, { username }),
  });
  return response.data?.getUser;
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
