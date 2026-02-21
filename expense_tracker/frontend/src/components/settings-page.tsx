import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, User, Mail, Lock, Save } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useAuthStore } from "../store/auth-store";
import { toast } from "react-hot-toast";
import { motion } from "motion/react";
import Sidebar from "./sidebar";

export default function SettingsPage() {
  const navigate = useNavigate();
  const { user, updateProfile, isLoading } = useAuthStore();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name,
        email: user.email,
      }));
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password && formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await updateProfile({
        name: formData.name,
        email: formData.email,
        password: formData.password || undefined,
      });
      toast.success("Profile updated successfully!");
      setFormData((prev) => ({ ...prev, password: "", confirmPassword: "" }));
    } catch (_err) {
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] font-poppins text-zinc-900">
      <Sidebar />

      <main className="lg:ml-64 p-6 lg:p-10 max-w-7xl mx-auto">
        <header className="flex items-center gap-4 mb-10">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/dashboard")}
            className="rounded-xl hover:bg-zinc-100"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div>
            <h1 className="text-3xl font-black text-zinc-900 tracking-tight">
              Settings
            </h1>
            <p className="text-zinc-500 font-medium">
              Manage your profile and preferences
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:col-span-8 bg-white p-8 rounded-[2.5rem] border border-zinc-100 shadow-sm"
          >
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-brand" />
              Profile Information
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="name"
                    className="font-bold text-zinc-500 px-1"
                  >
                    Full Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <Input
                      id="name"
                      placeholder="Your Name"
                      className="rounded-2xl h-12 pl-11 border-zinc-100 bg-zinc-50/50 focus:ring-brand focus:border-brand transition-all"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="font-bold text-zinc-500 px-1"
                  >
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      className="rounded-2xl h-12 pl-11 border-zinc-100 bg-zinc-50/50 focus:ring-brand focus:border-brand transition-all"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-zinc-50">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-brand" />
                  Change Password
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="pass"
                      className="font-bold text-zinc-500 px-1"
                    >
                      New Password
                    </Label>
                    <Input
                      id="pass"
                      type="password"
                      placeholder="••••••••"
                      className="rounded-2xl h-12 border-zinc-100 bg-zinc-50/50 focus:ring-brand focus:border-brand transition-all"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="confirm"
                      className="font-bold text-zinc-500 px-1"
                    >
                      Confirm New Password
                    </Label>
                    <Input
                      id="confirm"
                      type="password"
                      placeholder="••••••••"
                      className="rounded-2xl h-12 border-zinc-100 bg-zinc-50/50 focus:ring-brand focus:border-brand transition-all"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          confirmPassword: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <p className="text-xs text-zinc-400 mt-2 px-1 italic">
                  Leave blank if you don't want to change your password.
                </p>
              </div>

              <div className="flex justify-end pt-4">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-zinc-900 hover:bg-black text-white rounded-2xl font-bold gap-2 px-8 h-12 shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-4 space-y-6"
          >
            <div className="bg-brand/5 p-8 rounded-[2.5rem] border border-brand/10">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-brand rounded-full flex items-center justify-center text-white text-3xl font-black mb-4 shadow-xl shadow-brand/20">
                  {user?.name.charAt(0).toUpperCase()}
                </div>
                <h3 className="text-xl font-bold">{user?.name}</h3>
                <p className="text-brand font-medium text-sm">{user?.email}</p>
                <div className="mt-6 pt-6 border-t border-brand/10 w-full flex justify-around">
                  <div className="text-center">
                    <p className="text-[10px] uppercase font-black tracking-widest text-zinc-400 px-1">
                      Joined
                    </p>
                    <p className="font-bold text-zinc-700">Recent</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] uppercase font-black tracking-widest text-zinc-400 px-1">
                      Status
                    </p>
                    <p className="font-bold text-green-600">Active</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-[2.5rem] border border-zinc-100 shadow-sm text-center">
              <p className="text-sm text-zinc-500 font-medium mb-4 italic">
                "Financial freedom is available to those who learn about it and
                work for it."
              </p>
              <div className="h-1 w-12 bg-zinc-100 mx-auto rounded-full" />
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
