import { UserInfo } from "firebase/auth";
import { handleError } from "../utils";
import { httpClient } from "./http-client";

export type GitHubApiResponse = {
  avatar_url: string;
  id: number;
  login: string;
};

function mapGitHubApiResponseToUserInfo(
  apiResponse: GitHubApiResponse
): UserInfo {
  return {
    displayName: apiResponse.login,
    email: null,
    phoneNumber: null,
    photoURL: apiResponse.avatar_url,
    providerId: "github",
    uid: String(apiResponse.id),
  };
}

export const fetchFollowers = async (username: string): Promise<UserInfo[]> => {
  let users: GitHubApiResponse[] = [];
  try {
    if (username.length > 0) {
      const { data } = await httpClient.get(`/${username}/followers`);
      users = data;
    }
  } catch (e: unknown) {
    throw Error(handleError(e));
  }
  return users.map((user) => mapGitHubApiResponseToUserInfo(user));
};

export const fetchFollowing = async (username: string): Promise<UserInfo[]> => {
  let users: GitHubApiResponse[] = [];
  try {
    if (username.length > 0) {
      const { data } = await httpClient.get(`/${username}/following`);
      users = data;
    }
  } catch (e: unknown) {
    throw Error(handleError(e));
  }
  return users.map((user) => mapGitHubApiResponseToUserInfo(user));
};

export const fetchUser = async (username: string): Promise<UserInfo> => {
  let user: GitHubApiResponse = {
    avatar_url: "",
    id: -1,
    login: "",
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
  return mapGitHubApiResponseToUserInfo(user);
};
