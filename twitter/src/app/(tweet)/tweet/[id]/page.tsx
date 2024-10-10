"use client"

import Button from "@/components/Button";
import Comment from "@/components/Comment";
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
            ) : <div className="min-h-screen">
                <svg className="animate-spin my-10 mx-auto" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth="2" d="M13 4a1 1 0 1 1-2 0a1 1 0 0 1 2 0ZM7.34 6.34a1 1 0 1 1-2 0a1 1 0 0 1 2 0Zm11.32 0a1 1 0 1 1-2 0a1 1 0 0 1 2 0Zm0 11.32a1 1 0 1 1-2 0a1 1 0 0 1 2 0Zm-11.32 0a1 1 0 1 1-2 0a1 1 0 0 1 2 0ZM21 12a1 1 0 1 1-2 0a1 1 0 0 1 2 0Zm-8 8a1 1 0 1 1-2 0a1 1 0 0 1 2 0Zm-8-8a1 1 0 1 1-2 0a1 1 0 0 1 2 0Z" /></svg>
            </div>}
        </div>
    );
}