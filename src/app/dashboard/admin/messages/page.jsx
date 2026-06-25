"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  Mail,
  Search,
  Trash2,
  CheckCircle2,
  MailOpen,
  Loader2,
} from "lucide-react";

export default function Page() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/contact/admin`,
        {
          withCredentials: true,
        }
      );

      setMessages(res.data.messages || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id) => {
    const ok = confirm("Delete this message?");
    if (!ok) return;

    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/contact/${id}`,
        {
          withCredentials: true,
        }
      );

      loadMessages();
    } catch (error) {
      console.log(error);
    }
  };

  const markRead = async (id) => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/contact/read/${id}`,
        {},
        {
          withCredentials: true,
        }
      );

      loadMessages();
    } catch (error) {
      console.log(error);
    }
  };

  const filtered = useMemo(() => {
    return messages.filter((item) => {
      const query = search.toLowerCase();

      return (
        item.name?.toLowerCase().includes(query) ||
        item.email?.toLowerCase().includes(query) ||
        item.message?.toLowerCase().includes(query)
      );
    });
  }, [messages, search]);

  const stats = {
    total: messages.length,
    unread: messages.filter((i) => i.status === "unread").length,
    read: messages.filter((i) => i.status === "read").length,
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <p className="text-emerald-500 font-semibold uppercase tracking-[4px]">
            Admin Inbox
          </p>

          <h1 className="text-4xl font-black mt-2">
            Contact Messages
          </h1>

          <p className="text-muted-foreground mt-3">
            Manage all customer messages from one place.
          </p>
        </div>

        <div className="glass-card rounded-[28px] px-6 py-5 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 flex items-center justify-center">
            <Mail className="text-emerald-500" />
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Inbox
            </p>

            <h2 className="text-3xl font-black">
              {stats.total}
            </h2>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        <div className="glass-card rounded-[28px] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground">
                Total Messages
              </p>

              <h2 className="text-4xl font-black mt-3">
                {stats.total}
              </h2>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-cyan-500/15 flex items-center justify-center">
              <Mail className="text-cyan-500" />
            </div>
          </div>
        </div>

        <div className="glass-card rounded-[28px] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground">
                Unread
              </p>

              <h2 className="text-4xl font-black mt-3 text-red-500">
                {stats.unread}
              </h2>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-red-500/15 flex items-center justify-center">
              <MailOpen className="text-red-500" />
            </div>
          </div>
        </div>

        <div className="glass-card rounded-[28px] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground">
                Read
              </p>

              <h2 className="text-4xl font-black mt-3 text-emerald-500">
                {stats.read}
              </h2>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 flex items-center justify-center">
              <CheckCircle2 className="text-emerald-500" />
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card rounded-[28px] p-6">
        <div className="relative">
          <Search
            size={20}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email or message..."
            className="w-full h-14 rounded-2xl border border-border bg-transparent pl-14 pr-5 outline-none focus:border-emerald-500 transition"
          />
        </div>
      </div>

      {loading ? (
        <div className="glass-card rounded-[32px] p-20 flex flex-col items-center justify-center gap-5">
          <Loader2
            size={40}
            className="animate-spin text-emerald-500"
          />

          <p className="text-muted-foreground">
            Loading messages...
          </p>
        </div>
      ) : (
        <div className="grid xl:grid-cols-2 gap-6">
          {filtered.length === 0 ? (
            <div className="xl:col-span-2 glass-card rounded-[32px] p-20 text-center">
              <Mail
                size={70}
                className="mx-auto text-muted-foreground opacity-40"
              />

              <h2 className="text-3xl font-black mt-8">
                No Messages Found
              </h2>

              <p className="text-muted-foreground mt-3">
                There are no messages matching your search.
              </p>
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item._id}
                className="glass-card rounded-[32px] p-7 hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-5">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white text-2xl font-black">
                      {item.name?.charAt(0)?.toUpperCase()}
                    </div>

                    <div>
                      <h2 className="text-2xl font-black">
                        {item.name}
                      </h2>

                      <p className="text-muted-foreground mt-1">
                        {item.email}
                      </p>

                      <p className="text-sm text-muted-foreground mt-2">
                        {new Date(item.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      item.status === "unread"
                        ? "bg-red-500/15 text-red-500"
                        : "bg-emerald-500/15 text-emerald-500"
                    }`}
                  >
                    {item.status === "unread" ? "Unread" : "Read"}
                  </span>
                </div>

                <div className="mt-7 rounded-3xl border border-border p-6 leading-8">
                  {item.message}
                </div>

                <div className="flex flex-wrap gap-4 mt-7">
                  {item.status === "unread" && (
                    <button
                      onClick={() => markRead(item._id)}
                      className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white transition flex items-center gap-2"
                    >
                      <CheckCircle2 size={18} />
                      Mark as Read
                    </button>
                  )}

                  <button
                    onClick={() => remove(item._id)}
                    className="px-6 py-3 rounded-2xl bg-red-600 hover:bg-red-500 text-white transition flex items-center gap-2"
                  >
                    <Trash2 size={18} />
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}