"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, PlusCircle,
  User, Wallet,  Users,FileText,
Shield, Sparkles,} from "lucide-react";

export default function DashboardTabs({ role }) {
  const pathname = usePathname();

  const menu = {
    user: [
      { name: "Overview", icon: LayoutDashboard, href: "/dashboard/user" },
      { name: "Add", icon: PlusCircle, href: "/dashboard/user/add-prompt" },
      { name: "Prompts", icon: FileText, href: "/dashboard/user/my-prompts" },
      { name: "Profile", icon: User, href: "/dashboard/profile" },
      { name: "Payments", icon: Wallet, href: "/dashboard/user/payment-history" },
    ],

    creator: [
      { name: "Overview", icon: LayoutDashboard, href: "/dashboard/creator" },
      { name: "Add", icon: PlusCircle, href: "/dashboard/creator/add-prompt" },
      { name: "Prompts", icon: Sparkles, href: "/dashboard/creator/my-prompts" },
      { name: "Analytics", icon: Wallet, href: "/dashboard/creator/creator-analytics" },
      { name: "Profile", icon: User, href: "/dashboard/profile" },
    ],

    admin: [
      { name: "Overview", icon: LayoutDashboard, href: "/dashboard/admin" },
      { name: "Prompts", icon: Sparkles, href: "/dashboard/admin/prompts" },
      { name: "Users", icon: Users, href: "/dashboard/admin/users" },
      { name: "Payments", icon: Wallet, href: "/dashboard/admin/payments" },
      { name: "Reports", icon: Shield, href: "/dashboard/admin/reports" },
      { name: "Profile", icon: User, href: "/dashboard/profile" },
    ],
  };

  return (
    <div className="lg:hidden sticky top-[-90px] z-40 border-b border-border bg-background/90 backdrop-blur-xl">
      <div className="flex gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-4 py-2">
        {menu[role]?.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`snap-start shrink-0 min-w-[80px] sm:min-w-[100px] rounded-3xl px-3 py-3 flex flex-col items-center justify-center gap-2 transition-all duration-300 ${
                active
                  ? "bg-gradient-to-b from-emerald-500 to-cyan-600 text-white scale-105 shadow-xl"
                  : "glass-card border border-border hover:border-emerald-500/30"
              }`}
            >
              <Icon size={20} />

              <span className="text-[11px] sm:text-xs font-medium text-center">
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}