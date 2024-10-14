import { TweetType } from "./tweet";
import { UserType } from "./user";

export type CommentType = {
    id: number;
    comment: string;
    createdAt: string;
    userId: number;
    tweetId: number;
    user: UserType;
    // tweet: TweetType;
}