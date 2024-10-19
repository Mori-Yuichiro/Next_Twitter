export type NotificationType = {
    id: number;
    visitorId: number;
    visitedId: number;
    tweetId?: number;
    action: string;
    read: boolean;
    visitor: User;
}