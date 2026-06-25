"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import {
  LayoutDashboard,
  PlusCircle, FileText, User,
  Wallet, Users, Shield, Sparkles,
} from "lucide-react";

export default function DashboardTabs({ role }) {
  const pathname = usePathname();

  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 2500 })]
  );

  const menu = {
    user: [
      { name: "Overview", icon: LayoutDashboard, href: "/dashboard/user" },
      { name: "Add Prompt", icon: PlusCircle, href: "/dashboard/user/add-prompt" },
      { name: "My Prompts", icon: FileText, href: "/dashboard/user/my-prompts" },
      { name: "Profile", icon: User, href: "/dashboard/profile" },
      { name: "Payment History", icon: Wallet, href: "/dashboard/user/payment-history" },
    ],

    creator: [
      { name: "Overview", icon: LayoutDashboard, href: "/dashboard/creator" },
      { name: "Add Prompt", icon: PlusCircle, href: "/dashboard/creator/add-prompt" },
      { name: "My Prompts", icon: Sparkles, href: "/dashboard/creator/my-prompts" },
      { name: "Analytics", icon: Wallet, href: "/dashboard/creator/creator-analytics" },
      { name: "Profile", icon: User, href: "/dashboard/profile" },
      { name: "Payment History", icon: Wallet, href: "/dashboard/user/payment-history" },
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
    <div className="lg:hidden sticky top-[88px] z-40 bg-background/80 backdrop-blur-xl border-b border-border py-3">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-3 px-4 min-w-max touch-pan-x select-none">
          {menu[role]?.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <div key={item.href} className="flex-[0_0_auto] min-w-max">
                <Link
                  href={item.href}
                  className={
                    active
                      ? "flex items-center gap-2 px-5 py-3 rounded-2xl whitespace-nowrap bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-xl transition-all duration-300"
                      : "flex items-center gap-2 px-5 py-3 rounded-2xl whitespace-nowrap glass-card border border-border hover:border-emerald-500/40 transition-all duration-300"
                  }
                >
                  <Icon size={18} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}