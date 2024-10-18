export type UserType = {
    id: number;
    name: string;
    email: string;
    emailVerified: string;
    image: string;
    displayName: string;
    phoneNumber: string;
    bio: string;
    location: string;
    website: string;
    birthday: string;
    profileImageUrl: string;
    createdAt: string;
    updatedAt: string;
}

export type CurrentUserType = UserType | undefined;