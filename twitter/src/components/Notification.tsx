import { NotificationType } from "@/app/types/notification";

export default function Notification({ notification }: { notification: NotificationType }) {
    return (
        <div className="border-b border-black">
            {(notification.action === "follow") ? (
                <div className="px-4 py-2 space-y-3">
                    <div className="flex gap-x-2 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512"><path fill="currentColor" d="M332.64 64.58C313.18 43.57 286 32 256 32c-30.16 0-57.43 11.5-76.8 32.38c-19.58 21.11-29.12 49.8-26.88 80.78C156.76 206.28 203.27 256 256 256s99.16-49.71 103.67-110.82c2.27-30.7-7.33-59.33-27.03-80.6ZM432 480H80a31 31 0 0 1-24.2-11.13c-6.5-7.77-9.12-18.38-7.18-29.11C57.06 392.94 83.4 353.61 124.8 326c36.78-24.51 83.37-38 131.2-38s94.42 13.5 131.2 38c41.4 27.6 67.74 66.93 76.18 113.75c1.94 10.73-.68 21.34-7.18 29.11A31 31 0 0 1 432 480Z" /></svg>
                        {notification.visitor.image &&
                            <>
                                <div className="w-8 h-8">
                                    <img
                                        src={notification.visitor.image}
                                        alt="イメージ"
                                        className="w-full h-full rounded-full"
                                    />
                                </div>
                            </>
                        }
                    </div>
                    <div className="pl-6">
                        <p>{notification.visitor.displayName ? (
                            <span>{notification.visitor.displayName}</span>
                        ) : (
                            <span>{notification.visitor.name}</span>
                        )}がフォローしました</p>
                    </div>
                </div>
            ) : (notification.action === "favorite") ? (
                <div className="px-4 py-2 space-y-3">
                    <div className="flex gap-x-2 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="currentColor" d="m10 3.22l-.61-.6a5.5 5.5 0 0 0-7.78 7.77L10 18.78l8.39-8.4a5.5 5.5 0 0 0-7.78-7.77l-.61.61z" /></svg>
                        {notification.visitor.image &&
                            <>
                                <div className="w-8 h-8">
                                    <img
                                        src={notification.visitor.image}
                                        alt="イメージ"
                                        className="w-full h-full rounded-full"
                                    />
                                </div>
                            </>
                        }
                    </div>
                    <div className="pl-6">
                        <p>{notification.visitor.displayName ? (
                            <span>{notification.visitor.displayName}</span>
                        ) : (
                            <span>{notification.visitor.name}</span>
                        )}がいいねしました</p>
                    </div>
                </div>
            ) : (
                <div className="px-4 py-2 space-y-3">
                    <div className="flex gap-x-2 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2A10 10 0 0 0 2 12a9.89 9.89 0 0 0 2.26 6.33l-2 2a1 1 0 0 0-.21 1.09A1 1 0 0 0 3 22h9a10 10 0 0 0 0-20Zm0 18H5.41l.93-.93a1 1 0 0 0 0-1.41A8 8 0 1 1 12 20Z" /></svg>
                        {notification.visitor.image &&
                            <>
                                <div className="w-8 h-8">
                                    <img
                                        src={notification.visitor.image}
                                        alt="イメージ"
                                        className="w-full h-full rounded-full"
                                    />
                                </div>
                            </>
                        }
                    </div>
                    <div className="pl-6">
                        <p>{notification.visitor.displayName ? (
                            <span>{notification.visitor.displayName}</span>
                        ) : (
                            <span>{notification.visitor.name}</span>
                        )}がコメントしました</p>
                    </div>
                </div>
            )}
        </div>
    );
}