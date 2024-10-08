import { useForm } from "react-hook-form";
import axiosInstance from "../lib/axiosInstance";
import { TweetType } from "../app/types/tweet";
import { zodResolver } from "@hookform/resolvers/zod";
import { tweetPatchSchema, tweetPatchSchemaType } from "../lib/validations/tweet";
import { useEffect, useRef, useState } from "react";
import { fileRead, fileUpload, uploadImage } from "@/lib/fileUpload";
import { ImageType } from "@/app/types/image";
import { v4 as uuid } from "uuid";
import { useAppSelector } from "@/store/hooks";


export default function useHomeHook() {
    const { instance } = axiosInstance();
    const [tweets, setTweets] = useState<TweetType[]>([]);

    const openDeleteModal = useAppSelector(state => state.slice.openDeleteModal);

    const [images, setImages] = useState<ImageType[]>([]);
    const [imageDatas, setImageDatas] = useState<(string | ArrayBuffer | null)[]>([]);

    const fileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedImages = [];
        const selectedImageDatas = [];

        const files = Array.from(e.target.files || []);
        for (const file of files) {
            const mediaString = uuid();
            selectedImages.push({
                data: await fileRead(file),
                fileName: file.name,
                mediaString
            });
            selectedImageDatas.push(await fileRead(file));
            setImageDatas([...imageDatas, ...selectedImageDatas]);
        }
        setImages([...images, ...selectedImages]);
    }

    const { register, handleSubmit, formState: { errors } } = useForm<tweetPatchSchemaType>({
        resolver: zodResolver(tweetPatchSchema)
    });

    async function onSubmit(data: tweetPatchSchemaType) {
        try {
            if (images.length > 0) {
                const imageUrls: string[] = await Promise.all(imageDatas.map(async (imageData) => {
                    const imageUrl = await uploadImage(instance, imageData);
                    return imageUrl.data;
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
    const fileOnClick = fileUpload(inputRef);

    const deleteDisplayImage = (mediaStr: string) => {
        const selectImage = images.find(image => image.mediaString === mediaStr);
        // 表示する画像を削除
        const updateImages = images.filter(image => image !== selectImage);
        setImages(updateImages);
        // 削除した画像を保存用データから削除
        const updateImageData = imageDatas.filter(imageData => imageData !== selectImage?.data);
        setImageDatas(updateImageData);
    }

    useEffect(() => {
        async function fetchData() {
            const response = await instance.get('api/tweet');
            if (response !== undefined) {
                setTweets(response.data as TweetType[]);
            }
        }
        fetchData();
    }, [images, openDeleteModal])

    return {
        tweets,
        register,
        handleSubmit,
        errors,
        onSubmit,
        inputRef,
        fileOnClick,
        fileInput,
        images,
        deleteDisplayImage
    };
}