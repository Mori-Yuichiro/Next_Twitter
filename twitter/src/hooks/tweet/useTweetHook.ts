import { TweetType } from "@/app/types/tweet";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleCommentModal } from "@/store/slice/slice";
import { usePathname } from "next/navigation";
import { useState } from "react";


export default function useTweetHook(tweet: TweetType) {
    const pathName = usePathname();
    const [openMenu, setOpenMenu] = useState<boolean>(false);

    const openCommentModal = useAppSelector(state => state.slice.openCommentModal);
    const dispatch = useAppDispatch()


    return {
        pathName,
        openMenu,
        setOpenMenu,
        openCommentModal,
        setOpenCommentModal: () => dispatch(toggleCommentModal(!openCommentModal))
    }
}