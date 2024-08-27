"use client"

import Button from "@/app/components/Button";
import UserAuthForm from "@/app/components/UserAuthForm";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function Login() {
    const [isGithubLoading, setIsGithubLoading] = useState<boolean>(false);

    return (
        <div className="container flex flex-col gap-5 min-h-screen items-center justify-center w-96 mx-auto">
            <h1 className="text-3xl">ログイン</h1>
            <UserAuthForm />
            <span>または</span>
            <Button
                className="flex items-center justify-center gap-3 border rounded-lg w-full border-black py-2"
                onClick={() => {
                    setIsGithubLoading(true);
                    signIn("github");
                }}
            >
                {isGithubLoading ?
                    <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="2" d="M13 4a1 1 0 1 1-2 0a1 1 0 0 1 2 0ZM7.34 6.34a1 1 0 1 1-2 0a1 1 0 0 1 2 0Zm11.32 0a1 1 0 1 1-2 0a1 1 0 0 1 2 0Zm0 11.32a1 1 0 1 1-2 0a1 1 0 0 1 2 0Zm-11.32 0a1 1 0 1 1-2 0a1 1 0 0 1 2 0ZM21 12a1 1 0 1 1-2 0a1 1 0 0 1 2 0Zm-8 8a1 1 0 1 1-2 0a1 1 0 0 1 2 0Zm-8-8a1 1 0 1 1-2 0a1 1 0 0 1 2 0Z" /></svg>
                    : <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 432 416"><path fill="currentColor" d="M213.5 0q88.5 0 151 62.5T427 213q0 70-41 125.5T281 416q-14 2-14-11v-58q0-27-15-40q44-5 70.5-27t26.5-77q0-34-22-58q11-26-2-57q-18-5-58 22q-26-7-54-7t-53 7q-18-12-32.5-17.5T107 88h-6q-12 31-2 57q-22 24-22 58q0 55 27 77t70 27q-11 10-13 29q-42 18-62-18q-12-20-33-22q-2 0-4.5.5t-5 3.5t8.5 9q14 7 23 31q1 2 2 4.5t6.5 9.5t13 10.5T130 371t30-2v36q0 13-14 11q-64-22-105-77.5T0 213q0-88 62.5-150.5T213.5 0z" /></svg>}
                GitHubでログイン
            </Button>
        </div>
    );
}