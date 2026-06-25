"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Users, Search, Shield, Trash2, Crown, User, UserCog } from "lucide-react";

export default function Page() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const load = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/all`, {
      withCredentials: true,
    });

    setUsers(res.data.users);
  };

  useEffect(() => {
    load();
  }, []);

  const updateRole = async (email, role) => {
    await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/role`,
      {
        email,
        role,
      },
      {
        withCredentials: true,
      }
    );

    load();
  };

  const remove = async (email) => {
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/users/${email}`, {
      withCredentials: true,
    });

    load();
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* HEADER */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <p className="uppercase tracking-[5px] text-emerald-500 font-semibold">
            Admin Panel
          </p>

          <h1 className="text-5xl font-black mt-2">
            User Management
          </h1>

          <p className="text-muted-foreground mt-3">
            Manage users and their roles.
          </p>
        </div>

        <div className="glass-card rounded-2xl px-6 py-4 flex items-center gap-3">
          <Users className="text-emerald-500" />

          <div>
            <p className="text-sm text-muted-foreground">
              Total Users
            </p>

                       <h2 className="text-3xl font-black">
              {users.length}
            </h2>
          </div>
        </div>
      </div>

      {/* SEARCH */}

      <div className="glass-card rounded-3xl p-5 flex items-center gap-4">
        <Search className="text-muted-foreground" />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search user..."
          className="flex-1 bg-transparent outline-none text-lg"
        />
      </div>

      

      <div className="grid lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <div
            key={user._id}
            className="glass-card rounded-[28px] p-7 transition hover:-translate-y-1"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center text-white">
                  <img
                    src={
                      user.imgUrl ||
                      user.photoURL ||
                      "https://ui-avatars.com/api/?name=" +
                        encodeURIComponent(user.name)
                    }
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <h2 className="text-xl font-bold">
                    {user.name}
                  </h2>

                  <p className="text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </div>

              <span
                className={`
                  px-4 py-2 rounded-full text-sm font-semibold
                                    ${
                    user.role === "admin"
                      ? "bg-red-500/10 text-red-500"
                      : user.role === "creator"
                      ? "bg-violet-500/10 text-violet-500"
                      : "bg-emerald-500/10 text-emerald-500"
                  }
                `}
              >
                {user.role}
              </span>
            </div>

            <div className="flex flex-wrap gap-3 mt-8">
              {user.role !== "user" && (
                <button
                  onClick={() => updateRole(user.email, "user")}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl border border-border hover:bg-emerald-500/10 transition"
                >
                  <User size={18} />
                  Make User
                </button>
              )}

              {user.role !== "creator" && (
                <button
                  onClick={() => updateRole(user.email, "creator")}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl border border-border hover:bg-violet-500/10 transition"
                >
                  <UserCog size={18} />
                  Make Creator
                </button>
              )}

              {user.role !== "admin" && (
                <button
                  onClick={() => updateRole(user.email, "admin")}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl border border-border hover:bg-red-500/10 transition"
                >
                  <Shield size={18} />
                  Make Admin
                </button>
              )}

              <button
                onClick={() => remove(user.email)}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-red-500 text-white hover:bg-red-600 transition"
              >
                <Trash2 size={18} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="glass-card rounded-3xl p-16 text-center">
          <Crown size={55} className="mx-auto mb-5 text-emerald-500" />

          <h2 className="text-3xl font-bold">
            No Users Found
          </h2>

          <p className="text-muted-foreground mt-3">
            Try another search keyword.
          </p>
        </div>
      )}
    </div>
  );
}