import { CommentType } from "@/app/types/comment";
import { TweetType } from "@/app/types/tweet";
import { User } from "@/app/types/user"

type fieldType = {
    user: User;
    tweet: TweetType;
    comment: CommentType;
}

const defaultUser: User = {
    id: 0,
    name: "",
    email: "",
    emailVerified: "",
    image: "",
    displayName: "",
    phoneNumber: "",
    bio: "",
    location: "",
    website: "",
    birthday: "",
    profileImageUrl: "",
    createdAt: "",
    updatedAt: ""
};

const defaultTweet: TweetType = {
    id: 0,
    content: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    userId: 0,
    imageUrls: [],
    user: defaultUser,
    comments: []
};

const defaultComment: CommentType = {
    id: 0,
    comment: "",
    createdAt: "",
    userId: 1,
    tweetId: 1,
    user: defaultUser,
    // tweet: defaultTweet
}

export const fields: fieldType = {
    user: defaultUser,
    tweet: defaultTweet,
    comment: defaultComment
} as const;