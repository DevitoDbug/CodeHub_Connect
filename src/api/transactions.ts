import { handleError } from "../utils";
import { httpClient } from "./http-client";

export const fetchFollowers = async (username: string) => {
  try {
    const { data } = await httpClient.get(`/${username}/followers`);
    return data;
  } catch (e: unknown) {
    console.log(handleError(e));
  }
};

export const fetchFollowing = async (username: string) => {
  try {
    const { data } = await httpClient.get(`/${username}/following`);
    return data;
  } catch (e: unknown) {
    console.log(handleError(e));
  }
};

export const fetchUser = async (username: string) => {
  if (!username) return;
  try {
    const { data } = await httpClient.get(`/${username}`);
    return data;
  } catch (e: unknown) {
    console.log(handleError(e));
  }
};
