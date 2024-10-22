import { GroupType } from "@/app/types/group";
import Link from "next/link";

export default function Group({ group }: { group: GroupType }) {
    return (
        <Link href={`/groups/${group.id}`}>
            <div className="border-b border-black p-2">
                {group.entries.map(entry => (
                    <div
                        key={entry.id}
                        className="flex gap-x-3 items-center"
                    >
                        <div
                            className="w-8 h-8 rounded-full bg-slate-400">
                            <img
                                className="w-full h-full rounded-full"
                                src={entry.user.image} alt="イメージ" />
                        </div>
                        <p>{entry.user.displayName ? entry.user.displayName : entry.user.name}</p>
                    </div>
                ))}
                {group.messages.map(message => (
                    <div key={message.id}>{message.message}</div>
                ))}
            </div>
        </Link>
    );
}