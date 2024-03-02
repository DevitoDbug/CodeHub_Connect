import { fetchFollowers, fetchFollowing, fetchUser } from "./transactions";
import { useQuery } from "@tanstack/react-query";

export const useFetchFollowers = (user: string) => {
  return useQuery({
    queryKey: ["followers"],
    queryFn: () => fetchFollowers(user),
  });
};

export const useFetchFollowing = (user: string) => {
  return useQuery({
    queryKey: ["following"],
    queryFn: () => fetchFollowing(user),
  });
};

export const useFetchUser = (user: string) => {
  return useQuery({
    queryKey: [user],
    queryFn: () => fetchUser(user),
  });
};
