import axiosInstance from "../lib/axiosInstance";
import { TweetType } from "../types/tweet";

export default async function useHomeHook() {
    const { instance } = axiosInstance();

    const response = await instance.get('api/tweet');
    const tweets: TweetType[] = response.data as TweetType[];

    return { tweets };
}