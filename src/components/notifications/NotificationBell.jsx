"use client";

import { useState } from "react";
import { Bell, CheckCheck } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function NotificationBell() {
  const [open, setOpen] = useState(false);

  const notifications = [
    {
      id: 1,
      title: "Your prompt has been approved 🎉",
      time: "2 min ago",
    },
    {
      id: 2,
      title: "Someone bookmarked your prompt.",
      time: "1 hour ago",
    },
    {
      id: 3,
      title: "Premium features are now available.",
      time: "Today",
    },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-background/70 backdrop-blur-xl transition hover:bg-accent"
      >
        <Bell size={18} />

        <span className="absolute right-2 top-2 flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75"></span>
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500"></span>
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className=" bg-teal-200 text-black absolute top-[calc(100%+12px)] right-0 z-[100] w-80  overflow-hidden rounded-2xl border border-border bg-background shadow-2xl"
          >
            <div className="flex items-center justify-between border-b px-5 py-4 bg-teal-200">
              <h3 className="font-semibold">Notifications</h3>

              <button className="rounded-lg p-2 transition hover:bg-muted">
                <CheckCheck size={18} />
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto">
              {notifications.map((item) => (
                <div
                  key={item.id}
                  className="cursor-pointer border-b px-5 py-4 transition hover:bg-muted/50"
                >
                  <p className="text-sm font-medium">{item.title}</p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    {item.time}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t p-4 text-center">
              <button className="text-sm font-medium text-violet-600 hover:underline">
                View All Notifications
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}