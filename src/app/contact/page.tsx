import type { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | Sri Srinivasa AI Robotics (SSAIR)",
  description:
    "Get in touch with Sri Srinivasa AI Robotics Pvt. Ltd. (SSAIR) for defense robotics inquiries, AI computer vision partnerships, and industrial automation solutions.",
};

export default function ContactPage() {
  return (
    <div className="w-full min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            Get in Touch
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mt-2">
            Contact Our Engineering Team
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
            Have questions about our defense drones, collaborative robotics, or computer vision research? We would love to hear from you.
          </p>
        </div>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          {/* Right Contact Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Contact Card */}
            <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Direct Contact Details
              </h3>

              {/* Phone */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block">
                    Phone Number
                  </span>
                  <a
                    href="tel:+919848126456"
                    className="text-base font-semibold text-slate-900 dark:text-white hover:text-blue-600 transition-colors"
                  >
                    +91 98481 26456
                  </a>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Monday to Friday, 9:00 AM – 6:00 PM IST
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3.5 pt-4 border-t border-slate-200/80 dark:border-slate-800/80">
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block">
                    Direct Email
                  </span>
                  <a
                    href="mailto:srinivasulureddydadireddy@gmail.com"
                    className="text-sm font-semibold text-slate-900 dark:text-white hover:text-blue-600 transition-colors break-all"
                  >
                    srinivasulureddydadireddy@gmail.com
                  </a>
                  <p className="text-xs text-slate-500 mt-0.5">
                    We reply promptly to inquiries and proposals.
                  </p>
                </div>
              </div>

              {/* Office Address */}
              <div className="flex items-start gap-3.5 pt-4 border-t border-slate-200/80 dark:border-slate-800/80">
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block">
                    Office Location
                  </span>
                  <p className="text-sm font-medium text-slate-900 dark:text-white mt-0.5 leading-snug">
                    No. 198, CMH Road, 2nd Floor,
                    <br />
                    Desk No. 324, Indiranagar,
                    <br />
                    Bengaluru, Karnataka - 560038
                  </p>
                </div>
              </div>
            </div>

            {/* Corporate Info Note */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-2">
              <div className="font-semibold text-slate-900 dark:text-white">
                Corporate Entity Details
              </div>
              <p>
                <strong className="text-slate-800 dark:text-slate-200">Main Company:</strong> Sri Saraswathi Artificial Intelligence and Robotics Pvt. Ltd. (Est. 2022)
              </p>
              <p>
                <strong className="text-slate-800 dark:text-slate-200">Sister Company:</strong> Sri Srinivasa AI Robotics Pvt. Ltd. (Est. 2026, CIN: U72100KA2026PTC222434)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
