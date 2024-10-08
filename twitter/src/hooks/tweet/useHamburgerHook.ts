import { TweetType } from "@/app/types/tweet";
import axiosInstance from "@/lib/axiosInstance";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleDeleteModal } from "@/store/slice/slice";


export default function useHamburgerHook(tweet: TweetType) {
    const { instance } = axiosInstance();

    const openDeleteModal = useAppSelector(state => state.slice.openDeleteModal);
    const dispatch = useAppDispatch();

    const getCloudinaryPublicId = (url: string) => {
        const urlSplitArray = url.split("/");
        const publicId = urlSplitArray[urlSplitArray.length - 1]
            .split(".")[0];

        return publicId;
    }

    const onClickDeleteTweet = async () => {
        try {
            if (tweet.imageUrls.length > 0) {
                tweet.imageUrls.map(async (imageUrl) => {
                    const publicId = getCloudinaryPublicId(imageUrl);
                    await instance.delete("/api/image-upload", {
                        data: {
                            publicId
                        }
                    }).catch(err => { throw err });
                })
            }

            await instance.delete(`/api/tweet/${tweet.id}`)
                .catch(err => { throw err });

            dispatch(toggleDeleteModal(!openDeleteModal));
        } catch (err) {
            console.error("Front error:" + err);
        }
    }

    return { onClickDeleteTweet };
}