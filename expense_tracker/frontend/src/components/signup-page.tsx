import { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Wallet, ArrowRight, Loader2, Mail, Lock, User } from "lucide-react";
import { useAuthStore } from "../store/auth-store";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 },
};

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { signup, isLoading } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup(email, password, name);
      toast.success("Account created! Welcome to SpendWise.");
      navigate("/dashboard");
    } catch (err: any) {
      toast.error(
        err.response?.data?.message || "Registration failed. Try again.",
      );
    }
  };

  return (
    <div className="min-h-screen bg-bg-warm flex items-center justify-center p-6 font-poppins">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] right-[5%] w-64 h-64 bg-brand/5 rounded-full blur-3xl" />
        <div className="absolute bottom-[10%] left-[5%] w-96 h-96 bg-brand/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md"
      >
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 mb-4 group cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="bg-brand p-2.5 rounded-2xl shadow-lg shadow-brand/20 group-hover:scale-110 transition-transform">
              <Wallet className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-extrabold text-zinc-900 tracking-tight">
              Spend<span className="text-brand">Wise</span>
            </span>
          </motion.div>
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-bold text-zinc-900 mb-2"
          >
            Create Account
          </motion.h2>
          <motion.p variants={itemVariants} className="text-zinc-500">
            Start your journey to financial freedom
          </motion.p>
        </div>

        {/* Card */}
        <motion.div
          variants={itemVariants}
          className="bg-white p-8 rounded-[2rem] shadow-2xl shadow-brand/5 border border-white/50 backdrop-blur-sm relative"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-700 ml-1">
                Full Name
              </label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-brand transition-colors" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full bg-zinc-50 border-2 border-zinc-100 rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:border-brand/30 focus:bg-white transition-all text-zinc-900 placeholder:text-zinc-400"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-700 ml-1">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-brand transition-colors" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-zinc-50 border-2 border-zinc-100 rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:border-brand/30 focus:bg-white transition-all text-zinc-900 placeholder:text-zinc-400"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-700 ml-1">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-brand transition-colors" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-zinc-50 border-2 border-zinc-100 rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:border-brand/30 focus:bg-white transition-all text-zinc-900 placeholder:text-zinc-400"
                />
              </div>
              <p className="text-[10px] text-zinc-400 ml-1">
                Must be at least 6 characters
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-brand text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-brand/20 hover:bg-brand-dark disabled:opacity-70 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-zinc-100 text-center">
            <p className="text-zinc-500 font-medium">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-brand font-bold hover:text-brand-dark transition-colors"
              >
                Sign in
              </button>
            </p>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.p
          variants={itemVariants}
          className="text-center mt-8 text-zinc-400 text-xs px-4"
        >
          By creating an account, you agree to our{" "}
          <a href="#" className="underline">
            Terms
          </a>{" "}
          and{" "}
          <a href="#" className="underline">
            Privacy Policy
          </a>
        </motion.p>
      </motion.div>
    </div>
  );
}
