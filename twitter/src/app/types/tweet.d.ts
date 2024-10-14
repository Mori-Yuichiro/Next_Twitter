import { CommentType } from "./comment";
import { FavoriteType } from "./favorite";
import { RetweetType } from "./retweet";
import { UserType } from "./user";

export type TweetType = {
    id: number;
    content: string;
    createdAt: string;
    updatedAt: string;
    userId: number;
    imageUrls: string[];
    user: UserType;
    comments: CommentType[];
    retweets: RetweetType[];
    favorites: FavoriteType[];
}