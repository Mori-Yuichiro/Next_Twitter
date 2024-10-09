import { TweetType } from "@/app/types/tweet";
import { User } from "@/app/types/user"

type fieldType = {
    user: User;
    tweet: TweetType
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

export const fields: fieldType = {
    user: defaultUser,
    tweet: {
        id: 0,
        content: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: 0,
        imageUrls: [],
        user: defaultUser
    }
} as const;