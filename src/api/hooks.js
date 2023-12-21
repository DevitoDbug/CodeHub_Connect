import { fetchFollowers, fetchFollowing } from './transactions';
import { useQuery } from '@tanstack/react-query';

export const useFetchFollowers = (user) => {
  return useQuery({
    queryKey: ['followers'],
    queryFn: () => fetchFollowers(user),
  });
};
export const useFetchFollowing = (user) => {
  return useQuery({
    queryKey: ['following'],
    queryFn: () => fetchFollowing(user),
  });
};
