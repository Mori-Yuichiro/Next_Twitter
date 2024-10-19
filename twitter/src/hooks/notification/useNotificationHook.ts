import { NotificationType } from "@/app/types/notification";
import axiosInstance from "@/lib/axiosInstance";
import { useEffect, useState } from "react";

export default function useNotificationHook() {
    const { instance } = axiosInstance();
    const [notifications, setNotifications] = useState<NotificationType[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await instance.get("/api/notification");

            setNotifications(result.data);
        }

        fetchData();
    }, [])

    return { notifications };
}