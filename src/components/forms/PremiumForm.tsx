  const [submitStatus, setSubmitStatus] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setSubmitStatus(null);
    // Simulate API call (replace with real API logic)
    try {
      await new Promise(res => setTimeout(res, 1200));
      // Simulate success
      setSubmitStatus('✅ Your project request was submitted successfully! We will contact you soon.');
    } catch (err) {
      setSubmitStatus('❌ Submission failed. Please try again or contact support.');
    }
    setSubmitting(false);
  }
import React, { useEffect, useRef } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function PremiumProjectModal({ open, onClose }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);

  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Basic focus trap to the dialog when opened
  useEffect(() => {
    if (!open || !dialogRef.current) return;
    const el = dialogRef.current;
    const focusable = el.querySelectorAll<HTMLElement>(
      'a[href],button,textarea,input,select,[tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const handler = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        (last || first).focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        (first || last).focus();
      }
    };
    first?.focus();
    el.addEventListener("keydown", handler as any);
    return () => el.removeEventListener("keydown", handler as any);
  }, [open]);

  return (
    <Dialog.Root open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content 
          ref={dialogRef}
          className="fixed left-[50%] top-[50%] z-50 w-full max-w-4xl translate-x-[-50%] translate-y-[-50%] overflow-visible rounded-2xl border border-white/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] backdrop-blur-xl p-0 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]"
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          {/* <Dialog.Close className="absolute right-4 top-0 -translate-y-1/2 rounded-full p-1 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-6 w-6 text-white" />
            <span className="sr-only">Close</span>
          </Dialog.Close> */}
        {/* Top gradient bar */}
        <div className="h-2 rounded-t-2xl bg-gradient-to-r from-orange-400/40 via-white/10 to-indigo-400/40" />

        {/* Circular close button in the top-right ring */}
        {/* Close button in the “ring” */}
  <button
    type="button"
    onClick={onClose}
    aria-label="Close dialog"
    className="group absolute right-4 top-[50px] -translate-y-1/2 z-20 h-12 w-12 rounded-full bg-white/10 backdrop-blur-xl ring-2 ring-white/30 hover:bg-white/20 flex items-center justify-center shadow-lg"
  >
    <span className="h-8 w-8 rounded-full bg-gradient-to-br from-zinc-100/80 to-white/60 shadow-inner flex items-center justify-center">
      <svg viewBox="0 0 24 24" className="h-4 w-4 text-zinc-800/80" aria-hidden>
        <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    </span>
  </button>

        {/* Header */}
        <header className="px-6 pt-6 sm:px-8">
          <div className="flex items-center gap-3 text-orange-300/90">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-orange-400/20 ring-1 ring-orange-300/30">
              <span className="h-2 w-2 rounded-full bg-orange-300" />
            </span>
            <h1 className="text-xl font-semibold">Start Your Project</h1>
          </div>
          <div className="mt-4">
            <h2 className="text-lg font-semibold">Transform Your Vision Into Reality</h2>
            <p className="mt-1 text-sm text-white/70">
              Ready to create something extraordinary? Our expert team is here to bring audiovisual dreams to life with African authenticity and global standards.
            </p>
          </div>
        </header>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="grid gap-6 p-6 sm:p-8"
        >
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <LabeledInput label="Full Name" required />
            <LabeledInput label="Email Address" type="email" required />
            <LabeledInput label="Phone Number" type="tel" />
            <LabeledInput label="Company/Organization" />
            <div className="col-span-1 md:col-span-2">
              <LabeledSelect
                label="Project Type"
                required
                placeholder="Select your project type..."
                options={[
                  "Commercial",
                  "Documentary",
                  "Music Video",
                  "Event Coverage",
                  "Corporate Film",
                  "Other",
                ]}
              />
            </div>
            <LabeledSelect
              label="Estimated Budget"
              options={[
                "Under $5,000",
                "$5,000 – $10,000",
                "$10,000 – $25,000",
                "$25,000 – $50,000",
                "$50,000+",
              ]}
              defaultValue="Under $5,000"
            />
              <LabeledSelect
                label="Project Timeline"
                options={[
                  "When do you need this completed?",
                  "ASAP",
                  "Within 1 month",
                  "2-3 months",
                  "3-6 months",
                  "6+ months",
                  "Timeline is flexible",
                ]}
                defaultValue="When do you need this completed?"
              />
            <div className="col-span-1 md:col-span-2">
              <LabeledTextarea
                label="Project Description"
                required
                rows={6}
                placeholder="Tell us about your vision, goals, and any specific requirements..."
              />
            </div>
            <div className="col-span-1 md:col-span-2">
              <label className="flex items-start gap-3 text-sm">
                <input
                  type="checkbox"
                  className="mt-0.5 h-4 w-4 rounded border-white/20 bg-white/5 text-orange-400 focus:ring-0"
                  required
                />
                <span className="text-white/80">
                  I agree to be contacted about this project and understand that GoodAV will handle my information according to their privacy policy.
                </span>
              </label>
            </div>
          </div>

          {/* Footer actions */}
          <div className="mt-2 flex flex-col items-center justify-end gap-3">
            <div className="w-full flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="h-11 rounded-lg border border-white/15 bg-transparent px-4 text-sm text-white/90 transition hover:bg-white/10"
              >
                Not Now
              </button>
              <button
                type="submit"
                className="group inline-flex h-11 items-center gap-2 rounded-lg bg-gradient-to-r from-orange-400 to-orange-500 px-4 text-sm font-medium text-black shadow-[0_6px_20px_-6px_rgba(255,140,0,0.6)] transition hover:brightness-105 focus:outline-none"
                disabled={submitting}
              >
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-black/10">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-black/80" aria-hidden>
                    <path d="M2 21l20-9L2 3v6l14 3L2 15v6z" />
                  </svg>
                </span>
                {submitting ? 'Submitting...' : 'Send Project Request'}
              </button>
            </div>
            {submitStatus && (
              <div className="mt-3 text-orange-400 text-sm text-center">
                {submitStatus}
                {submitStatus.includes('successfully') && (
                  <div className="mt-1 text-orange-300">Thank you for starting your project with GoodAV. You will receive a confirmation email soon.</div>
                )}
                {submitStatus.includes('failed') && (
                  <div className="mt-1 text-orange-300">If the problem persists, please contact us at form@goodav.net.</div>
                )}
              </div>
            )}
          </div>
        </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

/* Reusable field components */
function LabeledInput({
  label,
  required,
  type = "text",
  placeholder = "",
}: {
  label: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col">
      <label className="mb-1 text-sm font-medium">
        {label} {required && <span className="text-orange-300">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        required={required}
        className="h-11 rounded-lg border border-white/15 bg-white/5 px-3 text-sm placeholder:text-white/40 outline-none transition focus:border-orange-300/40 focus:bg-white/10"
      />
    </div>
  );
}

function LabeledSelect({
  label,
  required,
  placeholder,
  options,
  defaultValue,
}: {
  label: string;
  required?: boolean;
  placeholder?: string;
  options: string[];
  defaultValue?: string;
}) {
  return (
    <div className="flex flex-col">
      <label className="mb-1 text-sm font-medium">
        {label} {required && <span className="text-orange-300">*</span>}
      </label>
      <select
        required={required}
        defaultValue={defaultValue ?? (placeholder ? "" : options[0])}
        className="h-11 rounded-lg border border-white/15 bg-white/5 px-3 text-sm outline-none transition focus:border-orange-300/40 focus:bg-white/10"
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

function LabeledTextarea({
  label,
  required,
  rows = 4,
  placeholder = "",
}: {
  label: string;
  required?: boolean;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col">
      <label className="mb-1 text-sm font-medium">
        {label} {required && <span className="text-orange-300">*</span>}
      </label>
      <textarea
        rows={rows}
        placeholder={placeholder}
        required={required}
        className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm placeholder:text-white/40 outline-none transition focus:border-orange-300/40 focus:bg-white/10"
      />
    </div>
  );
}
