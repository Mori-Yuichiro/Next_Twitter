"use client"

import Loading from "@/components/Loading";
import Notification from "@/components/Notification";
import useNotificationHook from "@/hooks/notification/useNotificationHook";

export default function NotificationPage() {
    const { notifications } = useNotificationHook();

    return (
        <div>
            {notifications ? (
                <>
                    <h1 className="font-bold text-lg px-2 py-1 border-b border-black">Notifications</h1>
                    <div>
                        {notifications.map(notification => (
                            <div key={notification.id}>
                                <Notification notification={notification} />
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <Loading />
            )}
        </div>
    );
}