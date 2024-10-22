"use client"

import Comment from "@/components/Comment";
import Loading from "@/components/Loading";
import Profile from "@/components/Profile";
import Tweet from "@/components/Tweet";
import { useProfileHook } from "@/hooks/profile/useProfileHook";

export default function ProfilePage(
    { params }: { params: { user_id: string } }
) {
    const {
        router,
        user,
        profile,
        tab,
        setTab
    } = useProfileHook(params.user_id);

    return (
        <div>
            {profile ?
                <Profile
                    router={router}
                    user={user}
                    profile={profile}
                    tab={tab}
                    setTab={setTab}
                >
                    {tab === "posts" ? (
                        <div>
                            {profile.profile.tweets.map(tweet => (
                                <div
                                    key={`profile-tweet-${tweet.id}`}
                                    className="border-black border-b">
                                    <Tweet tweet={tweet} />
                                </div>
                            ))}
                        </div>
                    ) : tab === "comments" ? (
                        <div>
                            {profile.profile.comments.map(comment => (
                                <div
                                    key={`profile-comment-${comment.id}`}>
                                    <Comment comment={comment} />
                                </div>
                            ))}
                        </div>
                    ) : tab === "likes" ? (
                        <div>
                            {profile.profile.favorites.map(favorite => (
                                <div key={`profile-like-${favorite.id}`}
                                    className="border-black border-b">
                                    <Tweet tweet={favorite.tweet} />
                                </div>
                            ))}
                        </div>
                    ) : <></>}
                </Profile> :
                <Loading />
            }
        </div>
    );
}