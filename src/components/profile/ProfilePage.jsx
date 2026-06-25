"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";
import { User, Mail, Shield, Crown, Camera, Sparkles } from "lucide-react";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [image, setImage] = useState(null);

  const [form, setForm] = useState({
    name: "",
    bio: "",
    profession: "",
    skills: "",
  });

  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const res = await axiosInstance.get("/profile");
      setProfile(res.data.user);

      setForm({
        name: res.data.user.name || "",
        bio: res.data.user.bio || "",
        profession: res.data.user.profession || "",
        skills: res.data.user.skills || "",
      });
    } catch {
      toast.error("Failed loading profile");
    }
  };

  const updateProfile = async () => {
    try {
      await axiosInstance.patch("/profile", form);
      toast.success("Profile updated");
      load();
    } catch {
      toast.error("Update failed");
    }
  };

  const uploadAvatar = async () => {
    if (!image) return;

    try {
      const fd = new FormData();
      fd.append("image", image);

      await axiosInstance.post("/profile/avatar", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Avatar updated");
      load();
    } catch {
      toast.error("Upload failed");
    }
  };

  const changePassword = async () => {
    try {
      await axiosInstance.patch("/profile/password", password);
      toast.success("Password updated");
      setPassword({ currentPassword: "", newPassword: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed");
    }
  };

  if (!profile) return <div className="p-10">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-10">

  
      <div className="rounded-[40px] bg-gradient-to-br from-emerald-600 via-cyan-600 to-blue-700 p-10 text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl" />

        <div className="flex gap-10 items-center relative">
          <div className="relative">
            <img
              src={profile.imgUrl || "https://placehold.co/300"}
              className="w-44 h-44 rounded-[40px] object-cover border-4 border-white/20"
            />

            <label className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-black flex items-center justify-center cursor-pointer">
              <Camera />
              <input type="file" hidden onChange={(e) => setImage(e.target.files[0])} />
            </label>
          </div>

          <div>
            <div className="flex gap-2"><Sparkles /> Premium Profile</div>

            <h1 className="text-5xl font-black mt-5">{profile.name}</h1>
            <p className="mt-4">{profile.email}</p>

            <div className="mt-6 flex gap-3 flex-wrap">
              <span className="px-5 py-2 rounded-full bg-white/10 flex gap-2 items-center">
                <Shield size={18} /> {profile.role}
              </span>

              <span className="px-5 py-2 rounded-full bg-yellow-500/20 flex gap-2 items-center">
                <Crown size={18} /> {profile.subscription?.plan || "free"}
              </span>

              <span className="px-5 py-2 rounded-full bg-emerald-500/20">
                {profile.subscription?.status}
              </span>
            </div>

            {image && (
              <button onClick={uploadAvatar} className="mt-6 btn-primary">
                Upload Avatar
              </button>
            )}
          </div>
        </div>
      </div>

   
      <div className="rounded-[35px] border bg-card p-8">
        <div className="flex justify-between">
          <div>
            <p className="opacity-60">Current Subscription</p>
            <h2 className="text-4xl font-black mt-2 uppercase">
              {profile.subscription?.plan || "free"}
            </h2>
          </div>

          <div
            className={`px-6 py-3 rounded-full font-semibold ${
              profile.subscription?.status === "active"
                ? "bg-emerald-500/20 text-emerald-600"
                : "bg-red-500/20 text-red-500"
            }`}
          >
            {profile.subscription?.status || "inactive"}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          <div>
            <p className="opacity-60">Start</p>
            <h3 className="mt-2 text-xl">
              {profile.subscription?.startDate
                ? new Date(profile.subscription.startDate).toLocaleDateString("en-GB")
                : "--"}
            </h3>
          </div>

          <div>
            <p className="opacity-60">Expires</p>
            <h3 className="mt-2 text-xl">
              {profile.subscription?.endDate
                ? new Date(profile.subscription.endDate).toLocaleDateString("en-GB")
                : "--"}
            </h3>
          </div>

          <div>
            <p className="opacity-60">Access</p>
            <h3 className="mt-2 text-xl font-bold">
              {profile.subscription?.status === "active" ? "Enabled" : "Locked"}
            </h3>
          </div>
        </div>
      </div>

   
      <div className="grid lg:grid-cols-2 gap-8">

     
        <div className="rounded-[35px] border bg-card p-8">
          <h2 className="text-3xl font-black">Edit Profile</h2>

          <div className="mt-8 space-y-5">
            <input className="w-full p-5 rounded-3xl border" value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })} />

            <input disabled className="w-full p-5 rounded-3xl border opacity-60"
              value={profile.email} />

            <input className="w-full p-5 rounded-3xl border"
              value={form.profession}
              onChange={(e) => setForm({ ...form, profession: e.target.value })} />

            <textarea className="w-full h-40 p-5 rounded-3xl border"
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })} />

            <button onClick={updateProfile} className="btn-primary">
              Save Changes
            </button>
          </div>
        </div>

  
        <div className="rounded-[35px] border bg-card p-8">
          <h2 className="text-3xl font-black">Change Password</h2>

          <div className="mt-8 space-y-5">
            <input type="password" className="w-full p-5 rounded-3xl border"
              placeholder="Current Password"
              value={password.currentPassword}
              onChange={(e) => setPassword({ ...password, currentPassword: e.target.value })} />

            <input type="password" className="w-full p-5 rounded-3xl border"
              placeholder="New Password"
              value={password.newPassword}
              onChange={(e) => setPassword({ ...password, newPassword: e.target.value })} />

            <button onClick={changePassword} className="btn-premium">
              Update Password
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

function RoleIcon() {
  return <Shield size={18} />;
}