import { UserType } from "./user";

export type EntryType = {
    id: number;
    userId: number;
    groupId: number;
    user: UserType;
}