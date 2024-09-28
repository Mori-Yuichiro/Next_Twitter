import { useForm } from "react-hook-form";
import axiosInstance from "../lib/axiosInstance";
import { TweetType } from "../app/types/tweet";
import { zodResolver } from "@hookform/resolvers/zod";
import { tweetPatchSchema, tweetPatchSchemaType } from "../lib/validations/tweet";
import { useEffect, useRef, useState } from "react";
import { fileRead } from "@/lib/fileUpload";
import { ImageType } from "@/app/types/image";


export default function useHomeHook() {
    const { instance } = axiosInstance();
    const [tweets, setTweets] = useState<TweetType[]>([]);

    const [images, setImages] = useState<ImageType[]>([]);
    const [imageDatas, setImageDatas] = useState<(string | ArrayBuffer | null)[]>([]);

    const fileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedImages = [];
        const selectedImageDatas = [];

        const files = Array.from(e.target.files || []);
        for (const file of files) {
            selectedImages.push({
                data: await fileRead(file),
                fileName: file.name
            });
            selectedImageDatas.push(await fileRead(file));
            setImageDatas([...imageDatas, ...selectedImageDatas]);
        }
        setImages([...images, ...selectedImages]);
    }

    const uploadImage = async (imageData: string | ArrayBuffer | null) => {
        return await instance.post('api/image-upload', {
            imageData
        });
    }

    const { register, handleSubmit, formState: { errors } } = useForm<tweetPatchSchemaType>({
        resolver: zodResolver(tweetPatchSchema)
    });

    async function onSubmit(data: tweetPatchSchemaType) {
        try {
            if (images.length > 0) {
                const imageUrls: string[] = await Promise.all(imageDatas.map(async (imageData) => {
                    const data = await uploadImage(imageData);
                    return data.data;
                }));
                await instance.post('api/tweet', {
                    ...data,
                    imageUrls
                });
            } else {
                await instance.post('api/tweet', data);
            }
            window.location.reload();
        } catch (error) {
            console.error(`Error: ${error}`);
        }
    }

    const inputRef = useRef<HTMLInputElement | null>(null);
    const fileUpload = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    }

    useEffect(() => {
        async function fetchData() {
            const response = await instance.get('api/tweet');
            if (response !== undefined) {
                setTweets(response.data as TweetType[]);
            }
        }

        fetchData();
    }, [])

    return {
        tweets,
        register,
        handleSubmit,
        errors,
        onSubmit,
        inputRef,
        fileUpload,
        fileInput,
        images,
        uploadImage
    };
}