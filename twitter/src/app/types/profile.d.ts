import { UserType } from "@/app/types/user";
import { TweetType } from "./tweet";
import { CommentType } from "./comment";
import { RetweetType } from "./retweet";
import { FavoriteType } from "./favorite";
import { RelationshipType } from "./relationship";


// type ProfileTweetType = Omit<TweetType, "user">;

// export type ProfileType = User & { tweets: ProfileTweetType[] }

export type ProfileType = UserType &
{ tweets: TweetType[] } &
{ comments: CommentType[] } &
{ retweets: RetweetType[] } &
{ favorites: (FavoriteType & { tweet: TweetType })[] } &
{ following: RelationshipType[] } &
{ followers: RelationshipType[] }

export type ProfileApiType = {
    profile: ProfileType;
    isGroup: boolean;
    commonGroupId?: number;
}