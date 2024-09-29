"use client"

import Tweet from "@/components/Tweet";
import useTweetDetailHook from "@/hooks/tweet/useTweetDetailHook";

export default function TweetDetailPage(
    { params }: { params: { id: string } }
) {
    const { tweetDetail, router } = useTweetDetailHook(params.id);

    return (
        <div className="break-words">
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
        </div>
    );
}