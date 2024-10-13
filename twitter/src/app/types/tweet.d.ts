import { CommentType } from "./comment";
import { RetweetType } from "./retweet";
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
    retweets: RetweetType[];
}