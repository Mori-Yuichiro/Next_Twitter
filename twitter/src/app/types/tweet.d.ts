import { User } from "./user";

export type TweetType = {
    id: number;
    content: string;
    createdAt: string;
    updatedAt: string;
    userId: number;
    user: User;
}