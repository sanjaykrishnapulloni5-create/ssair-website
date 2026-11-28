"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth, type AuthUser } from "@/context/AuthContext";
import { useUIModals } from "@/context/UIModalContext";
import { motion, AnimatePresence } from "framer-motion";
import SpotlightCard from "@/components/ui/SpotlightCard";

type Tab = "overview" | "apply-teaching" | "my-applications" | "my-projects" | "profile";

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

interface ContactInquiryData {
  id: number;
  subject: string;
  message: string;
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

const QUALIFICATIONS = ["B.Tech/B.E.", "M.Tech/M.E.", "Ph.D.", "M.Sc.", "B.Sc.", "MCA", "BCA", "Other"];
const SPECIALIZATIONS = [
  "Artificial Intelligence",
  "Machine Learning",
  "Robotics",
  "Computer Vision",
  "Drone Technology",
  "Embedded Systems",
  "IoT",
  "Python / C++",
];
const EXPERIENCES = [
  { val: "Fresher (0-1 years)", label: "Student / Fresher (0–1 yrs)" },
  { val: "1-3 years", label: "1–3 years" },
  { val: "3-5 years", label: "3–5 years" },
  { val: "5-10 years", label: "5–10 years" },
  { val: "10+ years", label: "10+ years" },
];

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading, logout, updateProfile } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

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

  return <DashboardWorkspace key={user.id} user={user} logout={logout} updateProfile={updateProfile} />;
}

function DashboardWorkspace({
  user,
  logout,
  updateProfile,
}: {
  user: AuthUser;
  logout: () => Promise<void>;
  updateProfile: (payload: {
    name: string;
    phone?: string;
    institution?: string;
    currentPassword?: string;
    newPassword?: string;
  }) => Promise<{ ok: boolean; error?: string }>;
}) {
  const router = useRouter();
  const { openStartProject } = useUIModals();
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  const [applications, setApplications] = useState<TeachingAppData[]>([]);
  const [appLoading, setAppLoading] = useState(false);

  const [projectRequests, setProjectRequests] = useState<ProjectRequestData[]>([]);
  const [projLoading, setProjLoading] = useState(false);

  const [inquiries, setInquiries] = useState<ContactInquiryData[]>([]);
  const [editingAppId, setEditingAppId] = useState<number | null>(null);
  const [actionMsg, setActionMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  const [form, setForm] = useState({
    fullName: user.name,
    email: user.email,
    phone: user.phone || "",
    qualification: "",
    specialization: "",
    experience: "",
    motivation: "",
  });
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [profileForm, setProfileForm] = useState({
    name: user.name,
    phone: user.phone || "",
    institution: user.institution || "",
    currentPassword: "",
    newPassword: "",
  });
  const [profileSaving, setProfileSaving] = useState(false);

  const loadAllPortalData = useCallback(async () => {
    setAppLoading(true);
    setProjLoading(true);
    try {
      const [appRes, projRes, contactRes] = await Promise.all([
        fetch("/api/teaching-application", { cache: "no-store" }),
        fetch("/api/project-request", { cache: "no-store" }),
        fetch("/api/contact", { cache: "no-store" }),
      ]);
      if (appRes.ok) {
        const d = (await appRes.json()) as { applications?: TeachingAppData[] };
        setApplications(d.applications || []);
      }
      if (projRes.ok) {
        const d = (await projRes.json()) as { requests?: ProjectRequestData[] };
        setProjectRequests(d.requests || []);
      }
      if (contactRes.ok) {
        const d = (await contactRes.json()) as { inquiries?: ContactInquiryData[] };
        setInquiries(d.inquiries || []);
      }
    } catch {}
    setAppLoading(false);
    setProjLoading(false);
  }, []);

  useEffect(() => {
    let active = true;
    Promise.all([
      fetch("/api/teaching-application", { cache: "no-store" }).then((r) =>
        r.ok ? (r.json() as Promise<{ applications?: TeachingAppData[] }>) : { applications: [] }
      ),
      fetch("/api/project-request", { cache: "no-store" }).then((r) =>
        r.ok ? (r.json() as Promise<{ requests?: ProjectRequestData[] }>) : { requests: [] }
      ),
      fetch("/api/contact", { cache: "no-store" }).then((r) =>
        r.ok ? (r.json() as Promise<{ inquiries?: ContactInquiryData[] }>) : { inquiries: [] }
      ),
    ])
      .then(([appData, projData, contactData]) => {
        if (!active) return;
        setApplications(appData.applications || []);
        setProjectRequests(projData.requests || []);
        setInquiries(contactData.inquiries || []);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  const handleApplyOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitLoading(true);

    try {
      const isEditing = editingAppId !== null;
      const endpoint = "/api/teaching-application";
      const payload = isEditing
        ? {
            id: editingAppId,
            phone: form.phone,
            qualification: form.qualification,
            specialization: form.specialization,
            experience: form.experience,
            motivation: form.motivation,
          }
        : form;

      const res = await fetch(endpoint, {
        method: isEditing ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { error?: string };
      if (res.ok) {
        setSubmitSuccess(true);
        setEditingAppId(null);
        setForm({
          fullName: user?.name || "",
          email: user?.email || "",
          phone: user?.phone || "",
          qualification: "",
          specialization: "",
          experience: "",
          motivation: "",
        });
        await loadAllPortalData();
      } else {
        setSubmitError(data.error || "Failed to submit application");
      }
    } catch {
      setSubmitError("Network error. Please try again.");
    }
    setSubmitLoading(false);
  };

  const handleEditPendingApp = (app: TeachingAppData) => {
    setEditingAppId(app.id);
    setForm({
      fullName: app.fullName,
      email: app.email,
      phone: app.phone,
      qualification: app.qualification,
      specialization: app.specialization,
      experience: app.experience,
      motivation: app.motivation,
    });
    setSubmitError("");
    setSubmitSuccess(false);
    setActiveTab("apply-teaching");
  };

  const handleWithdrawApp = async (id: number) => {
    setActionMsg(null);
    try {
      const res = await fetch(`/api/teaching-application?id=${id}`, { method: "DELETE" });
      const data = (await res.json()) as { error?: string };
      if (res.ok) {
        setApplications((prev) => prev.filter((a) => a.id !== id));
        setActionMsg({ type: "ok", text: "Teaching application withdrawn." });
      } else {
        setActionMsg({ type: "err", text: data.error || "Unable to withdraw application." });
      }
    } catch {
      setActionMsg({ type: "err", text: "Network error." });
    }
  };

  const handleWithdrawProject = async (id: number) => {
    setActionMsg(null);
    try {
      const res = await fetch(`/api/project-request?id=${id}`, { method: "DELETE" });
      const data = (await res.json()) as { error?: string };
      if (res.ok) {
        setProjectRequests((prev) => prev.filter((r) => r.id !== id));
        setActionMsg({ type: "ok", text: "Project brief withdrawn." });
      } else {
        setActionMsg({ type: "err", text: data.error || "Unable to withdraw project brief." });
      }
    } catch {
      setActionMsg({ type: "err", text: "Network error." });
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionMsg(null);
    setProfileSaving(true);
    const result = await updateProfile({
      name: profileForm.name,
      phone: profileForm.phone,
      institution: profileForm.institution,
      currentPassword: profileForm.currentPassword || undefined,
      newPassword: profileForm.newPassword || undefined,
    });
    if (result.ok) {
      setProfileForm((p) => ({ ...p, currentPassword: "", newPassword: "" }));
      setActionMsg({ type: "ok", text: "Profile and security settings updated in database." });
    } else {
      setActionMsg({ type: "err", text: result.error || "Failed to update profile." });
    }
    setProfileSaving(false);
  };

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const tabs: { id: Tab; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "apply-teaching", label: editingAppId ? "Edit Application" : "Apply for Teaching" },
    { id: "my-applications", label: `Teaching (${applications.length})` },
    { id: "my-projects", label: `Projects (${projectRequests.length})` },
    { id: "profile", label: "Profile & Inquiries" },
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
                  {user.email}
                  {user.institution ? ` · ${user.institution}` : " · SSAIR Unified Student & Instructor Desk"}
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
                    setActionMsg(null);
                    if (tab.id !== "apply-teaching") {
                      setEditingAppId(null);
                    }
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
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {actionMsg && (
          <div
            role="status"
            className={`p-3.5 rounded-2xl text-xs sm:text-sm font-medium border ${
              actionMsg.type === "ok"
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300"
                : "bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400"
            }`}
          >
            {actionMsg.text}
          </div>
        )}

        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                  { label: "Teaching Applications", value: String(applications.length), badge: "FELLOWSHIP" },
                  { label: "Project & R&D Briefs", value: String(projectRequests.length), badge: "PROJECTS" },
                  { label: "Contact Inquiries", value: String(inquiries.length), badge: "SUPPORT" },
                  {
                    label: "Member Since",
                    value: new Date(user.createdAt).toLocaleDateString("en-IN", { month: "short", year: "numeric" }),
                    badge: user.role,
                  },
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
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
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
                      Check review updates or edit your submitted instructor form.
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
              transition={{ duration: 0.2 }}
              className="max-w-2xl mx-auto"
            >
              <SpotlightCard className="p-6 sm:p-8">
                <div className="mb-6">
                  <span className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                    SSAIR Faculty &amp; Teaching Fellowship
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
                    {editingAppId ? "Update Pending Teaching Application" : "Apply to Join Our Teaching Team"}
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
                      Teaching Application Saved!
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
                  <form onSubmit={handleApplyOrUpdate} className="space-y-4">
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
                          disabled={editingAppId !== null}
                          value={form.fullName}
                          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                          className="w-full min-h-[44px] px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/70 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:opacity-60"
                        />
                      </div>
                      <div>
                        <label htmlFor="ta-email" className="block text-xs font-semibold mb-1.5">Email *</label>
                        <input
                          id="ta-email"
                          type="email"
                          required
                          disabled={editingAppId !== null}
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full min-h-[44px] px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/70 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:opacity-60"
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
                          {QUALIFICATIONS.map((q) => (
                            <option key={q} value={q}>{q}</option>
                          ))}
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
                          {SPECIALIZATIONS.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
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
                          {EXPERIENCES.map((ex) => (
                            <option key={ex.val} value={ex.val}>{ex.label}</option>
                          ))}
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

                    <div className="flex gap-3">
                      {editingAppId !== null && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingAppId(null);
                            setActiveTab("my-applications");
                          }}
                          className="px-5 py-3.5 rounded-xl font-semibold text-sm border border-slate-200 dark:border-slate-700 cursor-pointer"
                        >
                          Cancel Edit
                        </button>
                      )}
                      <button
                        type="submit"
                        disabled={submitLoading}
                        className="flex-1 py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-emerald-600 to-cyan-500 hover:from-emerald-500 hover:to-cyan-400 shadow-lg cursor-pointer"
                      >
                        {submitLoading
                          ? "Saving..."
                          : editingAppId
                          ? "Save Application Changes →"
                          : "Submit Teaching Application →"}
                      </button>
                    </div>
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
              transition={{ duration: 0.2 }}
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
                    onClick={loadAllPortalData}
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
                        className="p-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-slate-950/50 space-y-2.5"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h3 className="font-bold text-slate-900 dark:text-white">{app.specialization}</h3>
                          <span className={`px-3 py-0.5 rounded-full text-xs font-mono font-semibold ${STATUS_COLORS[app.status] || ""}`}>
                            {app.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500">
                          {app.qualification} · {app.experience} · {app.phone} · Applied{" "}
                          {new Date(app.createdAt).toLocaleDateString("en-IN")}
                        </p>
                        <p className="text-xs text-slate-600 dark:text-slate-300 pt-1">{app.motivation}</p>
                        {app.status === "PENDING" && (
                          <div className="pt-2 flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={() => handleEditPendingApp(app)}
                              className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-cyan-500/40 text-sky-700 dark:text-cyan-300 hover:bg-cyan-500/10 cursor-pointer"
                            >
                              Edit Details
                            </button>
                            <button
                              type="button"
                              onClick={() => handleWithdrawApp(app.id)}
                              className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-rose-500/30 text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 cursor-pointer"
                            >
                              Withdraw
                            </button>
                          </div>
                        )}
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
              transition={{ duration: 0.2 }}
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
                      onClick={loadAllPortalData}
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
                        className="p-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-slate-950/50 space-y-2.5"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            {req.projectCode && (
                              <span className="px-2 py-0.5 rounded bg-cyan-500/15 text-sky-700 dark:text-cyan-400 font-mono text-[11px]">
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
                        {req.status === "SUBMITTED" && (
                          <div className="pt-1">
                            <button
                              type="button"
                              onClick={() => handleWithdrawProject(req.id)}
                              className="px-3 py-1 rounded-lg text-xs font-semibold border border-rose-500/30 text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 cursor-pointer"
                            >
                              Withdraw Brief
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </SpotlightCard>
            </motion.div>
          )}

          {activeTab === "profile" && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6"
            >
              <SpotlightCard className="lg:col-span-6 p-6 sm:p-8">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                  Account &amp; Security Settings
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">
                  Save contact info to pre-fill project briefs &amp; teaching forms automatically.
                </p>

                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div>
                    <label htmlFor="pf-name" className="block text-xs font-semibold mb-1">Full Name *</label>
                    <input
                      id="pf-name"
                      type="text"
                      required
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      className="w-full min-h-[44px] px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/70 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="pf-phone" className="block text-xs font-semibold mb-1">Phone / WhatsApp</label>
                    <input
                      id="pf-phone"
                      type="tel"
                      placeholder="+91 98481 26456"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      className="w-full min-h-[44px] px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/70 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="pf-inst" className="block text-xs font-semibold mb-1">College / Organization</label>
                    <input
                      id="pf-inst"
                      type="text"
                      placeholder="e.g. IISc Bangalore / VTU / Defense PSU"
                      value={profileForm.institution}
                      onChange={(e) => setProfileForm({ ...profileForm, institution: e.target.value })}
                      className="w-full min-h-[44px] px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/70 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>

                  <div className="pt-3 border-t border-slate-200 dark:border-white/10 space-y-3">
                    <div className="text-xs font-mono uppercase tracking-wider text-slate-500">
                      Optional Password Change
                    </div>
                    <input
                      type="password"
                      autoComplete="current-password"
                      placeholder="Current password"
                      value={profileForm.currentPassword}
                      onChange={(e) => setProfileForm({ ...profileForm, currentPassword: e.target.value })}
                      className="w-full min-h-[42px] px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/70 text-sm"
                    />
                    <input
                      type="password"
                      autoComplete="new-password"
                      placeholder="New password (min 6 characters)"
                      value={profileForm.newPassword}
                      onChange={(e) => setProfileForm({ ...profileForm, newPassword: e.target.value })}
                      className="w-full min-h-[42px] px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/70 text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={profileSaving}
                    className="w-full py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-blue-600 to-cyan-500 cursor-pointer"
                  >
                    {profileSaving ? "Saving Profile..." : "Save Profile Changes →"}
                  </button>
                </form>
              </SpotlightCard>

              <SpotlightCard className="lg:col-span-6 p-6 sm:p-8">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                      My Contact Inquiries
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Messages sent from the Contact page under {user.email}
                    </p>
                  </div>
                  <Link
                    href="/contact"
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-sky-600/10 text-sky-700 dark:text-cyan-300 border border-cyan-500/30"
                  >
                    New Message →
                  </Link>
                </div>

                {inquiries.length === 0 ? (
                  <p className="text-sm text-slate-500 py-8 text-center">
                    No direct contact inquiries recorded under your email yet.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {inquiries.map((inq) => (
                      <div
                        key={inq.id}
                        className="p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-slate-950/50 space-y-1.5"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="font-bold text-sm text-slate-900 dark:text-white">{inq.subject}</h3>
                          <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold ${STATUS_COLORS[inq.status] || ""}`}>
                            {inq.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500">
                          Sent {new Date(inq.createdAt).toLocaleDateString("en-IN")}
                        </p>
                        <p className="text-xs text-slate-600 dark:text-slate-300">{inq.message}</p>
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
