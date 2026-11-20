"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

const SUBJECT_OPTIONS = [
  "General Inquiry",
  "Partnership",
  "Defence Projects",
  "Robotics Solutions",
  "Career Opportunities",
  "Other",
];

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required.";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (
      !/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,15}$/.test(formData.phone.trim())
    ) {
      newErrors.phone = "Please enter a valid phone number (e.g., +91 98765 43210).";
    }

    if (!formData.subject) {
      newErrors.subject = "Please select a subject for your inquiry.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message cannot be empty.";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message should be at least 10 characters long.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate async submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
    setErrors({});
    setIsSuccess(false);
  };

  return (
    <div className="relative rounded-3xl p-[1px] bg-gradient-to-b from-cyan-500/30 via-zinc-800/40 to-transparent shadow-2xl backdrop-blur-2xl">
      <div className="rounded-3xl bg-zinc-950/80 p-6 sm:p-8 lg:p-10 border border-zinc-800/60 shadow-inner">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium tracking-wide bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            DIRECT TRANSMISSION
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Send us a Message
          </h2>
          <p className="mt-2 text-sm sm:text-base text-zinc-400">
            Have a project, partnership, or defence R&amp;D inquiry? Fill in the details below and our team will get in touch promptly.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              key="success-state"
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.3 }}
              className="py-10 px-4 text-center flex flex-col items-center justify-center rounded-2xl bg-zinc-900/60 border border-emerald-500/30 p-8"
            >
              <div className="w-16 h-16 mb-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/10">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">
                Transmission Received
              </h3>
              <p className="text-zinc-300 max-w-md text-sm sm:text-base leading-relaxed mb-6">
                Thank you for contacting <strong className="text-white">Sri Srinivasa AI Robotics</strong>. Your message regarding <span className="text-cyan-400 font-medium">"{formData.subject}"</span> has been logged. Our engineering and technical liaison desk will reach out within 24 hours.
              </p>

              <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800 text-left w-full max-w-sm mb-6 text-xs text-zinc-400 space-y-1.5 font-mono">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Contact:</span>
                  <span className="text-zinc-200">{formData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Email:</span>
                  <span className="text-cyan-400 truncate max-w-[200px]">{formData.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Status:</span>
                  <span className="text-emerald-400">Delivered &amp; Queued</span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleReset}
                type="button"
                className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-medium text-sm transition-colors border border-zinc-700 hover:border-zinc-600"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Send Another Message
              </motion.button>
            </motion.div>
          ) : (
            <motion.form
              key="form-state"
              onSubmit={handleSubmit}
              noValidate
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="space-y-5"
            >
              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5"
                  >
                    Full Name <span className="text-cyan-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Dr. A. Sharma"
                      className={`w-full rounded-xl bg-zinc-900/90 px-4 py-3 text-sm text-white placeholder-zinc-500 border transition-all duration-200 focus:outline-none focus:ring-2 ${
                        errors.name
                          ? "border-rose-500/80 focus:ring-rose-500/30"
                          : "border-zinc-800 focus:border-cyan-500 focus:ring-cyan-500/20"
                      }`}
                    />
                    <div className="absolute right-3.5 top-3.5 text-zinc-500 pointer-events-none">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                  </div>
                  {errors.name && (
                    <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5"
                  >
                    Email Address <span className="text-cyan-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. name@organisation.com"
                      className={`w-full rounded-xl bg-zinc-900/90 px-4 py-3 text-sm text-white placeholder-zinc-500 border transition-all duration-200 focus:outline-none focus:ring-2 ${
                        errors.email
                          ? "border-rose-500/80 focus:ring-rose-500/30"
                          : "border-zinc-800 focus:border-cyan-500 focus:ring-cyan-500/20"
                      }`}
                    />
                    <div className="absolute right-3.5 top-3.5 text-zinc-500 pointer-events-none">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  </div>
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Phone & Subject Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5"
                  >
                    Phone Number <span className="text-cyan-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className={`w-full rounded-xl bg-zinc-900/90 px-4 py-3 text-sm text-white placeholder-zinc-500 border transition-all duration-200 focus:outline-none focus:ring-2 ${
                        errors.phone
                          ? "border-rose-500/80 focus:ring-rose-500/30"
                          : "border-zinc-800 focus:border-cyan-500 focus:ring-cyan-500/20"
                      }`}
                    />
                    <div className="absolute right-3.5 top-3.5 text-zinc-500 pointer-events-none">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                  </div>
                  {errors.phone && (
                    <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Subject Dropdown */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5"
                  >
                    Subject <span className="text-cyan-400">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`w-full rounded-xl bg-zinc-900/90 px-4 py-3 text-sm text-white border transition-all duration-200 focus:outline-none focus:ring-2 appearance-none cursor-pointer ${
                        !formData.subject ? "text-zinc-500" : "text-white"
                      } ${
                        errors.subject
                          ? "border-rose-500/80 focus:ring-rose-500/30"
                          : "border-zinc-800 focus:border-cyan-500 focus:ring-cyan-500/20"
                      }`}
                    >
                      <option value="" disabled className="bg-zinc-900 text-zinc-500">
                        Select inquiry nature...
                      </option>
                      {SUBJECT_OPTIONS.map((opt) => (
                        <option
                          key={opt}
                          value={opt}
                          className="bg-zinc-900 text-white py-1.5"
                        >
                          {opt}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-3.5 top-3.5 text-zinc-500 pointer-events-none">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                  {errors.subject && (
                    <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.subject}
                    </p>
                  )}
                </div>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5"
                >
                  Message <span className="text-cyan-400">*</span>
                </label>
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Briefly describe your objectives, technical specifications, or consultation scope..."
                    className={`w-full rounded-xl bg-zinc-900/90 px-4 py-3 text-sm text-white placeholder-zinc-500 border transition-all duration-200 focus:outline-none focus:ring-2 resize-none ${
                      errors.message
                        ? "border-rose-500/80 focus:ring-rose-500/30"
                        : "border-zinc-800 focus:border-cyan-500 focus:ring-cyan-500/20"
                    }`}
                  />
                </div>
                {errors.message && (
                  <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <motion.button
                  whileHover={{ scale: isSubmitting ? 1 : 1.015 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.985 }}
                  disabled={isSubmitting}
                  type="submit"
                  className={`w-full cursor-pointer relative group overflow-hidden rounded-xl py-3.5 px-6 font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-3 text-white shadow-lg ${
                    isSubmitting
                      ? "bg-zinc-800 text-zinc-400 cursor-not-allowed border border-zinc-700"
                      : "bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:via-blue-500 hover:to-indigo-500 shadow-cyan-500/25 hover:shadow-cyan-500/40 border border-cyan-400/30"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-cyan-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Transmitting Transmission...
                    </>
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <svg
                        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </>
                  )}
                </motion.button>
              </div>

              <div className="flex items-center justify-between text-[11px] text-zinc-500 pt-1">
                <span className="flex items-center gap-1.5">
                  <svg className="w-3 h-3 text-cyan-400/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Confidential &amp; Encrypted Inquiry
                </span>
                <span>Response SLA: &lt; 24h</span>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
