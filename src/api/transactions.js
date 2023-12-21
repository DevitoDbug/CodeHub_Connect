import { httpClient } from './http-client';

export const fetchFollowers = async (username) => {
  try {
    const { data } = await httpClient.get(`/${username}/followers`);
    return data;
  } catch (e) {
    console.log(e.message);
  }
};

export const fetchFollowing = async (username) => {
  try {
    const { data } = await httpClient.get(`/${username}/following`);
    return data;
  } catch (e) {
    console.log(e.message);
  }
};
