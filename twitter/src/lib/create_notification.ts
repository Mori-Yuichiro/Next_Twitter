import { db } from "./db"

export const checkNotification = async (
    visitorId: number,
    visitedId: number,
    action: string
) => {
    const existingNotification = await db.notification.findFirst({
        where: {
            visitorId,
            visitedId,
            action
        }
    });

    return existingNotification;
}