"use client";
import Header from "@/components/header";
import NotificationCard from "@/components/notification-card";
import { useSetNotificationsAsSeen } from "@/hooks/mutations/notification";
import { useAllNotifications } from "@/hooks/queries/notification";
import { getUnseenNotificationsCount } from "@/hooks/services/notification";
import React, { useEffect } from "react";

export default function NotificationsPage() {
  const notifications = useAllNotifications();
  const { seenNotifications, unseenNotifications } = notifications;
  const setNoticationsAsSeenMutation = useSetNotificationsAsSeen();

  useEffect(() => {
    return () => {
      const unseenNotificationsCount = getUnseenNotificationsCount();
      if (unseenNotificationsCount === 0) return;
      setNoticationsAsSeenMutation.mutate();
    };
  }, [unseenNotifications?.length, setNoticationsAsSeenMutation]);

  return (
    <>
      <Header className="p-4 text-xl font-semibold">Notifications</Header>

      <>
        {!unseenNotifications && !seenNotifications ? (
          <h1 className="text-center py-1 text-zinc-500 animate-pulse">
            Loading...
          </h1>
        ) : (
          <div className="flex flex-col gap-6 py-2">
            <>
              {unseenNotifications && unseenNotifications.length > 0 && (
                <div>
                  <h1 className="text-xl font-semibold px-4 py-1">New</h1>
                  {unseenNotifications?.map((notification: any) => (
                    <NotificationCard
                      key={notification.id}
                      notification={notification!}
                    />
                  ))}
                </div>
              )}
            </>
            <>
              {seenNotifications && seenNotifications.length > 0 && (
                <div>
                  <h1 className="text-xl font-semibold px-4 py-1">Older</h1>
                  <>
                    {seenNotifications?.map((notification: any) => (
                      <NotificationCard
                        key={notification.id}
                        notification={notification!}
                      />
                    ))}
                  </>
                </div>
              )}
            </>
          </div>
        )}
      </>
    </>
  );
}
