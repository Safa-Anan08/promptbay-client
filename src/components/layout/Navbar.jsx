"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import axiosInstance from "@/lib/axios";
import { useRouter ,usePathname} from "next/navigation";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

import {
  Menu,X,Sparkles, LayoutDashboard,LogOut, Moon, Sun,
} from "lucide-react";

import { useTheme } from "next-themes";

export default function Navbar() {
  const router = useRouter();
  const { user, setUser } = useAuth();
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
   useEffect(() => {
  setOpen(false);
}, [pathname]);

  const logout = async () => {
    await axiosInstance.post("/auth/logout");
    setUser(null);
    router.push("/");
  };

  const toggleTheme = () => {
    if (!mounted) return;
    setTheme(theme === "dark" ? "light" : "dark");
  };

 const links = [
  {
    name:  "Explore",
    href:  "/prompts",
  },

  {
    name: "Pricing",
    href: "/pricing",
  },

  {
    name: isDashboard ? "Home" : "Dashboard" ,
    href: isDashboard
      ? "/"
      : user
      ? `/dashboard/${user.role}`
      : "/login",
  },
];

  const isDark = theme === "dark";

  return (
    <header className="fixed inset-x-0 top-0 z-50 overflow-x-hidden">
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-5 pt-3 md:pt-5">

        <div className="rounded-3xl border border-border bg-background/60 backdrop-blur-2xl shadow-xl">

          <div className="h-16 md:h-20 flex items-center justify-between px-4 md:px-8">

            <Link href="/" className="flex items-center gap-3 min-w-0">

              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 flex items-center justify-center text-white">
                <Sparkles size={20} />
              </div>

              <div className=" sm:block">
             <h2 className="font-black text-xl md:text-2xl">
             PromptBay
            </h2>

                <p className="text-[10px] md:text-xs opacity-60">
                  Premium AI Prompt Marketplace
                </p>
              </div>

            </Link>

            <nav className="hidden md:flex items-center gap-5 lg:gap-8 text-sm">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="hover:text-emerald-500"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-3">

              <button
                onClick={toggleTheme}
                className="p-3 rounded-xl border border-border bg-card"
              >
                {!mounted ? null : isDark ? (
                  <Sun size={18} />
                ) : (
                  <Moon size={18} />
                )}
              </button>

            
              {!user ? (
                <>
                  <Link href="/login" className="px-4 py-2">
                    Login
                  </Link>

                  <Link
                    href="/register"
                    className="px-5 py-2 rounded-xl bg-emerald-600 text-white"
                  >
                    Get Started
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href={`/dashboard/${user.role}`}
                    className="p-3 rounded-xl border"
                  >
                    <LayoutDashboard size={18} />
                  </Link>

                  <button
                    onClick={logout}
                    className="p-3 rounded-xl bg-red-500 text-white"
                  >
                    <LogOut size={18} />
                  </button>
                </>
              )}

            </div>  
            <button
  className="md:hidden p-2 rounded-xl border border-border"
  onClick={() => setOpen(!open)}
>
              {open ? <X /> : <Menu />}
            </button>

          </div>
          <AnimatePresence>
       {open && (

        <motion.div
       initial={{
      opacity:0,y:-20,}}
   animate={{opacity:1,y:0,}}

    exit={{opacity:0,y:-20,}}

    transition={{duration:.25,}}

    className="md:hidden p-6 space-y-5 border-t border-border">

        <div className="space-y-4">

          {links.map((link)=>(

      <Link key={link.name}href={link.href}
      onClick={()=>
      setOpen(false)}
          className="block text-lg hover:text-emerald-500">
       {link.name}
      </Link>
          ))}

</div>

   <button
    onClick={toggleTheme}
    className="gap-2 flex items-center justify-between">
   <span> Theme</span>
  {
  mounted && (
   isDark? <Sun size={18}/> : <Moon size={18}/>
)
}
    </button>

   {!user?(

      <div className="space-y-4">

     <Link

     href="/login"
    onClick={()=>
     setOpen(false)
       }
    className="block">
    Login
     </Link>
    <Link href="/register"
    onClick={()=>setOpen(false)}
    className="block">
    Register

</Link>

</div>

)

:

(

<div className="space-y-3">
   <Link
   href={`/dashboard/${user.role}`}
    onClick={()=>
   setOpen(false)
   }

    className="block w-full rounded-2xl border border-border py-4 text-center">

     Dashboard

    </Link>

         <button

           onClick={()=>{
            logout();
          setOpen(false);
              }}
         className="w-full rounded-2xl bg-red-500 text-white py-4">
      Logout

         </button>
           </div>
      )

        }

</motion.div>

)}

</AnimatePresence>
        </div>
      </div>
    </header>
  );
}