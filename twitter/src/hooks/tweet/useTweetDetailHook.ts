import { TweetType } from "@/app/types/tweet";
import axiosInstance from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function useTweetDetailHook(id: string) {
    const [tweetDetail, setTweetDetail] = useState<TweetType>({
        id: 0,
        content: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: 1,
        imageUrls: [],
        user: {
            id: 0,
            name: "",
            email: "",
            emailVerified: "",
            image: "",
            displayName: "",
            phoneNumber: "",
            bio: "",
            location: "",
            website: "",
            birthday: "",
            createdAt: "",
            updatedAt: ""
        }
    });

    const { instance } = axiosInstance();

    const router = useRouter();

    const getTweetDetail = async () => {
        const response = await instance.get(`/api/tweet/${id}`);
        return response.data;
    }

    useEffect(() => {
        async function fetchData() {
            const data: TweetType = await getTweetDetail();
            setTweetDetail(data);
        }

        fetchData();
    }, [])

    return { tweetDetail, router };
}