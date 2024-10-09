import { TweetType } from "./tweet";
import { User } from "./user";

export type CommentType = {
    id: number;
    comment: string;
    createdAt: string;
    userId: number;
    tweetId: number;
    user: User;
    tweet: TweetType;
}