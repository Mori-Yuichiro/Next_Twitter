import { TweetType } from "@/app/types/tweet";
import axiosInstance from "@/lib/axiosInstance";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleCommentModal, toggleReload } from "@/store/slice/slice";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";


export default function useTweetHook(tweet: TweetType) {
    const pathName = usePathname();
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const [checkRetweet, setCheckRetweet] = useState<boolean>(false);

    const { instance } = axiosInstance();

    const openCommentModal = useAppSelector(state => state.slice.openCommentModal);
    const reload = useAppSelector(state => state.slice.reload);
    const dispatch = useAppDispatch()

    const onClickRetweet = async () => {
        try {
            const response = await instance.post(`/api/tweet/${tweet.id}/retweet`)
                .catch(err => {
                    throw err;
                });
            console.log(response);
            dispatch(toggleReload(!reload));
        } catch (err) {
            console.error(err);
        }
    }

    const onClickDeleteRetweet = async () => {
        try {
            const response = await instance.delete(`/api/tweet/${tweet.id}/retweet`)
                .catch(err => {
                    throw err;
                });
            console.log(response);
            dispatch(toggleReload(!reload));
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        setCheckRetweet(
            tweet.retweets.some(retweet => retweet.userId === tweet.user.id)
        );
    }, [tweet.retweets])

    return {
        pathName,
        openMenu,
        setOpenMenu,
        openCommentModal,
        setOpenCommentModal: () => dispatch(toggleCommentModal(!openCommentModal)),
        onClickRetweet,
        onClickDeleteRetweet,
        checkRetweet,
    }
}