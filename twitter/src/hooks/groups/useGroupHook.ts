import { GroupType } from "@/app/types/group";
import axiosInstance from "@/lib/axiosInstance";
import { useEffect, useState } from "react";

export default function useGroupHook() {
    const { instance } = axiosInstance();
    const [groups, setGroups] = useState<GroupType[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await instance.get("/api/group");

            if (response.status === 200) setGroups(response.data);
        }
        fetchData();
    }, [])

    return {
        groups
    };
}