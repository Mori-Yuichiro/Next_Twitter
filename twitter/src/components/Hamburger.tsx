import { TweetType } from "@/app/types/tweet";
import useHamburgerHook from "@/hooks/tweet/useHamburgerHook";

export default function Hamburger({ tweet }: { tweet: TweetType }) {
    const { onClickDeleteTweet } = useHamburgerHook(tweet);

    return (
        <>
            <div className="w-20 h-10 border border-black bg-white absolute top-4 right-10 flex items-center justify-center">
                <p
                    className="text-red-600 cursor-pointer"
                    onClick={onClickDeleteTweet}
                >削除</p>
            </div>
        </>
    );
}