import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json("Unauthorized", { status: 403 });
        }

        const { user } = session;
        const { id } = params;

        // DM機能に関する処理
        const currentUserEntries = await db.entry.findMany({
            where: {
                userId: Number(user.id)
            }
        });

        const anotherUserEntries = await db.entry.findMany({
            where: {
                userId: Number(id)
            }
        });

        let isGroup = false;
        let commonGroupIds: number[] = [];

        if (user.id !== id) {
            const currentUserGroupIds = currentUserEntries.map(entry => entry.groupId);
            const anotherUserGroupIds = anotherUserEntries.map(entry => entry.groupId);
            commonGroupIds = currentUserGroupIds.filter(groupId => anotherUserGroupIds.includes(groupId));

            if (commonGroupIds.length > 0) {
                isGroup = true;
            }
        }

        const profile = await db.user.findFirst({
            where: {
                id: Number(id)
            },
            include: {
                tweets: {
                    include: {
                        user: true,
                        retweets: {
                            orderBy: {
                                createdAt: "desc"
                            }
                        },
                        favorites: {
                            orderBy: {
                                createdAt: "desc"
                            }
                        }
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                },
                comments: {
                    include: {
                        user: true
                    }
                },
                favorites: {
                    include: {
                        tweet: {
                            include: {
                                user: true,
                                retweets: {
                                    orderBy: {
                                        createdAt: "desc"
                                    }
                                },
                                favorites: {
                                    orderBy: {
                                        createdAt: "desc"
                                    }
                                }
                            }
                        }
                    },
                    orderBy: {
                        createdAt: "desc"
                    }
                },
                following: true,
                followers: true
            }
        });

        if (commonGroupIds.length > 0) {
            return NextResponse.json({
                profile,
                isGroup,
                commonGroupId: commonGroupIds[0]
            }, { status: 200 });
        } else {
            return NextResponse.json({
                profile,
                isGroup
            }, { status: 200 });
        }
    } catch {
        return NextResponse.json(null, { status: 500 });
    }
}