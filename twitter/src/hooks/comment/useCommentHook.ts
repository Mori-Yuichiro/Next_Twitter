import { CommentType } from "@/app/types/comment";
import axiosInstance from "@/lib/axiosInstance";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleReload } from "@/store/slice/slice";

export default function useCommentHook(comment: CommentType) {
    const { instance } = axiosInstance();
    const reload = useAppSelector(state => state.slice.reload);
    const dispatch = useAppDispatch();

    const onClickDeleteComment = async () => {
        try {
            if (window.confirm()) {
                await instance.delete(`/api/comment/${comment.id}`)
                    .catch(err => {
                        throw err
                    });
                dispatch(toggleReload(!reload));
            }
        } catch (err) {
            console.error("comment delete error: " + err);
        }
    }

    return { onClickDeleteComment };
}