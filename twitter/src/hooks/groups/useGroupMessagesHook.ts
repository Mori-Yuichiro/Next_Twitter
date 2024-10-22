import { EntryType } from "@/app/types/entry";
import { MessageType } from "@/app/types/messages";
import axiosInstance from "@/lib/axiosInstance";
import { messagePatchSchema, MessagePatchSchemaType } from "@/lib/validations/message";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleReload } from "@/store/slice/slice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";


export const useGroupMessagesHook = (groupId: string) => {
    const router = useRouter();
    const { instance } = axiosInstance();
    const [messages, setMessages] = useState<MessageType[] | null>(null);
    const [entry, setEntry] = useState<EntryType | null>(null);

    const user = useAppSelector(state => state.slice.currentUser);
    const reload = useAppSelector(state => state.slice.reload);
    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<MessagePatchSchemaType>({
        resolver: zodResolver(messagePatchSchema)
    });

    const onSubmit = async (data: MessagePatchSchemaType) => {
        const response = await instance.post(`/api/group/${groupId}/message`, data);

        if (response.status === 200) {
            dispatch(toggleReload(!reload));
            reset({ message: "" });
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await instance.get(`/api/group/${groupId}/message`);

            if (response.status === 200) {
                setMessages(response.data.messages);
                setEntry(response.data.entry);
            }
        }

        fetchData();
    }, [reload])

    return {
        router,
        messages,
        entry,
        user,
        register,
        handleSubmit,
        errors,
        onSubmit
    };
}