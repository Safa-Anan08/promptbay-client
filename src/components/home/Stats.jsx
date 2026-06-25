"use client";

import {
FileText,
Users,
ShieldCheck,
Star,
} from "lucide-react";

export default function Stats() {

  const items = [
    {
      value: "10K+",
      title: "Premium Prompts",
      icon: <FileText size={22} />,
    },
    {
      value: "5K+",
      title: "Happy Creators",
      icon: <Users size={22} />,
    },
    {
      value: "50K+",
      title: "Active Users",
      icon: <ShieldCheck size={22} />,
    },
    {
      value: "4.8",
      title: "Average Rating",
      icon: <Star size={22} />,
    },
  ];

  return (

    <section className="max-w-7xl mx-auto px-6 mt-12">

      <div
        className=" grid grid-cols-2 lg:grid-cols-4 gap-5  " >

        {items.map((item) => (

          <div
            key={item.title}
            className="glass-card group rounded-3xl p-7 border border-border hover:border-emerald-500/40  transition-all  duration-500  hover:-translate-y-2 " >

            <div className="flex items-center gap-4">

              <div
                className=" w-12  h-12  rounded-2xl  bg-emerald-500/10  text-emerald-400  flex items-center  justify-center  group-hover:rotate-6  transition  " >
                {item.icon}
              </div>

              <div>

                <h2 className="text-4xl font-black">
                  {item.value}
                </h2>

                <p className="text-sm text-muted mt-1">
                  {item.title}
                </p>

              </div>

            </div>

          </div>

        ))}

      </div>

    </section>

  );

}