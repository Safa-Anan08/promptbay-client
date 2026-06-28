"use client";

import { useState } from "react";
import axiosInstance from "@/lib/axios";
import { Mail, Send } from "lucide-react";
import {
  FaGithub,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { toast } from "sonner";

export default function Footer() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSend = async () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Message failed", {
        description: "Please try again.",
        style: {
          background: "#2a1111",
          color: "#fff",
          border: "1px solid #ff5d5d",
          borderRadius: "18px",
        },
        icon: "⚠️",
      });

      return;
    }

    try {
      setLoading(true);

      await axiosInstance.post("/contact", form);

      toast.success("Message sent successfully ✨", {
        description: "Our team will review your message shortly.",
        duration: 4000,
        style: {
          background: "linear-gradient(135deg,#0f2e22,#1f8a5b)",
          color: "#fff",
          border: "1px solid rgba(61,191,125,.4)",
          borderRadius: "18px",
        },
        icon: "🚀",
      });

      setForm({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.log(error.response?.data);

      toast.error(error.response?.data?.message || "Failed to send");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="mt-5 border-t border-border bg-background/60 backdrop-blur-xl">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-3">
        <div>
          <h2 className="gradient-text text-3xl font-black">
            PromptBay
          </h2>

          <p className="mt-4 text-muted">
            Premium AI prompt marketplace for creators & developers.
          </p>

          <div className="mt-8 flex gap-4">
            <button className="glass-card p-3">
              <FaGithub size={18} />
            </button>

            <button className="glass-card p-3">
              <FaTwitter size={18} />
            </button>

            <button className="glass-card p-3">
              <FaInstagram size={18} />
            </button>

            <button className="glass-card p-3">
              <FaLinkedin size={18} />
            </button>
          </div>
        </div>

        <div>
          <h3 className="mb-5 text-xl font-bold">
            Contact
          </h3>

          <div className="space-y-4 text-muted">
            <p className="flex items-center gap-2">
              <Mail size={16} />
              support@promptbay.com
            </p>

            <p>Dhaka, Bangladesh</p>

            <p>Admin support available</p>
          </div>
        </div>

        <div>
          <h3 className="mb-5 text-xl font-bold">
            Send Message
          </h3>

          <div className="space-y-3">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              className="w-full rounded-xl border border-border bg-card p-4 outline-none"
            />

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your email"
              className="w-full rounded-xl border border-border bg-card p-4 outline-none"
            />

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Write your message..."
              className="h-32 w-full resize-none rounded-xl border border-border bg-card p-4 outline-none"
            />

            <button
              onClick={handleSend}
              disabled={loading}
              className="btn-primary flex w-full items-center justify-center gap-2 disabled:opacity-60"
            >
              <Send size={16} />

              {loading ? "Sending..." : "Send Message"}
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-border py-6 text-center text-sm text-muted">
        © PromptBay 2026. All rights reserved.
      </div>
    </footer>
  );
}