import { ProfileType } from "@/app/types/profile";
import axiosInstance from "@/lib/axiosInstance";
import { fileRead, fileUpload, uploadImage } from "@/lib/fileUpload";
import { profilePatchSchema, profilePatchSchemaType } from "@/lib/validations/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

type ProfileImagesType = {
    profileImageUrl?: string;
    image?: string;
}

export const useModalHook = (profile: ProfileType) => {
    const [profileImageUrl, setProfileImageUrl] = useState<string>(profile.profileImageUrl);
    const [avatarUrl, setAvatarUrl] = useState<string>(profile.image);

    const { displayName, bio, location, website } = profile;

    const { instance } = axiosInstance();

    const profileInputRef = useRef<HTMLInputElement | null>(null);
    const avatarInputRef = useRef<HTMLInputElement | null>(null);
    const fileOnClickProfile = fileUpload(profileInputRef);

    const fileOnClickAvatar = fileUpload(avatarInputRef);

    const fileInput = async (e: React.ChangeEvent<HTMLInputElement>, setImage: React.Dispatch<React.SetStateAction<string>>) => {
        const files = Array.from(e.target.files || []);

        if (files.length > 0) {
            const imageData = await fileRead(files[0]);
            setImage(imageData);
        }
    }

    const checkFormChange = (data: profilePatchSchemaType) => {
        if (data.displayName !== profile.displayName ||
            data.bio !== profile.bio ||
            data.location !== profile.location ||
            data.website !== profile.website
        ) {
            return true;
        }

        return false;
    }

    const { register, handleSubmit, formState: { errors } } = useForm<profilePatchSchemaType>({
        resolver: zodResolver(profilePatchSchema),
        defaultValues: {
            displayName,
            bio,
            location,
            website
        }
    });

    // プロフィール画像をアップロード
    const newProfileImageData = async () => {
        let newProfileImagaData: string;
        let newAvatarData: string;
        let profileImages: ProfileImagesType = {};

        if (profile.profileImageUrl !== profileImageUrl) {
            newProfileImagaData = await (async () => {
                const imageUrl = await uploadImage(instance, profileImageUrl);
                return imageUrl.data;
            })();
            profileImages.profileImageUrl = newProfileImagaData;
        }

        if (profile.image !== avatarUrl) {
            newAvatarData = await (async () => {
                const imageUrl = await uploadImage(instance, avatarUrl);
                return imageUrl.data;
            })();
            profileImages.image = newAvatarData;
        }

        return profileImages;
    }

    const saveProfile = async (data: profilePatchSchemaType) => {
        const profileImages: ProfileImagesType = await newProfileImageData();

        // 新しいプロフィール画像を入力したかどうか
        if ("profileImageUrl" in profileImages || "image" in profileImages) {
            // プロフィール情報を変更したかどうか
            if (checkFormChange(data)) {
                const response = await instance.put("/api/profile", {
                    ...data,
                    ...profileImages
                });
                console.log(response);
            } else {
                const response = await instance.put("/api/profile", {
                    ...profileImages
                });
                console.log(response);
            }
        } else {
            if (checkFormChange(data)) {
                const response = await instance.put("/api/profile", {
                    ...data
                });
                console.log(response);
            }
        }
    }


    return {
        profileImageUrl,
        avatarUrl,
        profileInputRef,
        fileOnClickProfile,
        avatarInputRef,
        fileOnClickAvatar,
        fileInputProfile: (e: React.ChangeEvent<HTMLInputElement>) => fileInput(e, setProfileImageUrl),
        fileInputAvatar: (e: React.ChangeEvent<HTMLInputElement>) => fileInput(e, setAvatarUrl),
        register,
        handleSubmit,
        errors,
        saveProfile
    };
}