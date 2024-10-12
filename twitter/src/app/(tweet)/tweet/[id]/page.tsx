"use client"

import Button from "@/components/Button";
import Comment from "@/components/Comment";
import Loading from "@/components/Loading";
import Tweet from "@/components/Tweet";
import useTweetDetailHook from "@/hooks/tweet/useTweetDetailHook";

export default function TweetDetailPage(
    { params }: { params: { id: string } }
) {
    const {
        tweetDetail,
        router,
        register,
        handleSubmit,
        errors,
        onSubmit,
    } = useTweetDetailHook(params.id);


    return (
        <div>
            {tweetDetail ? (
                <>
                    <div className="flex gap-x-4 items-center p-2 border-b border-black">
                        <div
                            className="cursor-pointer"
                            onClick={() => router.back()}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 512 512"><path fill="currentColor" d="M213.3 205.3v-128L0 248l213.3 170.7v-128H512v-85.4z" /></svg>
                        </div>
                        <h1 className="font-bold text-lg">Post</h1>
                    </div>
                    <div className="border-b border-black">
                        <Tweet tweet={tweetDetail} />
                    </div>
                    {errors.comment?.message &&
                        <div className="px-3 py-1">
                            <p className="text-red-500">{errors.comment.message}</p>
                        </div>
                    }
                    <div className="flex p-4 gap-x-3">
                        <div className="rounded-full bg-slate-400 w-10 h-10">
                            {tweetDetail.user.image && <img
                                src={tweetDetail.user.image}
                                alt="ユーザーアイコン"
                                className="rounded-full w-full h-full"
                            />}
                        </div>
                        <input
                            id="comment"
                            type="text"
                            placeholder="Post your reply"
                            className="w-full rounded-lg p-3"
                            {...register("comment")}
                        />
                    </div>
                    <div className="flex justify-end px-4 py-2 border-black border-b">
                        <Button
                            className="border rounded-full w-20 bg-blue-300 py-2"
                            onClick={handleSubmit(onSubmit)}
                        >Reply</Button>
                    </div>
                    {tweetDetail.comments?.length > 0 &&
                        <div>
                            {tweetDetail.comments.map(comment => (
                                <div key={comment.id}>
                                    <Comment comment={comment} />
                                </div>
                            ))}
                        </div>
                    }
                </>
            ) : <Loading />}
        </div>
    );
}