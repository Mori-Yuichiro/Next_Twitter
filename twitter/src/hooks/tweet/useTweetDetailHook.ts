import { CommentType } from "@/app/types/comment";
import { TweetType } from "@/app/types/tweet";
import { fields } from "@/consts/field";
import axiosInstance from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function useTweetDetailHook(id: string) {
    const { user, tweet } = fields;

    const [tweetDetail, setTweetDetail] = useState<TweetType>(tweet);

    const [comments, setComments] = useState<CommentType[]>([{
        id: 0,
        comment: "",
        createdAt: new Date().toISOString(),
        userId: 1,
        tweetId: 1,
        user,
        tweet
    }]);

    const { instance } = axiosInstance();

    const router = useRouter();

    const getTweetDetail = async () => {
        const response = await instance.get(`/api/tweet/${id}`);
        return response.data;
    }

    const getComment = async () => {
        const response = await instance.get("/api/comment");
        return response.data;
    }

    useEffect(() => {
        async function fetchData() {
            const tweetData: TweetType = await getTweetDetail();
            setTweetDetail(tweetData);

            const commentData: CommentType[] = await getComment();
            setComments(commentData);
        }

        fetchData();
    }, [])

    return { tweetDetail, router, comments };
}