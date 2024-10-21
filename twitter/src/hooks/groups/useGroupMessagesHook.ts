import { EntryType } from "@/app/types/entry";
import { MessageType } from "@/app/types/messages";
import axiosInstance from "@/lib/axiosInstance";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";


export const useGroupMessagesHook = (groupId: string) => {
    const router = useRouter();
    const { instance } = axiosInstance();
    const [messages, setMessages] = useState<MessageType[] | null>(null);
    const [entry, setEntry] = useState<EntryType | null>(null);

    const user = useAppSelector(state => state.slice.currentUser);

    useEffect(() => {
        const fetchData = async () => {
            const response = await instance.get(`/api/group/${groupId}/message`);

            if (response.status === 200) {
                setMessages(response.data.messages);
                setEntry(response.data.entry);
            }
        }

        fetchData();
    }, [])

    return {
        router,
        messages,
        entry,
        user
    };
}