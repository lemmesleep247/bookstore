import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { BookOpen, Quote, ShieldCheck, Sparkles, Truck } from "lucide-react";

interface AuthLayoutProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  children: ReactNode;
}

const features = [
  { icon: BookOpen, text: "Thousands of titles across every genre" },
  { icon: ShieldCheck, text: "Secure checkout, every single time" },
  { icon: Truck, text: "Fast delivery, tracked from cart to door" },
];

const panelVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const panelItem = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export function AuthLayout({
  eyebrow,
  title,
  subtitle,
  children,
}: AuthLayoutProps) {
  return (
    <div className="relative flex min-h-screen overflow-hidden bg-[#f8fafc]">
      <div className="relative hidden w-[46%] overflow-hidden bg-slate-950 lg:flex lg:flex-col lg:justify-between lg:p-14 xl:p-16">
        <motion.div
          className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-brand-500/30 blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="pointer-events-none absolute -right-16 -bottom-32 h-96 w-96 rounded-full bg-cyan-300/20 blur-3xl"
          animate={{ x: [0, -20, 0], y: [0, -30, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="pointer-events-none absolute top-1/3 right-1/3 h-56 w-56 rounded-full bg-white/10 blur-3xl"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <motion.div
          className="pointer-events-none absolute top-1/4 left-16 text-white/10"
          animate={{ y: [0, -16, 0], rotate: [0, 6, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        >
          <BookOpen className="h-24 w-24" />
        </motion.div>
        <motion.div
          className="pointer-events-none absolute top-2/3 right-20 text-white/10"
          animate={{ y: [0, 18, 0], rotate: [0, -8, 0] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <Sparkles className="h-16 w-16" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 flex items-center gap-3 text-white"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/10 backdrop-blur">
            <BookOpen className="h-5 w-5" />
          </div>
          <span className="text-lg font-semibold tracking-tight">
            The Bookstore
          </span>
        </motion.div>

        <motion.div
          variants={panelVariants}
          initial="hidden"
          animate="show"
          className="relative z-10"
        >
          <motion.p
            variants={panelItem}
            className="text-sm font-medium tracking-wider text-brand-100 uppercase"
          >
            {eyebrow}
          </motion.p>
          <motion.h1
            variants={panelItem}
            className="mt-4 max-w-lg text-4xl leading-[1.15] font-semibold tracking-tight text-white xl:text-5xl"
          >
            {title}
          </motion.h1>
          <motion.p
            variants={panelItem}
            className="mt-5 max-w-md text-base leading-7 text-slate-300"
          >
            {subtitle}
          </motion.p>

          <ul className="mt-10 grid gap-3 xl:grid-cols-2">
            {features.map(({ icon: Icon, text }) => (
              <motion.li
                key={text}
                variants={panelItem}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.06] p-3 text-sm text-white/90 backdrop-blur-sm last:xl:col-span-2"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10">
                  <Icon className="h-4 w-4" />
                </div>
                {text}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="relative z-10 flex items-center justify-between text-xs text-white/40"
        >
          <span>© {new Date().getFullYear()} The Bookstore</span>
          <span className="flex items-center gap-1.5">
            <Quote className="h-3 w-3" /> Read more. Live more.
          </span>
        </motion.div>
      </div>

      <div className="relative flex w-full flex-col items-center justify-center px-4 py-8 sm:px-8 lg:w-[54%] lg:py-12">
        <div className="pointer-events-none absolute top-0 right-0 h-72 w-72 rounded-full bg-brand-100/60 blur-3xl" />
        <div className="relative z-10 mb-6 flex items-center gap-2 lg:hidden">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-white shadow-lg shadow-brand-200">
            <BookOpen className="h-5 w-5" />
          </div>
          <span className="text-lg font-semibold text-slate-900">
            The Bookstore
          </span>
        </div>
        <div className="relative z-10 w-full">{children}</div>
      </div>
    </div>
  );
}
