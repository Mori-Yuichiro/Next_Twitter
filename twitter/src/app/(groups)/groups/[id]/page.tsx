"use client"

import Button from "@/components/Button";
import Loading from "@/components/Loading";
import { useGroupMessagesHook } from "@/hooks/groups/useGroupMessagesHook";

export default function GroupMessages(
    { params }: { params: { id: string } }
) {
    const {
        router,
        messages,
        entry,
        user,
        register,
        handleSubmit,
        errors,
        onSubmit
    } = useGroupMessagesHook(params.id);


    return (
        <>
            {(messages && entry) ? (
                <div className="border-b border-black flex flex-col min-h-[calc(100vh)]">
                    <div className="flex gap-x-4 items-center p-2 border-b border-black">
                        <div
                            className="cursor-pointer"
                            onClick={() => router.back()}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 512 512"><path fill="currentColor" d="M213.3 205.3v-128L0 248l213.3 170.7v-128H512v-85.4z" /></svg>
                        </div>
                        <h1 className="font-bold text-lg">
                            {entry.user.displayName ? entry.user.displayName : entry.user.name}
                        </h1>
                    </div>
                    {messages.map(message => (
                        <div
                            key={message.id}
                            className="flex flex-col gap-y-3"
                        >
                            {(message.userId === user?.id) ? (
                                <div className="p-3 h-[calc(100vh-2.5rem - 45px)]">
                                    <div className="border-black border rounded-3xl w-1/3 p-3 bg-cyan-300 ml-auto text-wrap">
                                        <p>
                                            {message.message}
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="p-3 h-[calc(100vh-2.5rem - 45px)]">
                                    <div className="border-black border rounded-3xl w-1/3 p-3 text-wrap">
                                        <p>
                                            {message.message}
                                        </p>
                                    </div>
                                </div>

                            )}
                        </div>
                    ))}
                    {errors.message && <p className="text-red-500">{errors.message.message}</p>}
                    <div className="flex gap-x-2 justify-between h-10 w-full px-10 mt-auto mb-3">
                        <input
                            id="message"
                            type="text"
                            placeholder="new message"
                            className="border border-black rounded-xl p-2 w-4/5"
                            {...register("message")}
                        />
                        <Button
                            className="border-black border rounded-full w-1/6 bg-cyan-400"
                            onClick={handleSubmit(onSubmit)}
                        >Send</Button>
                    </div>
                </div>
            ) : (
                <Loading />
            )}
        </>
    );
}