"use client";

import React, { useState, useId } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import ModalDialog from "@/components/ui/ModalDialog";
import { BrandEmblem } from "@/components/ui/BrandEmblem";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleInfoOpen, setGoogleInfoOpen] = useState(false);
  const googleDialogTitleId = useId();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await login(email, password);
    if (result.ok) {
      router.push("/dashboard");
    } else {
      setError(result.error || "Login failed");
    }
    setLoading(false);
  };

  const handleDemoLogin = async () => {
    setGoogleInfoOpen(false);
    setError("");
    setLoading(true);
    const result = await login("test@ssair.in", "test123");
    if (result.ok) {
      router.push("/dashboard");
    } else {
      setError(result.error || "Demo login failed. Try registering an account.");
    }
    setLoading(false);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-16 bg-slate-50 dark:bg-[#050811] overflow-hidden">
      {/* Cyber Grid & Ambient Aura */}
      <div className="fixed inset-0 bg-cyber-grid opacity-70 pointer-events-none" />
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-40 -right-40 w-[560px] h-[560px]"
          style={{ background: "radial-gradient(closest-side, rgba(6, 182, 212, 0.14), transparent)" }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-[560px] h-[560px]"
          style={{ background: "radial-gradient(closest-side, rgba(37, 99, 235, 0.14), transparent)" }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-white dark:bg-[#091022] rounded-3xl border border-slate-200 dark:border-cyan-500/25 shadow-2xl p-8 sm:p-10">
          <div className="text-center mb-7">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-5">
              <BrandEmblem className="w-11 h-11" />
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                SS<span className="text-sky-600 dark:text-cyan-400">AIR</span>
              </span>
            </Link>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Student &amp; Teaching Portal
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Sign in to access R&amp;D tracks &amp; apply to teach
            </p>
          </div>

          {/* Google Sign-In Button */}
          <button
            type="button"
            onClick={() => setGoogleInfoOpen(true)}
            className="w-full min-h-[46px] flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-white dark:bg-white/5 text-slate-700 dark:text-slate-100 font-semibold text-sm hover:border-cyan-400 transition-all shadow-sm cursor-pointer"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-[#091022] px-3 text-slate-400 font-mono">
                or sign in with email
              </span>
            </div>
          </div>

          {error && (
            <div role="alert" className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="login-email" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Email address *
              </label>
              <input
                id="login-email"
                name="email"
                type="email"
                autoComplete="email"
                autoCorrect="off"
                autoCapitalize="none"
                spellCheck={false}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full min-h-[46px] px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/70 text-base sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div>
              <label htmlFor="login-password" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Password *
              </label>
              <div className="relative">
                <input
                  id="login-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className="w-full min-h-[46px] px-4 py-3 pr-12 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/70 text-base sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <button
                  type="button"
                  aria-pressed={showPassword}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-cyan-300 cursor-pointer"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full min-h-[46px] py-3 px-4 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 disabled:opacity-60 shadow-lg shadow-cyan-500/20 transition-all text-sm cursor-pointer"
            >
              {loading ? "Signing in..." : "Sign in to Portal →"}
            </button>
          </form>

          {/* Instant Demo Student Quick Access */}
          <div className="mt-5 p-3.5 rounded-2xl bg-slate-100/80 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 flex items-center justify-between gap-3">
            <div className="text-xs">
              <div className="font-semibold text-slate-800 dark:text-slate-200">Quick Student Preview</div>
              <div className="text-slate-500 font-mono">test@ssair.in</div>
            </div>
            <button
              type="button"
              onClick={handleDemoLogin}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-sky-600/15 dark:bg-cyan-500/15 text-sky-700 dark:text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/25 cursor-pointer"
            >
              1-Click Demo
            </button>
          </div>

          <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
            New to SSAIR?{" "}
            <Link
              href="/register"
              className="text-sky-600 dark:text-cyan-400 font-semibold hover:underline"
            >
              Create Student Account
            </Link>
          </p>
        </div>

        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-xs font-mono text-slate-500 dark:text-slate-400 hover:text-cyan-400 transition-colors"
          >
            ← Back to SSAIR Home
          </Link>
        </div>
      </motion.div>

      {/* Transparent Google OAuth Info Dialog */}
      <ModalDialog
        open={googleInfoOpen}
        onClose={() => setGoogleInfoOpen(false)}
        labelledBy={googleDialogTitleId}
        maxWidthClass="max-w-md"
      >
        <div className="rounded-3xl border border-slate-200 dark:border-cyan-500/30 bg-white dark:bg-[#091022] p-7 text-slate-900 dark:text-slate-100 shadow-2xl space-y-4">
          <h1 id={googleDialogTitleId} className="text-lg font-bold">
            Google Sign-In (Credentials-Free Mode)
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Real Google OAuth requires Google Cloud OAuth Client credentials in <code className="font-mono text-cyan-400">.env</code>. Since this workspace runs without external OAuth secrets, you can either sign in immediately with our <strong>1-Click Demo Student</strong> or create an email/password account locally!
          </p>
          <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
            <button
              type="button"
              onClick={handleDemoLogin}
              className="flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 cursor-pointer"
            >
              Sign In as Demo Student →
            </button>
            <button
              type="button"
              onClick={() => setGoogleInfoOpen(false)}
              className="py-2.5 px-4 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-700 cursor-pointer"
            >
              Use Email Form
            </button>
          </div>
        </div>
      </ModalDialog>
    </div>
  );
}
