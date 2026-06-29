"use client";

import { useState } from "react";
import axiosInstance from "@/lib/axios";
import { Mail, Send,triangleAlert } from "lucide-react";
import {
  FaGithub,
  FaRocket,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
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
    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.message.trim()
    ) {
      toast.error("Message failed", {
        description: "Please try again.",
        style: {
          background: "#2a1111",
          color: "#fff",
          border: "1px solid #ff5d5d",
          borderRadius: "18px",
        },
        icon: <triangleAlert/>,
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
        icon: <FaRocket />,
      });

      setForm({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.log(error.response?.data);

      toast.error(
        error.response?.data?.message || "Failed to send"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="relative mt-8 overflow-hidden border-t border-border bg-gradient-to-b from-background via-background to-black/80">
      <div className="absolute inset-0 opacity-[0.06]">
        <div className="absolute left-0 top-0 h-[300px] w-[300px] rounded-full bg-violet-600 blur-[180px]" />
        <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-cyan-500 blur-[180px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-14 lg:grid-cols-4">
          <div>
            <h2 className="gradient-text text-5xl font-black">
              PromptBay
            </h2>

            <p className="mt-5 leading-8 text-muted-foreground">
              Premium AI prompt marketplace for creators,
              developers and builders.
            </p>

            <div className="mt-8 flex gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-4 transition hover:scale-110"
              >
                <FaGithub size={20} />
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-4 transition hover:scale-110"
              >
                <FaXTwitter size={20} />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-4 transition hover:scale-110"
              >
                <FaInstagram size={20} />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-4 transition hover:scale-110"
              >
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

    
          <div>
            <h3 className="mb-6 text-xl font-black">
              Quick Links
            </h3>

            <div className="flex flex-col gap-4">
              <a
                href="/"
                className="hover:text-violet-500"
              >
                Home
              </a>

              <a
                href="/prompts"
                className="hover:text-violet-500"
              >
                Explore Prompts
              </a>

              <a
                href="/pricing"
                className="hover:text-violet-500"
              >
                Pricing
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-6 text-xl font-black">
              Contact
            </h3>

            <div className="space-y-5 text-muted-foreground">
              <div className="flex gap-3">
                <Mail size={18} />
                support@promptbay.com
              </div>

              <div>Dhaka, Bangladesh</div>

              <div>24/7 Premium Support</div>

              <div>Response under 12 hours</div>
            </div>
          </div>


          <div>
            <h3 className="mb-6 text-xl font-black">
              Get In Touch
            </h3>

            <div className="space-y-4">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full rounded-2xl border bg-card/60 p-4 outline-none focus:border-violet-500"
              />

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Your email"
                className="w-full rounded-2xl border bg-card/60 p-4 outline-none focus:border-violet-500"
              />

              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Write your message..."
                className="h-32 w-full resize-none rounded-2xl border bg-card/60 p-4 outline-none focus:border-violet-500"
              />

              <button
                onClick={handleSend}
                disabled={loading}
                className="w-full rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-600 py-4 font-bold text-white transition hover:scale-[1.02]"
              >
                <div className="flex justify-center gap-2">
                  <Send size={18} />

                  {loading
                    ? "Sending..."
                    : "Send Message"}
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-4 border-t border-border pt-8 text-sm text-muted-foreground md:flex-row">
          <p>© PromptBay 2026 · All rights reserved</p>

          <div className="flex gap-6">
            <a href="#">Privacy</a>

            <a href="#">Terms</a>

            <a href="#">Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
}