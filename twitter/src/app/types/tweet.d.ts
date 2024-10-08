import { CommentType } from "./comment";
import { User } from "./user";

export type TweetType = {
    id: number;
    content: string;
    createdAt: string;
    updatedAt: string;
    userId: number;
    imageUrls: string[];
    user: User;
    comments: CommentType[];
}