import { ProfileType } from "@/app/types/profile";
import axiosInstance from "@/lib/axiosInstance";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";

export const useProfileHook = (id: string) => {
    const { instance } = axiosInstance();
    const router = useRouter();

    const openModal = useAppSelector(state => state.slice.openModal);

    const [profile, setProfile] = useState<ProfileType | null>(null);

    const [tab, setTab] = useState<string>("posts");

    useEffect(() => {
        async function fetchData() {
            const response = await instance.get(`/api/users/${id}`);
            setProfile(response.data);
        }
        fetchData();
    }, [openModal])

    return {
        router,
        profile,
        tab,
        setTab
    };
}