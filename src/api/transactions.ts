import { UserInfo } from "firebase/auth";
import { handleError } from "../utils";
import { httpClient } from "./http-client";

export const fetchFollowers = async (username: string): Promise<UserInfo[]> => {
  let users: UserInfo[] = [];
  try {
    const { data } = await httpClient.get(`/${username}/followers`);
    users = data;
  } catch (e: unknown) {
    throw Error(handleError(e));
  }
  return users;
};

export const fetchFollowing = async (username: string): Promise<UserInfo[]> => {
  let users: UserInfo[] = [];
  try {
    const { data } = await httpClient.get(`/${username}/following`);
    users = data;
  } catch (e: unknown) {
    throw Error(handleError(e));
  }
  return users;
};

export const fetchUser = async (username: string): Promise<UserInfo> => {
  let user: UserInfo = {
    displayName: null,
    email: null,
    phoneNumber: null,
    photoURL: null,
    providerId: "",
    uid: "",
  };
  if (!username) {
    throw Error("No user name to fetch");
  }
  try {
    const { data } = await httpClient.get(`/${username}`);
    user = data;
  } catch (e: unknown) {
    console.log(handleError(e));
  }
  return user;
};
