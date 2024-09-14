import { useForm } from "react-hook-form";
import axiosInstance from "../lib/axiosInstance";
import { TweetType } from "../types/tweet";
import { zodResolver } from "@hookform/resolvers/zod";
import { tweetPatchSchema, tweetPatchSchemaType } from "../lib/validations/tweet";
import { useEffect, useState } from "react";

export default function useHomeHook() {
    const { instance } = axiosInstance();
    const [tweets, setTweets] = useState<TweetType[]>([]);


    const { register, handleSubmit, formState: { errors } } = useForm<tweetPatchSchemaType>({
        resolver: zodResolver(tweetPatchSchema)
    });

    async function onSubmit(data: tweetPatchSchemaType) {
        const response = await instance.post('api/tweet', data);
        console.log(response);
        window.location.reload();
    }

    useEffect(() => {
        async function fetchData() {
            const response = await instance.get('api/tweet');
            if (response !== undefined) {
                setTweets(response.data as TweetType[]);
            }
        }

        fetchData();
    }, [])

    return { tweets, register, handleSubmit, errors, onSubmit };
}