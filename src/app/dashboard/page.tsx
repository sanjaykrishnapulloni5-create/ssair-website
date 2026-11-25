"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useUIModals } from "@/context/UIModalContext";
import { motion, AnimatePresence } from "framer-motion";
import SpotlightCard from "@/components/ui/SpotlightCard";

type Tab = "overview" | "apply-teaching" | "my-applications" | "my-projects";

interface TeachingAppData {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  qualification: string;
  specialization: string;
  experience: string;
  motivation: string;
  status: string;
  createdAt: string;
}

interface ProjectRequestData {
  id: number;
  track: string;
  domain: string;
  projectCode: string | null;
  title: string;
  requirements: string;
  status: string;
  createdAt: string;
}

const STATUS_COLORS: Record<string, string> = {
  PENDING: "bg-amber-500/15 text-amber-600 dark:text-amber-300 border border-amber-500/30",
  SUBMITTED: "bg-cyan-500/15 text-sky-700 dark:text-cyan-300 border border-cyan-500/30",
  REVIEWING: "bg-blue-500/15 text-blue-600 dark:text-blue-300 border border-blue-500/30",
  UNDER_REVIEW: "bg-blue-500/15 text-blue-600 dark:text-blue-300 border border-blue-500/30",
  ACCEPTED: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30",
  APPROVED: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30",
  REJECTED: "bg-rose-500/15 text-rose-600 dark:text-rose-300 border border-rose-500/30",
};

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading, logout } = useAuth();
  const { openStartProject } = useUIModals();
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  const [applications, setApplications] = useState<TeachingAppData[]>([]);
  const [appLoading, setAppLoading] = useState(false);

  const [projectRequests, setProjectRequests] = useState<ProjectRequestData[]>([]);
  const [projLoading, setProjLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    qualification: "",
    specialization: "",
    experience: "",
    motivation: "",
  });
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const fetchApplications = async () => {
    setAppLoading(true);
    try {
      const res = await fetch("/api/teaching-application");
      if (res.ok) {
        const data = await res.json();
        setApplications(data.applications || []);
      }
    } catch {}
    setAppLoading(false);
  };

  const fetchProjectRequests = async () => {
    setProjLoading(true);
    try {
      const res = await fetch("/api/project-request");
      if (res.ok) {
        const data = await res.json();
        setProjectRequests(data.requests || []);
      }
    } catch {}
    setProjLoading(false);
  };

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;
    let active = true;
    if (activeTab === "my-applications") {
      fetch("/api/teaching-application")
        .then((res) => (res.ok ? res.json() : { applications: [] }))
        .then((data) => {
          if (active) setApplications(data.applications || []);
        })
        .catch(() => {});
    } else if (activeTab === "my-projects") {
      fetch("/api/project-request")
        .then((res) => (res.ok ? res.json() : { requests: [] }))
        .then((data) => {
          if (active) setProjectRequests(data.requests || []);
        })
        .catch(() => {});
    }
    return () => {
      active = false;
    };
  }, [activeTab, user]);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitLoading(true);

    try {
      const payload = {
        ...form,
        fullName: form.fullName || user?.name || "",
        email: form.email || user?.email || "",
      };
      const res = await fetch("/api/teaching-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        setSubmitSuccess(true);
        setForm({
          fullName: user?.name || "",
          email: user?.email || "",
          phone: "",
          qualification: "",
          specialization: "",
          experience: "",
          motivation: "",
        });
      } else {
        setSubmitError(data.error || "Failed to submit application");
      }
    } catch {
      setSubmitError("Network error. Please try again.");
    }
    setSubmitLoading(false);
  };

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#050811]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-cyan-500/30 border-t-cyan-400 animate-spin" />
          <span className="text-xs font-mono text-slate-500">Loading Student Portal...</span>
        </div>
      </div>
    );
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "apply-teaching", label: "Apply for Teaching" },
    { id: "my-applications", label: "Teaching Applications" },
    { id: "my-projects", label: "Project & R&D Briefs" },
  ];

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-[#050811] text-slate-900 dark:text-slate-100 pt-24 sm:pt-28 pb-20 overflow-hidden">
      <div className="fixed inset-0 bg-cyber-grid opacity-50 pointer-events-none" />

      {/* Portal Header & Tabs */}
      <div className="relative z-20 bg-white/85 dark:bg-[#091022]/85 backdrop-blur-xl border-y border-slate-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4 py-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center text-white font-bold text-base shadow-md shadow-cyan-500/20">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                    Welcome, {user.name.split(" ")[0]}
                  </h1>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30">
                    {user.role}
                  </span>
                </div>
                <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-0.5">
                  {user.email} · SSAIR Unified Student &amp; Instructor Desk
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => openStartProject()}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 shadow-sm cursor-pointer"
              >
                + Start Project
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 transition-colors cursor-pointer"
              >
                Sign out
              </button>
            </div>
          </div>

          <div
            role="tablist"
            aria-label="Student Dashboard Sections"
            className="flex gap-1 -mb-px overflow-x-auto"
          >
            {tabs.map((tab) => {
              const selected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setSubmitSuccess(false);
                    setSubmitError("");
                  }}
                  className={`relative px-4 py-3.5 text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    selected
                      ? "text-sky-600 dark:text-cyan-400 after:absolute after:inset-x-0 after:bottom-0 after:border-b-2 after:border-sky-600 dark:after:border-cyan-400"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Dashboard Body */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                  { label: "Portal Status", value: "Verified Active", badge: "LIVE" },
                  { label: "Account Role", value: user.role, badge: "ACCESS" },
                  { label: "Member Since", value: new Date(user.createdAt).toLocaleDateString("en-IN", { month: "short", year: "numeric" }), badge: "COHORT" },
                  { label: "Auth Method", value: user.provider === "credentials" ? "Email / JWT" : "OAuth", badge: "SECURE" },
                ].map((stat) => (
                  <SpotlightCard key={stat.label} className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        {stat.label}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/15 text-sky-600 dark:text-cyan-300">
                        {stat.badge}
                      </span>
                    </div>
                    <p className="text-xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
                  </SpotlightCard>
                ))}
              </div>

              <SpotlightCard className="p-6 sm:p-8">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-5">
                  Student &amp; Teaching Actions
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <button
                    type="button"
                    onClick={() => setActiveTab("apply-teaching")}
                    className="p-5 rounded-2xl border border-emerald-500/35 bg-emerald-500/10 hover:bg-emerald-500/15 text-left transition-all cursor-pointer"
                  >
                    <div className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                      Teaching Fellowship
                    </div>
                    <div className="text-base font-bold text-slate-900 dark:text-white mt-1">
                      Apply to Teach
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                      Join SSAIR as an AI, ML, Robotics, or Embedded instructor.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("my-applications")}
                    className="p-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03] hover:border-cyan-400 text-left transition-all cursor-pointer"
                  >
                    <div className="text-xs font-mono font-bold text-sky-600 dark:text-cyan-400 uppercase">
                      Application Status
                    </div>
                    <div className="text-base font-bold text-slate-900 dark:text-white mt-1">
                      Track Teaching Review
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                      Check review updates on your submitted instructor forms.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => openStartProject()}
                    className="p-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03] hover:border-blue-400 text-left transition-all cursor-pointer"
                  >
                    <div className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase">
                      Capstone / IEEE / Intern
                    </div>
                    <div className="text-base font-bold text-slate-900 dark:text-white mt-1">
                      Request R&amp;D Project
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                      Submit a custom robotics/AI project or internship request.
                    </p>
                  </button>

                  <Link
                    href="/academy"
                    className="p-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03] hover:border-purple-400 text-left transition-all"
                  >
                    <div className="text-xs font-mono font-bold text-purple-600 dark:text-purple-400 uppercase">
                      Workshops &amp; Labs
                    </div>
                    <div className="text-base font-bold text-slate-900 dark:text-white mt-1">
                      Explore Academy
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                      Browse drone, cobot &amp; computer vision training cohorts.
                    </p>
                  </Link>
                </div>
              </SpotlightCard>
            </motion.div>
          )}

          {activeTab === "apply-teaching" && (
            <motion.div
              key="apply-teaching"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="max-w-2xl mx-auto"
            >
              <SpotlightCard className="p-6 sm:p-8">
                <div className="mb-6">
                  <span className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                    SSAIR Faculty &amp; Teaching Fellowship
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
                    Apply to Join Our Teaching Team
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Share your domain expertise with aspiring robotics &amp; AI engineers across India.
                  </p>
                </div>

                {submitSuccess ? (
                  <div className="text-center py-10 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center mx-auto">
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      Teaching Application Submitted!
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Our scientific review board will evaluate your application shortly.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab("my-applications");
                        setSubmitSuccess(false);
                      }}
                      className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 cursor-pointer"
                    >
                      View My Applications →
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApply} className="space-y-4">
                    {submitError && (
                      <div role="alert" className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-medium">
                        {submitError}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="ta-name" className="block text-xs font-semibold mb-1.5">Full Name *</label>
                        <input
                          id="ta-name"
                          type="text"
                          required
                          value={form.fullName || user.name}
                          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                          className="w-full min-h-[44px] px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/70 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="ta-email" className="block text-xs font-semibold mb-1.5">Email *</label>
                        <input
                          id="ta-email"
                          type="email"
                          required
                          value={form.email || user.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full min-h-[44px] px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/70 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="ta-phone" className="block text-xs font-semibold mb-1.5">Phone Number *</label>
                        <input
                          id="ta-phone"
                          type="tel"
                          required
                          placeholder="+91 98765 43210"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          className="w-full min-h-[44px] px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/70 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="ta-qual" className="block text-xs font-semibold mb-1.5">Qualification *</label>
                        <select
                          id="ta-qual"
                          required
                          value={form.qualification}
                          onChange={(e) => setForm({ ...form, qualification: e.target.value })}
                          className="w-full min-h-[44px] px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/70 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        >
                          <option value="">Select qualification</option>
                          <option value="B.Tech/B.E.">B.Tech / B.E.</option>
                          <option value="M.Tech/M.E.">M.Tech / M.E.</option>
                          <option value="Ph.D.">Ph.D.</option>
                          <option value="M.Sc.">M.Sc.</option>
                          <option value="B.Sc.">B.Sc.</option>
                          <option value="MCA">MCA</option>
                          <option value="BCA">BCA</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="ta-spec" className="block text-xs font-semibold mb-1.5">Specialization *</label>
                        <select
                          id="ta-spec"
                          required
                          value={form.specialization}
                          onChange={(e) => setForm({ ...form, specialization: e.target.value })}
                          className="w-full min-h-[44px] px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/70 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        >
                          <option value="">Select specialization</option>
                          <option value="Artificial Intelligence">Artificial Intelligence</option>
                          <option value="Machine Learning">Machine Learning</option>
                          <option value="Robotics">Robotics &amp; ROS 2</option>
                          <option value="Computer Vision">Computer Vision (YOLO/OpenCV)</option>
                          <option value="Drone Technology">Drone &amp; PX4 UAV Technology</option>
                          <option value="Embedded Systems">Embedded Systems &amp; RTOS</option>
                          <option value="IoT">Internet of Things (IoT)</option>
                          <option value="Python / C++">Python / C++ Engineering</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="ta-exp" className="block text-xs font-semibold mb-1.5">Experience *</label>
                        <select
                          id="ta-exp"
                          required
                          value={form.experience}
                          onChange={(e) => setForm({ ...form, experience: e.target.value })}
                          className="w-full min-h-[44px] px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/70 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        >
                          <option value="">Select experience</option>
                          <option value="Fresher (0-1 years)">Student / Fresher (0–1 yrs)</option>
                          <option value="1-3 years">1–3 years</option>
                          <option value="3-5 years">3–5 years</option>
                          <option value="5-10 years">5–10 years</option>
                          <option value="10+ years">10+ years</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="ta-mot" className="block text-xs font-semibold mb-1.5">
                        Why do you want to teach at SSAIR? *
                      </label>
                      <textarea
                        id="ta-mot"
                        rows={4}
                        required
                        placeholder="Describe your projects, workshops taught, or passion for mentoring..."
                        value={form.motivation}
                        onChange={(e) => setForm({ ...form, motivation: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/70 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitLoading}
                      className="w-full py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-emerald-600 to-cyan-500 hover:from-emerald-500 hover:to-cyan-400 shadow-lg cursor-pointer"
                    >
                      {submitLoading ? "Submitting..." : "Submit Teaching Application →"}
                    </button>
                  </form>
                )}
              </SpotlightCard>
            </motion.div>
          )}

          {activeTab === "my-applications" && (
            <motion.div
              key="my-applications"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <SpotlightCard className="p-6 sm:p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                      My Teaching Applications
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Real-time status of your instructor / fellowship submissions
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={fetchApplications}
                    className="px-3 py-1.5 rounded-lg text-xs font-mono border border-slate-200 dark:border-white/10 hover:border-cyan-400 cursor-pointer"
                  >
                    {appLoading ? "Refreshing..." : "Refresh"}
                  </button>
                </div>

                {applications.length === 0 ? (
                  <div className="text-center py-12 space-y-3">
                    <p className="text-sm text-slate-500">No teaching applications submitted yet.</p>
                    <button
                      type="button"
                      onClick={() => setActiveTab("apply-teaching")}
                      className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-emerald-600 to-cyan-500 cursor-pointer"
                    >
                      Apply to Teach Now →
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {applications.map((app) => (
                      <div
                        key={app.id}
                        className="p-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-slate-950/50 space-y-2"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h3 className="font-bold text-slate-900 dark:text-white">{app.specialization}</h3>
                          <span className={`px-3 py-0.5 rounded-full text-xs font-mono font-semibold ${STATUS_COLORS[app.status] || ""}`}>
                            {app.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500">
                          {app.qualification} · {app.experience} · Applied {new Date(app.createdAt).toLocaleDateString("en-IN")}
                        </p>
                        <p className="text-xs text-slate-600 dark:text-slate-300 pt-1">{app.motivation}</p>
                      </div>
                    ))}
                  </div>
                )}
              </SpotlightCard>
            </motion.div>
          )}

          {activeTab === "my-projects" && (
            <motion.div
              key="my-projects"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <SpotlightCard className="p-6 sm:p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                      My Project, Workshop &amp; R&amp;D Briefs
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Track capstone topics, custom prototypes, and academy enrollments
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={fetchProjectRequests}
                      className="px-3 py-1.5 rounded-lg text-xs font-mono border border-slate-200 dark:border-white/10 hover:border-cyan-400 cursor-pointer"
                    >
                      {projLoading ? "Refreshing..." : "Refresh"}
                    </button>
                    <button
                      type="button"
                      onClick={() => openStartProject()}
                      className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 cursor-pointer"
                    >
                      + New Brief
                    </button>
                  </div>
                </div>

                {projectRequests.length === 0 ? (
                  <div className="text-center py-12 space-y-3">
                    <p className="text-sm text-slate-500">No project or academy briefs submitted yet.</p>
                    <button
                      type="button"
                      onClick={() => openStartProject()}
                      className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 cursor-pointer"
                    >
                      Submit a Project Brief →
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {projectRequests.map((req) => (
                      <div
                        key={req.id}
                        className="p-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-slate-950/50 space-y-2"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            {req.projectCode && (
                              <span className="px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-400 font-mono text-[11px]">
                                {req.projectCode}
                              </span>
                            )}
                            <h3 className="font-bold text-slate-900 dark:text-white">{req.title}</h3>
                          </div>
                          <span className={`px-3 py-0.5 rounded-full text-xs font-mono font-semibold ${STATUS_COLORS[req.status] || ""}`}>
                            {req.status}
                          </span>
                        </div>
                        <p className="text-xs font-mono text-slate-500">
                          {req.track} · {req.domain} · {new Date(req.createdAt).toLocaleDateString("en-IN")}
                        </p>
                        <p className="text-xs text-slate-600 dark:text-slate-300 pt-1">{req.requirements}</p>
                      </div>
                    ))}
                  </div>
                )}
              </SpotlightCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
