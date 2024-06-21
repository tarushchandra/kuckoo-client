"use client";
import { User } from "@/gql/graphql";
import { getUsers } from "@/services/user";
import { useEffect, useState } from "react";

export const useSearchUsers = (fn: any, ...args: any) => {
  const [searchText] = args;
  const [users, setUsers] = useState<User[]>([]);
  const [isUsersLoading, setIsUsersLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsUsersLoading(true);
      const users = await fn(...args);
      setIsUsersLoading(false);

      setUsers(users as User[]);
    };
    fetchUsers();
  }, [searchText]);

  return { isUsersLoading, users };
};
