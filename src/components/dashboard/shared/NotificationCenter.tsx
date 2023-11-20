import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { notificationType } from "@/store/slices/NotificationsSlice";
import { Notification } from "./Notification";
import { useContext, useEffect, useRef, useState } from "react";
import { DashBoardContext } from "../_context/DashBoardContext";
import gsap from "gsap";

type NotificationCenterProps = {
  className: string;
};

export const NotificationCenter = ({ className }: NotificationCenterProps) => {
  const notifications = useSelector(
    (state: RootState) => state.notification.notifications
  );
  const context = useContext(DashBoardContext);

  const wrapper = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);

  const ctx = useRef<gsap.Context>()

  useEffect(() => {
    ctx.current = gsap.context((self) => {
      self.add('open', () => {
        const tl = gsap.timeline({
          onStart: () => {
            context.setNotificationCenterAnimated(true);
          },
          onComplete: () => {
            context.setNotificationCenterAnimated(false);
          },
        });

        tl.fromTo(
          wrapper.current,
          {
            height: 0,
          },
          {
            height: "auto",
            ease: "power2.out",
            duration: 0.8,
          },
          0
        );
        tl.fromTo(
          content.current,
          {
            x: 100,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            ease: "power2.out",
            duration: 1,
          },
          0
        );
      })

      self.add('close', () => {
        const tl = gsap.timeline({
          onStart: () => {
            context.setNotificationCenterAnimated(true);
          },
          onComplete: () => {
            context.setNotificationCenterAnimated(false);
          },
        });

        tl.to(
          wrapper.current,
          {
            height: 0,
            ease: "power2.out",
            duration: 0.8,
          },
          0
        );
        tl.to(
          content.current,
          {
            x: 100,
            opacity: 0,
            ease: "power2.out",
            duration: 0.8,
          },
          0
        );

      })
    })

    return () => {
      ctx.current && ctx.current.revert()
    }
  }, [])

  useEffect(() => {
    if (!context.notificationCenterAnimated) {
      if (context.notificationCenterOpen === true) {
        ctx.current && ctx.current.open()
      } else {
        ctx.current && ctx.current.close()
      }
    }
  }, [context.notificationCenterOpen]);

  return (
    <div ref={wrapper} className={`notification-center h-0 pb-[12px] relative z-0 overflow-hidden md:overflow-visible ${className ?? ''}`}>
      <div ref={content} className="p-dashboard-button-separation-spacing pb-dashboard-spacing-element-medium bg-dashboard-button-dark border-03 shadow-large rounded-dashboard-button-square-radius">
        <div className="rounded-dashboard-button-separation-spacing border-05">
          {notifications && notifications.map((notif:notificationType, i:number) => {
            return (
              <Notification
                key={i}
                id={notif.id}
                state={notif.state}
                type={notif.type}
                title={notif.title}
                text={notif.text}
              />
            )
          })}
        </div>
      </div>
    </div>
  );
};
