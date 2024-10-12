import { User } from "@/app/types/user";
import { TweetType } from "./tweet";
import { CommentType } from "./comment";


// type ProfileTweetType = Omit<TweetType, "user">;

// export type ProfileType = User & { tweets: ProfileTweetType[] }
export type ProfileType = User &
{ tweets: TweetType[] } &
{ comments: CommentType[] }