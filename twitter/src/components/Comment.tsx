import { CommentType } from "@/app/types/comment";

export default function Comment({ comment }: { comment: CommentType }) {
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
        </div>
    );
}