"use client"

import Profile from "@/components/Profile";
import Tweet from "@/components/Tweet";
import { useProfileHook } from "@/hooks/profile/useProfileHook";

export default function ProfilePage(
    { params }: { params: { user_id: string } }
) {
    const {
        router,
        profile,
        tab,
        setTab
    } = useProfileHook(params.user_id);

    return (
        <Profile
            router={router}
            profile={profile}
            tab={tab}
            setTab={setTab}
        >
            {profile.tweets.map((tweet, i) => (
                <div
                    key={`profile-tweet-${i}`}
                    className="border-black border-b">
                    <Tweet tweet={tweet} />
                </div>
            ))}
        </Profile>
    );
}