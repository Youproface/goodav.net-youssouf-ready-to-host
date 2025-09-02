import Map from "./Map";
import { useState, useRef } from "react";
import { createPortal } from 'react-dom';
import BookingModal from './forms/BookingModal';
import { FaCalendarAlt, FaPhone, FaEnvelope, FaMapMarkerAlt, FaArrowRight, FaCheck } from 'react-icons/fa';

export default function ContactUs() {

  const formRef = useRef<HTMLFormElement | null>(null);
  const firstNameRef = useRef<HTMLInputElement | null>(null);
  const lastNameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const subjectRef = useRef<HTMLInputElement | null>(null);
  const messageRef = useRef<HTMLTextAreaElement | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{ ok: boolean; msg: string } | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState<'success' | 'error' | null>(null);
  const [popupMessage, setPopupMessage] = useState('');

  // controlled fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [hpField, setHpField] = useState(""); // honeypot
  const [errors, setErrors] = useState<string[]>([]);
  // per-field errors for real-time feedback
  const [fieldErrors, setFieldErrors] = useState<Record<string, string | null>>({
    firstName: null,
    lastName: null,
    email: null,
    subject: null,
    message: null,
  });

  const validate = () => {
    const errs: string[] = [];
    if (!firstName.trim()) errs.push('First name is required');
    if (!lastName.trim()) errs.push('Last name is required');
    if (!email.trim()) errs.push('Email is required');
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) errs.push('Email address is invalid');
    if (!subject.trim()) errs.push('Subject is required');
    if (!message.trim() || message.trim().length < 10) errs.push('Message should be at least 10 characters');
    return errs;
  };

  // Per-field validation helpers for real-time feedback
  const validateField = (name: string, value: string): string | null => {
    const v = value.trim();
    switch (name) {
      case 'firstName':
        return v ? null : 'First name is required';
      case 'lastName':
        return v ? null : 'Last name is required';
      case 'email':
        if (!v) return 'Email is required';
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)) return 'Email address is invalid';
        return null;
      case 'subject':
        return v ? null : 'Subject is required';
      case 'message':
        return v && v.length >= 10 ? null : 'Message should be at least 10 characters';
      default:
        return null;
    }
  };

  // Map camelCase field names to human-friendly keywords used in error messages
  const fieldKeywords: Record<string, string> = {
    firstName: 'first name',
    lastName: 'last name',
    email: 'email',
    subject: 'subject',
    message: 'message',
  };

  const setFieldError = (fieldName: string, msg: string | null) => {
    setFieldErrors(prev => {
      const next = { ...prev, [fieldName]: msg };
      // update aggregated errors array
      const agg = Object.values(next).filter(Boolean) as string[];
      setErrors(agg);
      return next;
    });
  };

  const updateFieldAndValidate = (fieldName: string, value: string, setter: (v: string) => void) => {
  setter(value);
  const msg = validateField(fieldName, value);
  setFieldError(fieldName, msg);
  };

  const handleContactFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus(null);
    const v = validate();
    setErrors(v);
    if (v.length > 0) {
      // Auto-focus first invalid field (UX polish)
      if (!firstName.trim()) {
        firstNameRef.current?.focus();
      } else if (!lastName.trim()) {
        lastNameRef.current?.focus();
      } else if (!email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        emailRef.current?.focus();
      } else if (!subject.trim()) {
        subjectRef.current?.focus();
      } else if (!message.trim() || message.trim().length < 10) {
        messageRef.current?.focus();
      }
      // Only show inline error box, not popup
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        subject: subject.trim(),
        message: message.trim(),
        hp_field: hpField || ''
      };

      const apiBase = import.meta.env.VITE_API_BASE_URL || '';
      const res = await fetch(`${apiBase}/process_contact.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => null);
      if (res.ok && json && json.success) {
        setStatus({ ok: true, msg: 'Message sent — thank you! We will reply shortly.' });
        setPopupType('success');
        setPopupMessage('Message sent — thank you! We will reply shortly.');
        setShowPopup(true);
        setFirstName(''); setLastName(''); setEmail(''); setSubject(''); setMessage(''); setHpField('');
      } else {
        const msg = json && (json.error || json.message) ? (json.error || json.message) : 'Submission failed. Please try again or contact support.';
        setStatus({ ok: false, msg });
        setPopupType('error');
        setPopupMessage(msg);
        setShowPopup(true);
      }
    } catch (err) {
      setStatus({ ok: false, msg: 'Network error. Please try again or contact support.' });
      setPopupType('error');
      setPopupMessage('Network error. Please try again or contact support.');
      setShowPopup(true);
    } finally {
      setSubmitting(false);
    }
  };

  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <section id="contact" className="relative bg-[#0e0f10] text-zinc-100">
      {/* Branded Loading Overlay for Contact Form Submission */}
      {submitting && typeof window !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black/80 backdrop-blur-lg">
          <div className="mb-6">
            <svg id="goodav-bimi.svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 390.2 387.4" className="w-32 h-auto animate-spin loading-spin">
              <defs>
                <style>
                  {`.cls-1{fill:#f6953a;}.cls-1,.cls-2,.cls-3,.cls-4,.cls-5{stroke-width:0px;}.cls-2{fill:#010101;}.cls-3{fill:#fff;}.cls-4{fill:#41964c;}.cls-5{fill:#f04f44;}`}
                </style>
              </defs>
              <ellipse className="cls-2" cx="195.1" cy="193.7" rx="195.1" ry="193.7"/>
              <path className="cls-5" d="M198,27.7c31.5,0,57.1,26.2,57.1,58.4,0,32.1-25.8,58.1-57.4,58-31.3-.1-56.8-26.2-56.8-58.1,0-32.2,25.6-58.3,57.2-58.3Z"/>
              <path className="cls-3" d="M140.8,193.8c0,32.1-25.7,58.1-57.2,58.1-31.5,0-57.1-26.2-57-58.3,0-32.1,25.7-58.1,57.2-58.1,31.5,0,57,26.2,57,58.3Z"/>
              <path className="cls-1" d="M246.4,193.2c.2-32.1,26.1-58,57.7-57.7,31.4.2,56.8,26.7,56.5,59-.2,31.8-26.1,57.6-57.5,57.5-31.5-.1-56.9-26.5-56.8-58.7Z"/>
              <path className="cls-4" d="M140.8,304.4c0-32,25.9-58,57.6-57.9,31.4.1,56.8,26.5,56.7,58.8-.2,31.7-25.9,57.7-57.3,57.6-31.5,0-57-26.3-56.9-58.5Z"/>
            </svg>
          </div>
          <div className="text-white text-xl font-semibold drop-shadow-lg animate-pulse mt-2">Please wait while we send your message...</div>
        </div>,
        document.body
      )}
        {/* soft background glows */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-4 top-10 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />
          <div className="absolute right-6 bottom-8 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />
        </div>
  
        <div className="relative mx-auto max-w-6xl px-6 py-12 lg:py-16">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* LEFT: Form */}
            <div className="lg:col-span-6">
              <div className="max-w-xl">
                <div className="mb-2 md:mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs md:text-sm font-semibold uppercase tracking-wider text-orange-300">
                  Contact
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
                  Let's Create Something
                  <span className="block">Extraordinary Together</span>
                </h2>
                <p className="mt-3 text-sm sm:text-base text-zinc-300">
                  Ready to bring the vision to life? Discuss project scope, timelines, and how premium audiovisual services transform ideas into compelling stories.
                </p>
              </div>
  
              {/* Strategy call card */}
              <div className="mt-6 md:mt-8 rounded-2xl ring-1 ring-white/10 bg-white/5 backdrop-blur p-6 md:p-7 shadow-[0_8px_40px_rgba(0,0,0,0.35)] relative">
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_0_80px_rgba(255,170,80,0.08)]" />
                <div className="mb-4 flex items-center gap-2 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-orange-300">
                  <span className="grid h-7 w-7 sm:h-8 sm:w-8 place-items-center rounded-md bg-orange-500/20 ring-1 ring-white/10"><FaCalendarAlt className="h-4 w-4 text-orange-300"/></span>
                  Schedule a Strategy Call
                </div>
                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                  Book a free consultation to discuss goals, timeline, and how the team can deliver premium audiovisual excellence.
                </p>
  
                <button
                  type="button"
                  onClick={() => setIsBookingOpen(true)}
                  className="mt-3 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-400 px-4 py-2.5 text-sm font-semibold text-zinc-900 shadow hover:from-orange-400 hover:to-amber-300"
                >
                  <span className="grid h-5 w-5 place-items-center rounded bg-orange-700/10 text-zinc-900">
                  <FaPhone className="h-4 w-4 text-zinc-900" />
                  </span>
                  Book Your Consultation
                </button>
  
                {/* render list items from an array to ensure ul contains only <li> children */}
                <ul className="mt-5 space-y-3 text-sm sm:text-base text-zinc-300">
                  {[
                    'Personalized project consultation & strategy',
                    'Timeline & budget discussion',
                    'Creative direction & vision guidance',
                    'Custom proposal & implementation roadmap',
                  ].map((txt, i) => (
                    <Bullet key={i}>{txt}</Bullet>
                  ))}
                </ul>
                 {/* Contact blocks */}
                <div className="mt-6 space-y-3 md:space-y-4">
                <ContactBlock icon={<FaPhone/>} title="+250 788 613 332" sub="Phone" />
                <ContactBlock icon={<FaEnvelope/>} title="info@goodav.net" sub="Email" />
                <ContactBlock icon={<FaMapMarkerAlt/>} title="Kigali, Rwanda, Africa" sub="Location" />
                <ContactBlock icon={<FaArrowRight/>} title="Rwanda, East Africa • International Projects" sub="Service Areas" />
              </div>
              </div>
  
             
            </div>
           
  
            {/* RIGHT: Copy + actions */}
            <div className="lg:col-span-6">
              <div className="rounded-3xl ring-1 ring-white/10 bg-white/5 backdrop-blur p-6 sm:p-7 lg:p-8 h-full shadow-[0_8px_40px_rgba(0,0,0,0.35)]">
                <div className="mb-5 flex items-center gap-2 text-base sm:text-lg font-extrabold uppercase tracking-wider text-orange-300">
                  <span className="grid h-8 w-8 place-items-center rounded-md bg-orange-500/20 ring-1 ring-white/10 text-base"><FaEnvelope className="w-4 h-4" aria-hidden /></span>
                  Send us a message
                </div>
                {/* <p className="mb-5 text-xl text-zinc-400">
                  Share project details and a reply will arrive within 24 hours.
                </p> */}
                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 my-6 text-sm sm:text-base text-zinc-300">
                  <span className="flex-shrink-0 grid h-6 w-6 place-items-center rounded-full bg-emerald-500/15 ring-1 ring-white/10 text-emerald-300"><FaCheck className="w-3 h-3" aria-hidden /></span>
                  <span>A reply will arrive within 24 hours via email.</span>
                </div>
                <form onSubmit={handleContactFormSubmit} ref={formRef} className="space-y-6" noValidate>
                  <input type="hidden" name="hp_field" value={hpField} onChange={() => {}} aria-hidden="true" />
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field label="First Name*" type="text" name="firstName" value={firstName} onChange={(v) => updateFieldAndValidate('firstName', v, setFirstName)} errors={errors} fieldError={fieldErrors.firstName} inputRef={firstNameRef} />
                    <Field label="Last Name*" type="text" name="lastName" value={lastName} onChange={(v) => updateFieldAndValidate('lastName', v, setLastName)} errors={errors} fieldError={fieldErrors.lastName} inputRef={lastNameRef} />
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    <Field label="Email Address*" type="email" name="email" value={email} onChange={(v) => updateFieldAndValidate('email', v, setEmail)} errors={errors} fieldError={fieldErrors.email} inputRef={emailRef} />
                    <Field label="Project Subject*" type="text" name="subject" value={subject} onChange={(v) => updateFieldAndValidate('subject', v, setSubject)} errors={errors} fieldError={fieldErrors.subject} inputRef={subjectRef} />
                  </div>

                  <div>
                    <Label>Tell us about your project, timeline, and creative vision…</Label>
                    {fieldErrors.message ? (
                      <textarea
                        name="message"
                        rows={5}
                        value={message}
                        onChange={(e) => updateFieldAndValidate('message', e.target.value, setMessage)}
                        ref={messageRef}
                        className="mt-2 w-full rounded-xl bg-white/[0.06] px-4 py-3 text-sm sm:text-base text-zinc-100 placeholder-zinc-400 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-orange-400/60"
                        placeholder="Describe the goals, audience, deliverables, and any references"
                        aria-required="true"
                        aria-invalid="true"
                      />
                    ) : (
                      <textarea
                        name="message"
                        rows={5}
                        value={message}
                        onChange={(e) => updateFieldAndValidate('message', e.target.value, setMessage)}
                        ref={messageRef}
                        className="mt-2 w-full rounded-xl bg-white/[0.06] px-4 py-3 text-sm sm:text-base text-zinc-100 placeholder-zinc-400 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-orange-400/60"
                        placeholder="Describe the goals, audience, deliverables, and any references"
                        aria-required="true"
                        aria-invalid="false"
                      />
                    )}
                  </div>

                  {errors.length > 0 && (
                    <div className="rounded-md border border-red-600/30 bg-red-600/5 p-3 text-sm text-red-300">
                      <strong className="font-semibold block">Please fix the following:</strong>
                      <ul className="mt-2 list-disc list-inside">
                        {errors.map((er, i) => <li key={i}>{er}</li>)}
                      </ul>
                    </div>
                  )}

                  <div className="pt-2 flex flex-col items-center gap-2">
                    <button
                      type="submit"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-400 px-6 py-3.5 text-sm sm:text-base font-semibold text-zinc-900 shadow hover:from-orange-400 hover:to-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/60 transition-all duration-200"
                      disabled={submitting}
                    >
                      <span className="grid h-6 w-6 place-items-center rounded bg-orange-700/10 text-zinc-900"><FaArrowRight className="w-3 h-3"/></span>
                      {submitting ? 'Submitting...' : 'Send Message'}
                    </button>

                    <div role="status" aria-live="polite" className="mt-2 text-orange-400 text-sm text-center">
                      {status && status.msg}
                    </div>
      {/* Feedback Popup Modal */}
      {showPopup && createPortal(
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="rounded-2xl bg-white/95 shadow-xl p-8 max-w-sm w-full text-center border border-orange-200">
            <div className="mb-4">
              {popupType === 'success' ? (
                <span className="inline-flex items-center justify-center rounded-full bg-emerald-100 p-3"><FaCheck className="text-emerald-500 w-6 h-6" /></span>
              ) : (
                <span className="inline-flex items-center justify-center rounded-full bg-red-100 p-3"><FaEnvelope className="text-red-500 w-6 h-6" /></span>
              )}
            </div>
            <div className="text-lg font-semibold mb-2 text-zinc-900">{popupType === 'success' ? 'Success' : 'Error'}</div>
            <div className="text-sm text-zinc-700 mb-4">{popupMessage}</div>
            <button
              type="button"
              onClick={() => setShowPopup(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-400 px-6 py-2 text-sm font-semibold text-zinc-900 shadow hover:from-orange-400 hover:to-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/60 transition-all duration-200"
              aria-label="Close feedback popup"
            >
              Close
            </button>
          </div>
        </div>,
        document.body
      )}

                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {window.location.pathname === '/contact' && <Map/>}
  {/* Booking modal for consultation booking triggered from this section */}
  <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
      </section>
    );
  }
  
  /* ——— Subcomponents ——— */

  function Label({ children }: { children: React.ReactNode }) {
    return (
      <label className="block text-[12px] font-medium text-zinc-300">
        {children}
      </label>
    );
  }

  function Field({ label, name, type = "text", value, onChange, errors, fieldError, inputRef }: { label: string; name: string; type?: string; value: string; onChange: (v: string) => void; errors?: string[]; fieldError?: string | null; inputRef?: React.RefObject<HTMLInputElement> }) {
  // Field-specific error comes from fieldError prop (real-time) or aggregated errors
  const errorMsg = fieldError || (errors && errors.find(er => er.toLowerCase().includes(name.toLowerCase())));
    return (
      <div>
        <Label>{label}</Label>
        {errorMsg ? (
          <input
            type={type}
            name={name}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            ref={inputRef}
            className={`mt-2 w-full rounded-xl bg-white/[0.06] px-3 py-2 text-sm text-zinc-100 placeholder-zinc-400 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-orange-400/60 ${'border border-red-500/70'}`}
            placeholder={label.replace("*", "")}
            aria-invalid="true"
          />
        ) : (
          <input
            type={type}
            name={name}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            ref={inputRef}
            className={`mt-2 w-full rounded-xl bg-white/[0.06] px-3 py-2 text-sm text-zinc-100 placeholder-zinc-400 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-orange-400/60`}
            placeholder={label.replace("*", "")}
            aria-invalid="false"
          />
        )}
        {errorMsg && <div className="text-xs text-red-400 mt-1">{errorMsg}</div>}
      </div>
    );
  }

  function Bullet({ children }: { children: React.ReactNode }) {
    return (
      <li className="flex items-start gap-2">
        <span className="mt-0.5 grid h-5 w-5 place-items-center rounded-full bg-orange-500/15 text-orange-300 ring-1 ring-white/10" aria-hidden="true">✓</span>
        <span>{children}</span>
      </li>
    );
  }

  function ContactBlock({ icon, title, sub }: { icon: React.ReactNode; title: string; sub: string }) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-orange-500/15 text-lg text-orange-300 ring-1 ring-white/10">
            {icon}
          </span>
          <div>
            <div className="text-sm font-semibold text-zinc-100">{title}</div>
            <div className="text-[12px] text-zinc-400">{sub}</div>
          </div>
        </div>
      </div>
    );
  }
