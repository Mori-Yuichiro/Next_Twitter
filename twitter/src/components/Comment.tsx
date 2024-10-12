import { CommentType } from "@/app/types/comment";
import useCommentHook from "@/hooks/comment/useCommentHook";

export default function Comment({ comment }: { comment: CommentType }) {
    const { onClickDeleteComment } = useCommentHook(comment);

    return (
        <div className="flex gap-3 p-4 border-black border-b">
            <div className="w-10 h-10">
                {comment.user.image && <img
                    src={comment.user.image}
                    alt="icon"
                    className="w-full h-full rounded-full"
                />}
            </div>
            <div className="flex flex-col gap-y-2 w-[calc(100%-40px)]">
                <p>{comment.user.displayName ? comment.user.displayName : comment.user.name}</p>
                <p>{comment.comment}</p>
            </div>
            <div
                className="cursor-pointer mx-auto"
                onClick={onClickDeleteComment}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16"><path fill="currentColor" d="M3 9.5a1.5 1.5 0 1 1 0-3a1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3a1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3a1.5 1.5 0 0 1 0 3z" /></svg>
            </div>
        </div>
    );
}