"use client"

import { ProfileApiType } from "@/app/types/profile";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Button from "./Button";
import { Dispatch, SetStateAction } from "react";
import Modal from "./modal/Modal";
import { CurrentUserType } from "@/app/types/user";
import { useProfileComponentHook } from "@/hooks/profile/useProfileComponentHook";
import Link from "next/link";

export default function Profile(
    {
        children,
        router,
        user,
        profile,
        tab,
        setTab
    }: {
        children: React.ReactNode,
        router: AppRouterInstance,
        user: CurrentUserType
        profile: ProfileApiType,
        tab: string,
        setTab: Dispatch<SetStateAction<string>>
    },
) {
    const {
        openModal,
        onClickToggleModal,
        onClickFollow,
        checkFollow,
        onClickUnfollow,
        onClickMessages
    } = useProfileComponentHook(profile.profile);

    return (
        <>
            <div className="flex gap-x-4 items-center p-2 border-b border-black">
                <div
                    className="cursor-pointer"
                    onClick={() => router.back()}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 512 512"><path fill="currentColor" d="M213.3 205.3v-128L0 248l213.3 170.7v-128H512v-85.4z" /></svg>
                </div>
                <h1 className="font-bold text-lg">{profile.profile.displayName ? profile.profile.displayName : profile.profile.name}</h1>
            </div>
            <div>

                <div className="h-48 bg-slate-400 relative">
                    {profile.profile.profileImageUrl && <img className="w-full h-full" src={profile.profile.profileImageUrl} alt="プロフィール画像" />}
                </div>
                <div className="ml-3 bg-slate-400 w-28 h-28 md:w-32 md:h-32 rounded-full absolute top-40">
                    {profile.profile.image && <img className="w-full h-full rounded-full" src={profile.profile.image} alt="プロフィール・アイコン" />}
                </div>
                <div className="flex justify-end p-4 items-center gap-x-3">
                    {(profile.profile.id === user?.id) ? (
                        <Button
                            className="rounded-full border border-black px-2 py-1"
                            onClick={onClickToggleModal}
                        >Edit Profile</Button>
                    ) : (
                        <>
                            {profile.isGroup ? (
                                <Link
                                    className="border-black border rounded-full p-2"
                                    href={`/groups/${profile.commonGroupId}`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><path d="m22 6l-10 7L2 6" /></g></svg>
                                </Link>
                            ) : (
                                <div
                                    className="border-black border rounded-full p-2 cursor-pointer"
                                    onClick={onClickMessages}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><path d="m22 6l-10 7L2 6" /></g></svg>
                                </div>
                            )}
                            {checkFollow ? (
                                <Button
                                    className="rounded-full border border-black px-2 py-1 bg-black text-white"
                                    onClick={onClickUnfollow}
                                >Following</Button>
                            ) : (
                                <Button
                                    className="rounded-full border border-black px-2 py-1"
                                    onClick={onClickFollow}
                                >Follow</Button>
                            )}
                        </>
                    )}
                </div>
            </div>
            <div className="mb-8 px-4 space-y-10">
                <h1 className="text-xl">{profile.profile.displayName ? profile.profile.displayName : profile.profile.name}</h1>
                <p>{profile.profile.bio}</p>
                <p>{profile.profile.website}</p>
                <div className="flex gap-x-3">
                    <p>{profile.profile.following.length} Following</p>
                    <p>{profile.profile.followers.length} Followers</p>
                </div>
            </div>
            <ul className="list-reset flex border-b border-black overflow-x-auto">
                <li
                    className="-mb-px mr-1 w-1/2 mx-auto border-black text-center cursor-pointer hover:bg-slate-300"
                    onClick={() => setTab("posts")}
                >
                    <span className={`inline-block rounded-t py-2 px-4 text-blue-dark font-semibold ${tab === "posts" && "border-b-8 border-blue-300"}`}
                    >Posts</span>
                </li>
                <li
                    className="mr-1 w-1/2 text-center cursor-pointer hover:bg-slate-300"
                    onClick={() => setTab("comments")}
                >
                    <span className={`inline-block py-2 px-4 text-blue hover:text-blue-darker font-semibold ${tab === "comments" && "border-b-8 border-blue-300"}`}
                    >Comments</span>
                </li>
                <li
                    className="mr-1 w-1/2 text-center cursor-pointer hover:bg-slate-300"
                    onClick={() => setTab("highlights")}
                >
                    <span className={`inline-block py-2 px-4 text-blue hover:text-blue-darker font-semibold ${tab === "highlights" && "border-b-8 border-blue-300"}`}>Highlights</span>
                </li>
                <li
                    className="mr-1 w-1/2 text-center cursor-pointer hover:bg-slate-300"
                    onClick={() => setTab("articles")}
                >
                    <span className={`inline-block py-2 px-4 text-blue hover:text-blue-darker font-semibold ${tab === "articles" && "border-b-8 border-blue-300"}`}>Articles</span>
                </li>
                <li
                    className="mr-1 w-1/2 text-center cursor-pointer hover:bg-slate-300"
                    onClick={() => setTab("medias")}
                >
                    <span className={`inline-block py-2 px-4 text-blue hover:text-blue-darker font-semibold ${tab === "medias" && "border-b-8 border-blue-300"}`}>Medias</span>
                </li>
                <li
                    className="mr-1 w-1/2 text-center cursor-pointer hover:bg-slate-300"
                    onClick={() => setTab("likes")}
                >
                    <span className={`inline-block py-2 px-4 text-blue hover:text-blue-darker font-semibold ${tab === "likes" && "border-b-8 border-blue-300"}`}>Likes</span>
                </li>
            </ul>
            <div>
                {children}
            </div>
            {openModal && <Modal
                openModal={openModal}
                setOpenModal={onClickToggleModal}
                profile={profile.profile}
            />}
        </>
    );
}