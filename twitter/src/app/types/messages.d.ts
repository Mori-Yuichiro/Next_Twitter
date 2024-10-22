import { UserType } from "@/app/types/user";

export type MessageType = {
    id: number;
    userId: number;
    groupId: number;
    message: string;
    user: UserType;
};