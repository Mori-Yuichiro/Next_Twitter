import axiosInstance from "@/lib/axiosInstance";
import { commentPatchSchema, commentPatchSchemaType } from "@/lib/validations/comment";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleCommentModal, toggleReload } from "@/store/slice/slice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function useCommentModalHook(tweetId: number) {
    const openCommentModal = useAppSelector(state => state.slice.openCommentModal);
    const reload = useAppSelector(state => state.slice.reload);
    const dispatch = useAppDispatch();

    const { instance } = axiosInstance()

    const { register, handleSubmit, reset, formState: { errors } } = useForm<commentPatchSchemaType>({
        resolver: zodResolver(commentPatchSchema)
    });

    async function onSubmit(data: commentPatchSchemaType) {
        try {
            const result = await instance.post("/api/comment", {
                ...data,
                tweetId
            });
            console.log(result);
            reset({ "comment": "" });
            dispatch(toggleCommentModal(!openCommentModal));
            dispatch(toggleReload(!reload));
        } catch (err) {
            console.error(`Error: ${err}`);
        }
    }

    return {
        setOpenCommentModal: () => dispatch(toggleCommentModal(!openCommentModal)),
        register,
        handleSubmit,
        errors,
        onSubmit
    }
}