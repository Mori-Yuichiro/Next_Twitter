"use client"

import Group from "@/components/Group";
import Loading from "@/components/Loading";
import useGroupHook from "@/hooks/groups/useGroupHook";

export default function Groups() {
    const { groups } = useGroupHook();

    return (
        <>
            {groups ? (
                <div>
                    {groups.map(group => (
                        <div key={group.id}>
                            <Group group={group} />
                        </div>
                    ))}
                </div>
            ) : (
                <Loading />
            )}
        </>
    );
}