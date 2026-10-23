"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { profile } from "@/data/profile";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Required";
    if (!email.trim()) {
      errs.email = "Required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = "Enter a Valid e-Mail";
    }
    if (!subject.trim()) errs.subject = "Required";
    if (!message.trim()) errs.message = "Cannot Be Empty";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (honeypot) {
      return;
    }

    if (!validate()) return;

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          subject: subject.trim(),
          message: message.trim(),
          honeypot: honeypot.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
          "Failed to Deliver Message. Please Reach Out Directly via e-Mail."
        );
      }

      if (data.success) {
        setStatus("success");
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      } else {
        throw new Error(data.error || "Unexpected delivery response from server.");
      }
    } catch (err: unknown) {
      console.error("Submission error:", err);
      const msg = err instanceof Error ? err.message : "Failed to deliver message.";
      setErrorMessage(msg);
      setStatus("error");
    }
  };

  return (
    <div className="bg-[#0A0A0A] border border-[#222222] rounded-lg p-6 sm:p-8">
      {status === "success" ? (
        <div className="py-8 text-center space-y-3">
          <div className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center mx-auto">
            <CheckCircle2 size={20} />
          </div>
          <h3 className="text-base font-semibold text-white">
            Message Received
          </h3>
          <p className="text-sm text-[#A3A3A3] max-w-sm mx-auto">
            Thank you! Your message has been delivered directly to {profile.email}. I will reply shortly.
          </p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="mt-4 px-4 py-2 bg-transparent border border-[#374151] text-xs font-medium text-white rounded hover:bg-[#141414] transition-colors"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Honeypot field for bot deterrence */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="company_code">Ignore this field</label>
            <input
              id="company_code"
              type="text"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {status === "error" && (
            <div className="p-3 bg-red-950/40 border border-red-800/50 rounded text-xs text-red-300 flex items-center gap-2">
              <AlertCircle size={14} className="shrink-0 text-red-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-medium text-[#A3A3A3] mb-1.5"
              >
                Name *
              </label>
              <input
                id="name"
                type="text"
                placeholder="What Should I call you?"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
                }}
                disabled={status === "submitting"}
                className={`w-full bg-[#141414] border ${errors.name ? "border-red-500" : "border-[#2A2A2A]"
                  } rounded px-3 py-2 text-sm text-white placeholder-[#555555] focus:outline-none focus:border-white transition-colors`}
              />
              {errors.name && (
                <p className="text-[11px] text-red-400 mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium text-[#A3A3A3] mb-1.5"
              >
                Email *
              </label>
              <input
                id="email"
                type="email"
                placeholder="Where should I mail you back?"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
                }}
                disabled={status === "submitting"}
                className={`w-full bg-[#141414] border ${errors.email ? "border-red-500" : "border-[#2A2A2A]"
                  } rounded px-3 py-2 text-sm text-white placeholder-[#555555] focus:outline-none focus:border-white transition-colors`}
              />
              {errors.email && (
                <p className="text-[11px] text-red-400 mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="subject"
              className="block text-xs font-medium text-[#A3A3A3] mb-1.5"
            >
              Subject *
            </label>
            <input
              id="subject"
              type="text"
              placeholder="What brings you here?"
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
                if (errors.subject) setErrors((prev) => ({ ...prev, subject: "" }));
              }}
              disabled={status === "submitting"}
              className={`w-full bg-[#141414] border ${errors.subject ? "border-red-500" : "border-[#2A2A2A]"
                } rounded px-3 py-2 text-sm text-white placeholder-[#555555] focus:outline-none focus:border-white transition-colors`}
            />
            {errors.subject && (
              <p className="text-[11px] text-red-400 mt-1">{errors.subject}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-xs font-medium text-[#A3A3A3] mb-1.5"
            >
              Message *
            </label>
            <textarea
              id="message"
              rows={4}
              placeholder="I am all ears!"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                if (errors.message) setErrors((prev) => ({ ...prev, message: "" }));
              }}
              disabled={status === "submitting"}
              className={`w-full bg-[#141414] border ${errors.message ? "border-red-500" : "border-[#2A2A2A]"
                } rounded px-3 py-2 text-sm text-white placeholder-[#555555] focus:outline-none focus:border-white transition-colors resize-y`}
            />
            {errors.message && (
              <p className="text-[11px] text-red-400 mt-1">{errors.message}</p>
            )}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={status === "submitting"}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white !text-black text-sm font-medium rounded hover:bg-[#E5E5E5] transition-colors disabled:opacity-50"
            >
              {status === "submitting" ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <span>Send Message</span>
                  <Send size={14} />
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
