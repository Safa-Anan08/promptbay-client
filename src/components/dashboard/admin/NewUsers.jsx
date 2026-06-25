"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { UserPlus } from "lucide-react";

export default function NewUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/prompts/admin/new-users`,
        {
          withCredentials: true,
        }
      );

      setUsers(res.data.users);
    } catch (err) {
      console.log(err);
    }
  };

  const getTime = (date) => {
    if (!date) return "Recently";

    const diff = Math.floor(
      (Date.now() - new Date(date)) / 60000
    );

    if (diff < 60) return `${diff} min ago`;

    if (diff < 1440) {
      return `${Math.floor(diff / 60)} hr ago`;
    }

    return `${Math.floor(diff / 1440)} day ago`;
  };

  return (
    <div className="glass-card rounded-[32px] p-7">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black">
            New Users
          </h2>

          <p className="mt-1 text-muted-foreground">
            Recently Joined
          </p>
        </div>
      </div>

      <div className="mt-8 space-y-5">
        {users.map((user) => (
          <div
            key={user._id}
            className="flex items-center justify-between rounded-2xl border border-border p-4 transition hover:bg-white/5"
          >
            <div className="flex items-center gap-4">
              <img
                src={
                  user.avatar ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    user.name
                  )}`
                }
                alt={user.name}
                className="h-12 w-12 rounded-full object-cover"
              />

              <div>
                <h3 className="font-semibold">
                  {user.name || "Unknown User"}
                </h3>

                <p className="text-sm text-muted-foreground">
                  {user.role || "user"}
                </p>
              </div>
            </div>

            <span className="text-sm text-muted-foreground">
              {getTime(user.createdAt)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}