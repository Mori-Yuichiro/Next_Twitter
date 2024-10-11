import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleCommentModal } from "@/store/slice/slice";

export default function useCommentModalHook() {
    const openCommentModal = useAppSelector(state => state.slice.openCommentModal);
    const dispatch = useAppDispatch()

    return {
        setOpenCommentModal: () => dispatch(toggleCommentModal(!openCommentModal))
    }
}