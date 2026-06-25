"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import axios from "axios";
import {
  LayoutDashboard,
  PlusCircle,
  FileText,
  User,
  Wallet,
  Users,
  Shield,
  Sparkles,
  ChevronRight,
  Crown,
  Circle,
  MessageSquare,
} from "lucide-react";

export default function Sidebar() {
  const [role, setRole] = useState(null);
  const path = usePathname();
  const isAdmin = role === "admin";

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
          withCredentials: true,
        });
        setRole(res.data.user.role);
      } catch {
        setRole("user");
      }
    };

    load();
  }, []);

  if (!role) {
    return <div className="w-[310px] flex items-center justify-center">Loading...</div>;
  }

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
      { name: "Messages", icon: MessageSquare, href: "/dashboard/admin/messages" },
      { name: "Reports", icon: Shield, href: "/dashboard/admin/reports" },
      { name: "Profile", icon: User, href: "/dashboard/profile" },
    ],
  };

  return (
    <aside className="sticky top-0 h-screen w-[310px] border-r border-border bg-background/70 backdrop-blur-3xl overflow-y-auto">
      <div className="flex flex-col h-full">

      
        <div className="px-8 pt-8 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white shadow-xl">
              <Sparkles size={30} />
            </div>

            <div>
              <h1 className="text-3xl font-black bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                PromptBay
              </h1>
              <p className="text-muted-foreground">Prompts Platform</p>
            </div>
          </div>
        </div>

    
        <div className="px-6">
          <div className="rounded-[32px] border border-border bg-card/70 p-6 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-36 h-36 rounded-full bg-emerald-500/10 blur-3xl" />

            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white text-3xl font-black">
              {role[0].toUpperCase()}
            </div>

            <h2 className="mt-5 text-2xl font-black capitalize">{role}</h2>

            <div className="mt-2 flex items-center gap-2">
              <Crown size={16} className="text-yellow-500" />
              <p className="text-muted-foreground">Premium Dashboard</p>
            </div>
          </div>
        </div>

    
        <div className="flex-1 px-5 mt-8">
          <div className="space-y-3">
            {menu[role]?.map((item) => {
              const Icon = item.icon;
              const active = path === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group flex items-center justify-between rounded-3xl px-5 py-4 transition-all duration-300 ${
                    active
                      ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-2xl scale-[1.02]"
                      : "hover:bg-card hover:translate-x-1"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${active ? "bg-white/20" : "bg-muted"}`}>
                      <Icon size={20} />
                    </div>
                    <span className="font-medium">{item.name}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {active && <Circle size={10} fill="white" />}
                    <ChevronRight size={18} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>


        {!isAdmin && (
          <div className="p-6">
            <div className="rounded-[32px] bg-gradient-to-br from-emerald-500 via-cyan-500 to-blue-500 p-7 text-white relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10" />

              <Crown size={34} />

              <h2 className="mt-5 text-3xl font-black">Go PRO</h2>
              <p className="mt-2 text-white/80">Unlock premium analytics and unlimited AI prompts.</p>

              <button
                onClick={() => (window.location.href = "/pricing")}
                className="mt-6 w-full rounded-2xl bg-white py-3 font-bold text-black hover:scale-105 transition"
              >
                Upgrade Now
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}