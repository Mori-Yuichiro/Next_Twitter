import { ProfileType } from "@/app/types/profile";
import axiosInstance from "@/lib/axiosInstance";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleModal, toggleReload } from "@/store/slice/slice";
import { useEffect, useState } from "react";

export const useProfileComponentHook = (profile: ProfileType) => {
    const { instance } = axiosInstance();

    const [checkFollow, setCheckFollow] = useState<boolean>(false);

    const openModal = useAppSelector(state => state.slice.openModal);
    const reload = useAppSelector(state => state.slice.reload);
    const user = useAppSelector(state => state.slice.currentUser);
    const dispatch = useAppDispatch();

    const onClickToggleModal = () => {
        dispatch(toggleModal(!openModal));
    }

    const onClickFollow = async () => {
        try {
            const response = await instance.post(`/api/users/${profile.id}/follow`);

            if (response.status === 200) {
                dispatch(toggleReload(!reload));
            } else {
                throw new Error("フォローに失敗しました");
            }
        } catch (err) {
            console.error(err);
        }
    }

    const onClickUnfollow = async () => {
        try {
            const response = await instance.delete(`/api/users/${profile.id}/follow`);

            if (response.status === 200) {
                dispatch(toggleReload(!reload));
            } else {
                throw new Error("フォロー削除に失敗しました");
            }
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        setCheckFollow(
            profile.followers.some(follower => follower.followerId === user?.id)
        );
    }, [profile.followers, profile.following, reload])

    return {
        openModal,
        onClickToggleModal,
        checkFollow,
        onClickFollow,
        onClickUnfollow
    };
}