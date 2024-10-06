"use client"

import { TweetType } from "@/app/types/tweet";
import useTweetHook from "@/hooks/tweet/useTweetHook";
import Link from "next/link";

export default function Tweet({ tweet }: { tweet: TweetType }) {
    const { pathName } = useTweetHook();

    return (
        <div>
            <div className="flex gap-3 p-4">
                <Link
                    href={`/profile/${tweet.user.id}`}
                    className="bg-slate-400 w-10 h-10 rounded-full"
                >
                    {tweet.user.image && <img
                        src={tweet.user.image}
                        alt="icon"
                        className="w-full h-full rounded-full"
                    />}
                </Link>
                <div className="flex flex-col gap-y-2 w-[calc(100%-40px)]">
                    <Link href={`/profile/${tweet.user.id}`}>
                        <p>{tweet.user.displayName ? tweet.user.displayName : tweet.user.name}</p>
                    </Link>
                    {(pathName !== "/tweet\/([0-9]+)") ?
                        <Link href={"/tweet/" + tweet.id}>
                            <p>{tweet.content}</p>
                        </Link>
                        : <p>{tweet.content}</p>
                    }
                    {(tweet.imageUrls.length > 0) &&
                        <div className={`gap-x-4 gap-y-3 grid ${tweet.imageUrls.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}>
                            {tweet.imageUrls.map(imageUrl => {
                                return (
                                    <div key={imageUrl} className={(tweet.imageUrls.length > 0) ? "w-1/2" : undefined}>
                                        <Link
                                            href={imageUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            <img src={imageUrl} alt="ツイート画像" />
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>}
                </div>
            </div>
            <div className="flex justify-between p-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 1024 1024"><path fill="currentColor" d="M512 896q-66 0-134-16q-34 40-69.5 69.5t-60 43.5t-47.5 21.5t-30.5 8.5t-10.5 1q26-57 30-124.5T176 786Q94 723 47 635T0 448q0-91 40.5-174t109-143T313 35.5T512 0t199 35.5T874.5 131t109 143t40.5 174t-40.5 174t-109 143T711 860.5T512 896z" /></svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 16 16"><path fill="currentColor" d="M2 1h12v5h2l-3 3l-3-3h2V3H4v2H2zm12 13H2V9H0l3-3l3 3H4v3h8v-2h2z" /></svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M12.001 3.818a6.228 6.228 0 0 1 8.51 9.087l-5.224 5.225h-.001L12 21.415l-7.28-7.279l-1.23-1.232c-.001 0 0 0 0 0A6.228 6.228 0 0 1 12 3.818Zm3.285 11.485l3.811-3.812a4.228 4.228 0 1 0-5.98-5.98L12 6.627L10.883 5.51a4.228 4.228 0 1 0-5.98 5.98l1.232 1.232L12 18.587l3.285-3.285Z" /></svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 56 56"><path fill="currentColor" d="M12.016 53.16c1.218 0 1.922-.61 4.289-2.976L27.672 38.84c.117-.094.234-.188.328-.188c.117 0 .21.094.328.188l11.39 11.344c2.321 2.32 3.071 2.976 4.266 2.976c1.477 0 2.602-.89 2.602-3.023V10.176c0-4.875-2.414-7.336-7.266-7.336H16.68c-4.828 0-7.266 2.46-7.266 7.336v39.96c0 2.134 1.149 3.024 2.602 3.024m1.757-5.695c-.328.328-.585.234-.585-.211V10.246c0-2.344 1.265-3.633 3.703-3.633h22.242c2.437 0 3.68 1.29 3.68 3.633v37.008c0 .445-.258.516-.587.21L29.173 34.552c-.399-.422-.82-.54-1.172-.54c-.328 0-.75.118-1.172.54Z" /></svg>
            </div>
        </div>
    );
}