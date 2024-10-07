"use client"

import { ProfileType } from "@/app/types/profile";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Button from "./Button";
import { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import Modal from "./Modal";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleModal } from "@/store/slice/slice";

export default function Profile(
    {
        children,
        router,
        profile,
        tab,
        setTab
    }: {
        children: React.ReactNode,
        router: AppRouterInstance,
        profile: ProfileType,
        tab: string,
        setTab: Dispatch<SetStateAction<string>>
    },
) {
    const openModal = useAppSelector(state => state.slice.openModal);
    const dispatch = useAppDispatch();

    const onClickToggleModal = () => {
        dispatch(toggleModal(!openModal));
    }


    return (
        <>
            <div className="flex gap-x-4 items-center p-2 border-b border-black">
                <div
                    className="cursor-pointer"
                    onClick={() => router.back()}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 512 512"><path fill="currentColor" d="M213.3 205.3v-128L0 248l213.3 170.7v-128H512v-85.4z" /></svg>
                </div>
                <h1 className="font-bold text-lg">{profile.displayName ? profile.displayName : profile.name}</h1>
            </div>
            <div>

                <div className="h-48 bg-slate-400 relative">
                    {profile.profileImageUrl && <img className="w-full h-full" src={profile.profileImageUrl} alt="プロフィール画像" />}
                </div>
                <div className="ml-3 bg-slate-400 w-28 h-28 md:w-32 md:h-32 rounded-full absolute top-40">
                    {profile.image && <img className="w-full h-full rounded-full" src={profile.image} alt="プロフィール・アイコン" />}
                </div>
                <div className="flex justify-end p-4">
                    <Button
                        className="rounded-full border border-black px-2 py-1"
                        onClick={onClickToggleModal}
                    >Edit Profile</Button>
                </div>
            </div>
            <div className="mb-8 px-4 space-y-10">
                <h1 className="text-xl">{profile.displayName ? profile.displayName : profile.name}</h1>
                <p>{profile.bio}</p>
                <p>{profile.website}</p>
                <div className="flex gap-x-3">
                    <p>0 Following</p>
                    <p>0 Followers</p>
                </div>
            </div>
            <ul className="list-reset flex border-b border-black overflow-x-auto">
                <li className="-mb-px mr-1 w-1/2 mx-auto border-black text-center hover:bg-slate-300">
                    <Link
                        className={`inline-block rounded-t py-2 px-4 text-blue-dark font-semibold ${tab === "posts" && "border-b-8 border-blue-300"}`}
                        href={`/profile/${profile.id}`}
                        onClick={() => setTab("posts")}
                    >Posts</Link>
                </li>
                <li className="mr-1 w-1/2 text-center hover:bg-slate-300">
                    <a className="inline-block py-2 px-4 text-blue hover:text-blue-darker font-semibold" href="#">Replies</a>
                </li>
                <li className="mr-1 w-1/2 text-center hover:bg-slate-300">
                    <a className="inline-block py-2 px-4 text-blue hover:text-blue-darker font-semibold" href="#">Highlights</a>
                </li>
                <li className="mr-1 w-1/2 text-center hover:bg-slate-300">
                    <a className="inline-block py-2 px-4 text-blue hover:text-blue-darker font-semibold" href="#">Articles</a>
                </li>
                <li className="mr-1 w-1/2 text-center hover:bg-slate-300">
                    <a className="inline-block py-2 px-4 text-blue hover:text-blue-darker font-semibold" href="#">Medias</a>
                </li>
                <li className="mr-1 w-1/2 text-center hover:bg-slate-300">
                    <a className="inline-block py-2 px-4 text-blue hover:text-blue-darker font-semibold" href="#">Likes</a>
                </li>
            </ul>
            <div>
                {children}
            </div>
            {openModal && <Modal
                openModal={openModal}
                setOpenModal={onClickToggleModal}
                profile={profile}
            />}
        </>
    );
}