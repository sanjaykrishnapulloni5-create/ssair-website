"use client";

import React, { useState, useId } from "react";
import ModalDialog from "@/components/ui/ModalDialog";
import { useUIModals, type StartProjectPrefill } from "@/context/UIModalContext";
import { useAuth } from "@/context/AuthContext";

const TRACKS = [
  "Enterprise & Defense",
  "B.Tech / M.Tech Capstone",
  "PhD & IEEE Research",
  "Internship / Training",
  "Hands-On Workshop",
];

const DOMAINS = [
  "Defence & UAV",
  "Robotics & Kinematics",
  "AI & Computer Vision",
  "Embedded & IoT",
  "Space & Civil AI",
];

function StartProjectForm({
  prefill,
  userName,
  userEmail,
  onClose,
}: {
  prefill: StartProjectPrefill;
  userName: string;
  userEmail: string;
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    fullName: userName,
    email: userEmail,
    phone: "",
    track: prefill.track || "Enterprise & Defense",
    domain: prefill.domain || "Defence & UAV",
    projectCode: prefill.projectCode || "",
    title: prefill.title || "",
    requirements: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/project-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
      } else {
        setError(data.error || "Unable to submit request.");
      }
    } catch {
      setError("Network error while submitting request.");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-8 space-y-4">
        <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-500 flex items-center justify-center mx-auto">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Brief Received by SSAIR!
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
          Our Bengaluru R&amp;D team has logged your project request{form.projectCode ? ` (${form.projectCode})` : ""}. You can also track submissions inside your Student Dashboard.
        </p>
        <button
          type="button"
          onClick={onClose}
          className="px-6 py-2.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 cursor-pointer"
        >
          Done
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div role="alert" className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-medium">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="sp-name" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Full Name *
          </label>
          <input
            id="sp-name"
            name="fullName"
            type="text"
            required
            autoComplete="name"
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            placeholder="Your full name"
            className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/70 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>
        <div>
          <label htmlFor="sp-email" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Email Address *
          </label>
          <input
            id="sp-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="you@domain.com"
            className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/70 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="sp-phone" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Phone / WhatsApp *
          </label>
          <input
            id="sp-phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="+91 98481 26456"
            className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/70 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>
        <div>
          <label htmlFor="sp-track" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Program / Project Track *
          </label>
          <select
            id="sp-track"
            name="track"
            value={form.track}
            onChange={(e) => setForm({ ...form, track: e.target.value })}
            className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/70 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            {TRACKS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="sp-domain" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Technology Domain *
          </label>
          <select
            id="sp-domain"
            name="domain"
            value={form.domain}
            onChange={(e) => setForm({ ...form, domain: e.target.value })}
            className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/70 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            {DOMAINS.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="sp-title" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Project / System Topic *
          </label>
          <input
            id="sp-title"
            name="title"
            type="text"
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="e.g. GPS-Denied UAV Vision or 5-Bar Cobot"
            className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/70 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>
      </div>

      <div>
        <label htmlFor="sp-req" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
          Project Requirements / Custom Idea Details *
        </label>
        <textarea
          id="sp-req"
          name="requirements"
          rows={3}
          required
          value={form.requirements}
          onChange={(e) => setForm({ ...form, requirements: e.target.value })}
          placeholder="Describe hardware specs, timeline, university/organization goals, or custom R&D needs..."
          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/70 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </div>

      <div className="pt-2 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-lg shadow-cyan-500/25 disabled:opacity-60 cursor-pointer"
        >
          {submitting ? "Submitting Brief..." : "Submit Project Brief →"}
        </button>
      </div>
    </form>
  );
}

export function StartProjectModal() {
  const { startProjectOpen, startProjectPrefill, closeStartProject } = useUIModals();
  const { user } = useAuth();
  const headingId = useId();
  const instanceKey = `${startProjectPrefill.projectCode || "new"}-${startProjectPrefill.title || ""}-${user?.email || "guest"}`;

  return (
    <ModalDialog
      open={startProjectOpen}
      onClose={closeStartProject}
      labelledBy={headingId}
      maxWidthClass="max-w-2xl"
    >
      <div className="relative rounded-3xl border border-slate-200 dark:border-cyan-500/30 bg-white dark:bg-[#090f1d] text-slate-900 dark:text-slate-100 shadow-2xl overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-gradient-to-r from-blue-600/10 via-cyan-500/10 to-transparent">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-sky-600 dark:text-cyan-400 font-semibold">
              SSAIR Engineering &amp; R&amp;D Desk
            </span>
            <h1 id={headingId} className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
              Start a Project or Request Mentorship
            </h1>
          </div>
          <button
            type="button"
            onClick={closeStartProject}
            aria-label="Close project request modal"
            className="w-9 h-9 rounded-full border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 sm:p-8 max-h-[75dvh] overflow-y-auto">
          <StartProjectForm
            key={instanceKey}
            prefill={startProjectPrefill}
            userName={user?.name || ""}
            userEmail={user?.email || ""}
            onClose={closeStartProject}
          />
        </div>
      </div>
    </ModalDialog>
  );
}

export default StartProjectModal;
