import { ProfileType } from "@/app/types/profile";
import axiosInstance from "@/lib/axiosInstance";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";

export const useProfileHook = (id: string) => {
    const { instance } = axiosInstance();
    const router = useRouter();

    const [profile, setProfile] = useState<ProfileType>({
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
        profileImageUrl: "",
        createdAt: "",
        updatedAt: "",
        tweets: [{
            id: 0,
            content: "",
            createdAt: "",
            updatedAt: "",
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
                profileImageUrl: "",
                createdAt: "",
                updatedAt: ""
            }
        }]
    });

    const [tab, setTab] = useState<string>("posts");

    useEffect(() => {
        async function fetchData() {
            const response = await instance.get(`/api/users/${id}`);
            setProfile(response.data);
        }
        fetchData();
    }, [])

    return {
        router,
        profile,
        tab,
        setTab
    };
}