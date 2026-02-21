import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  PieChart,
  Wallet,
  TrendingUp,
  ShieldCheck,
  Menu,
  X,
} from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

const floatingVariants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
    },
  },
};

export default function Homepage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-bg-warm font-poppins overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-bg-warm/80 backdrop-blur-md border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <div className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center shadow-lg shadow-brand/20">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-extrabold text-zinc-900 tracking-tight">
                Spend<span className="text-brand">Wise</span>
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <a
                href="#features"
                className="text-zinc-600 hover:text-brand font-medium transition-colors"
              >
                Features
              </a>
              <a
                href="#about"
                className="text-zinc-600 hover:text-brand font-medium transition-colors"
              >
                About
              </a>
              <button
                onClick={() => navigate("/login")}
                className="text-zinc-900 font-bold hover:text-brand transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="bg-brand text-white px-6 py-2.5 rounded-xl font-bold hover:bg-brand-dark transition-all shadow-lg shadow-brand/20"
              >
                Sign Up Free
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-zinc-900"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-zinc-100"
            >
              <div className="px-4 py-6 space-y-4">
                <a
                  href="#features"
                  className="block text-lg font-medium text-zinc-600"
                >
                  Features
                </a>
                <a
                  href="#about"
                  className="block text-lg font-medium text-zinc-600"
                >
                  About
                </a>
                <div className="pt-4 flex flex-col gap-3">
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigate("/login");
                    }}
                    className="w-full py-3 text-center font-bold text-zinc-900 border border-zinc-200 rounded-xl"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigate("/signup");
                    }}
                    className="w-full py-3 text-center font-bold text-white bg-brand rounded-xl shadow-lg shadow-brand/20"
                  >
                    Sign Up Free
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col items-center text-center lg:items-start lg:text-left z-10"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 text-brand text-xs font-bold uppercase tracking-wider mb-6"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Smart & Secure Budgeting</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-brand leading-[1.1] tracking-tight mb-6"
            >
              Track Smarter. <br />
              <span className="bg-gradient-to-r from-brand to-brand-dark bg-clip-text text-transparent">
                Spend Better.
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-zinc-800 max-w-xl mb-10 leading-relaxed"
            >
              Take control of your finances with a secure, modern expense
              tracker designed for the future. Start your journey to financial
              freedom today.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/signup")}
                className="group bg-brand text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 text-lg shadow-2xl shadow-brand/20 hover:bg-brand-dark transition-all"
              >
                Get Started Now{" "}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-zinc-900 border-2 border-zinc-100 px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 text-lg hover:border-brand/30 transition-all"
              >
                View Demo
              </motion.button>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-12 flex items-center gap-4 text-zinc-500 text-sm"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-bg-warm bg-zinc-200"
                  />
                ))}
              </div>
              <span>Joined by 5,000+ smart savers this month</span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative w-full lg:w-1/2"
          >
            {/* Background Decorative Elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand/5 rounded-full blur-3xl -z-10" />

            <motion.div
              variants={floatingVariants}
              animate="animate"
              className="relative w-full max-w-md bg-white p-6 rounded-3xl shadow-2xl border border-zinc-100"
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="font-bold text-zinc-900">Total Balance</h3>
                  <p className="text-3xl font-extrabold text-brand">
                    $12,450.00
                  </p>
                </div>
                <div className="w-12 h-12 bg-zinc-50 rounded-2xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-brand" />
                </div>
              </div>

              <div className="space-y-4">
                {[
                  {
                    icon: <PieChart />,
                    label: "Food & Drinks",
                    amount: "-$42.50",
                    color: "text-brand",
                  },
                  {
                    icon: <Wallet />,
                    label: "Freelance Income",
                    amount: "+$850.00",
                    color: "text-emerald-500",
                  },
                  {
                    icon: <TrendingUp />,
                    label: "Apple Subscription",
                    amount: "-$14.99",
                    color: "text-brand",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-2xl hover:bg-zinc-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-zinc-100 rounded-xl flex items-center justify-center text-zinc-600">
                        {item.icon}
                      </div>
                      <span className="font-medium text-zinc-900">
                        {item.label}
                      </span>
                    </div>
                    <span className={`font-bold ${item.color}`}>
                      {item.amount}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Floating Mini-cards */}
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-6 -right-6 lg:-right-12 bg-brand text-white p-4 rounded-2xl shadow-xl z-20"
            >
              <p className="text-xs opacity-80 mb-1">Savings Goal</p>
              <p className="text-xl font-bold">85% Complete</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-extrabold text-zinc-900 mb-4">
              Everything you need to master money
            </h2>
            <p className="text-xl text-zinc-600 max-w-2xl mx-auto">
              Powerful features to help you track, save, and grow your wealth
              without the headache.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: <Wallet className="w-10 h-10" />,
                title: "Automatic Tracking",
                desc: "Securely connect your accounts and let us do the heavy lifting of categorizing your spending.",
              },
              {
                icon: <PieChart className="w-10 h-10" />,
                title: "Visual Reports",
                desc: "Beautifully designed charts and graphs that give you a crystal clear picture of your finances.",
              },
              {
                icon: <ShieldCheck className="w-10 h-10" />,
                title: "Bank-Grade Security",
                desc: "Your data is encrypted with the highest standards, ensuring your financial info stays private.",
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="p-8 rounded-3xl bg-bg-warm/30 border border-zinc-100 hover:border-brand/20 transition-all"
              >
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-brand mb-6 shadow-sm">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-zinc-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-zinc-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center gap-2 justify-center mb-8">
            <div className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-extrabold tracking-tight">
              Spend<span className="text-brand">Wise</span>
            </span>
          </div>
          <p className="text-zinc-500 max-w-md mx-auto mb-12">
            The smartest way to track your expenses and build a better financial
            future.
          </p>
          <div className="flex justify-center gap-8 mb-12 pb-12 border-b border-zinc-800">
            <a href="#" className="hover:text-brand transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-brand transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-brand transition-colors">
              Twitter
            </a>
            <a href="#" className="hover:text-brand transition-colors">
              GitHub
            </a>
          </div>
          <p className="text-zinc-600 text-sm">
            © 2024 SpendWise Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
