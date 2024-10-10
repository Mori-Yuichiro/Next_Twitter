import { TweetType } from "@/app/types/tweet";
import axiosInstance from "@/lib/axiosInstance";
import { commentPatchSchema, commentPatchSchemaType } from "@/lib/validations/comment";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleReload } from "@/store/slice/slice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function useTweetDetailHook(id: string) {
    const [tweetDetail, setTweetDetail] = useState<TweetType | null>(null);

    const reload = useAppSelector(state => state.slice.reload);
    const dispatch = useAppDispatch();

    const { instance } = axiosInstance();

    const router = useRouter();

    const { register, handleSubmit, reset, formState: { errors } } = useForm<commentPatchSchemaType>({
        resolver: zodResolver(commentPatchSchema)
    });

    async function onSubmit(data: commentPatchSchemaType) {
        try {
            const result = await instance.post("/api/comment", {
                ...data,
                tweetId: tweetDetail?.id
            });
            console.log(result);
            reset({ "comment": "" });
            dispatch(toggleReload(!reload));
        } catch (err) {
            console.error(`Error: ${err}`);
        }
    }

    const getTweetDetail = async () => {
        const response = await instance.get(`/api/tweet/${id}`);
        return response.data;
    }

    useEffect(() => {
        async function fetchData() {
            const tweetData: TweetType = await getTweetDetail();
            setTweetDetail(tweetData);
        }

        fetchData();
    }, [reload])

    return {
        tweetDetail,
        router,
        register,
        handleSubmit,
        errors,
        onSubmit,
    };
}