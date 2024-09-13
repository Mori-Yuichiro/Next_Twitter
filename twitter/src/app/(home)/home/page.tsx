"use client"

import Button from "@/app/components/Button";
import Tweet from "@/app/components/Tweet";
import useHomeHook from "@/app/hooks/useHomeHook";

export default function HomePage() {
    const { tweets, register, handleSubmit, errors, onSubmit } = useHomeHook();

    return (
        <div>
            <ul className="list-reset flex border-b border-black sticky">
                <li className="-mb-px mr-1 w-1/2 mx-auto border-r border-black text-center">
                    <a className="inline-block rounded-t py-2 px-4 text-blue-dark font-semibold" href="#">For You</a>
                </li>
                <li className="mr-1 w-1/2 text-center">
                    <a className="inline-block py-2 px-4 text-blue hover:text-blue-darker font-semibold" href="#">Following</a>
                </li>
            </ul>
            <div className="border-b border-black p-3">
                {errors && <p>{errors.content?.message}</p>}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-5"
                >
                    <input
                        id="content"
                        type="text"
                        placeholder="What's happening?!"
                        className="p-3 rounded-full w-2/3"
                        {...register("content")}
                    />
                    <div className="flex justify-between">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 56 56"><path fill="currentColor" d="M7.715 49.574h40.57c4.899 0 7.36-2.437 7.36-7.265V13.69c0-4.828-2.461-7.265-7.36-7.265H7.715C2.84 6.426.355 8.84.355 13.69v28.62c0 4.851 2.485 7.265 7.36 7.265m31.57-21.633c-1.055-.937-2.25-1.43-3.515-1.43c-1.313 0-2.462.446-3.54 1.407l-10.593 9.469l-4.336-3.938c-.985-.867-2.04-1.336-3.164-1.336c-1.032 0-2.04.446-3 1.313L4.129 39.73V13.88c0-2.438 1.312-3.68 3.656-3.68h40.43c2.32 0 3.656 1.242 3.656 3.68v25.875Zm-21.469.258c3.024 0 5.508-2.484 5.508-5.531c0-3.023-2.484-5.531-5.508-5.531c-3.046 0-5.53 2.508-5.53 5.531a5.541 5.541 0 0 0 5.53 5.531" /></svg>
                        <Button className="bg-cyan-400 rounded-full w-20 p-1">Post</Button>
                    </div>
                </form>
            </div>
            {tweets.map(tweet => (
                <div
                    key={tweet.id}
                    className="border-b border-black"
                >
                    <Tweet tweet={tweet} />
                </div>
            ))}
        </div>
    );
}