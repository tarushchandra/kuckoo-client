"use client";
import { User } from "@/gql/graphql";
import { useEffect, useState } from "react";
import { useDebounce } from "../utils";

export const useSearchUsers = (fn: any, ...args: any) => {
  const [searchText] = args;
  const [users, setUsers] = useState<User[]>([]);
  const [isUsersLoading, setIsUsersLoading] = useState(false);

  const fetchUsers = async () => {
    setIsUsersLoading(true);
    const users = await fn(...args);
    setIsUsersLoading(false);
    setUsers(users as User[]);
  };
  const debouncedFetchUsers = useDebounce(fetchUsers, 300);

  useEffect(() => {
    debouncedFetchUsers();
  }, [searchText]);

  return { isUsersLoading, users };
};
