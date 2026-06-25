"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Plus,
  Folder,
  Bookmark,
  User,
} from "lucide-react";

const menu = [
  { name: "Overview", icon: LayoutDashboard, href: "" },
  { name: "Add Prompt", icon: Plus, href: "/add-prompt" },
  { name: "My Prompts", icon: Folder, href: "/my-prompts" },
  { name: "Bookmarks", icon: Bookmark, href: "/saved-prompts" },
  { name: "Profile", icon: User, href: "/profile" },
];

export default function DashboardSidebar({ role }) {
  return (
    <div className="w-[290px] min-h-screen border-r">
      <div className="p-8">
        <h1 className="text-4xl font-black">PromptBay</h1>
      </div>

      <div className="space-y-3 px-5">
        {menu.map((item) => (
          <Link
            key={item.name}
            href={`/dashboard/${role}${item.href}`}
            className="flex items-center gap-4 rounded-2xl p-4 hover:bg-muted"
          >
            <item.icon />
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}