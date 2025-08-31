import Map from "./Map";
import { useState, useRef } from "react";
import BookingModal from './forms/BookingModal';
import { FaCalendarAlt, FaPhone, FaEnvelope, FaMapMarkerAlt, FaArrowRight, FaCheck } from 'react-icons/fa';

export default function ContactUs() {

  const formRef = useRef<HTMLFormElement | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{ ok: boolean; msg: string } | null>(null);

  // controlled fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [hpField, setHpField] = useState(""); // honeypot
  const [errors, setErrors] = useState<string[]>([]);

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

  const handleContactFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus(null);
    const v = validate();
    setErrors(v);
    if (v.length > 0) {
      // focus first error field optionally
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

      const res = await fetch('/process_contact.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => null);
      if (res.ok && json && json.success) {
        setStatus({ ok: true, msg: 'Message sent — thank you! We will reply shortly.' });
        // clear form
        setFirstName(''); setLastName(''); setEmail(''); setSubject(''); setMessage(''); setHpField('');
      } else {
        const msg = json && (json.error || json.message) ? (json.error || json.message) : 'Submission failed. Please try again or contact support.';
        setStatus({ ok: false, msg });
      }
    } catch (err) {
      setStatus({ ok: false, msg: 'Network error. Please try again or contact support.' });
    } finally {
      setSubmitting(false);
    }
  };

  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <section id="contact" className="relative bg-[#0e0f10] text-zinc-100">
        {/* soft background glows */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
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
                <div aria-hidden className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_0_80px_rgba(255,170,80,0.08)]" />
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
  
                <ul className="mt-5 space-y-3 text-sm sm:text-base text-zinc-300">
                  <li><Bullet>Personalized project consultation & strategy</Bullet></li>
                  <li><Bullet>Timeline & budget discussion</Bullet></li>
                  <li><Bullet>Creative direction & vision guidance</Bullet></li>
                  <li><Bullet>Custom proposal & implementation roadmap</Bullet></li>
                </ul>
                 {/* Contact blocks */}
                <div className="mt-6 space-y-3 md:space-y-4">
                <ContactBlock icon={<FaPhone/>} title="+250 788 613 332" sub="Phone" />
                <ContactBlock icon={<FaEnvelope/>} title="info@goodav.africa" sub="Email" />
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
                  <input type="hidden" name="hp_field" value={hpField} onChange={() => {}} aria-hidden />
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field label="First Name*" type="text" name="firstName" value={firstName} onChange={(v) => setFirstName(v)} />
                    <Field label="Last Name*" type="text" name="lastName" value={lastName} onChange={(v) => setLastName(v)} />
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    <Field label="Email Address*" type="email" name="email" value={email} onChange={(v) => setEmail(v)} />
                    <Field label="Project Subject*" type="text" name="subject" value={subject} onChange={(v) => setSubject(v)} />
                  </div>

                  <div>
                    <Label>Tell us about your project, timeline, and creative vision…</Label>
                    <textarea
                      name="message"
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="mt-2 w-full rounded-xl bg-white/[0.06] px-4 py-3 text-sm sm:text-base text-zinc-100 placeholder-zinc-400 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-orange-400/60"
                      placeholder="Describe the goals, audience, deliverables, and any references"
                      aria-required
                    />
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

  function Field({ label, name, type = "text", value, onChange }: { label: string; name: string; type?: string; value: string; onChange: (v: string) => void }) {
    return (
      <div>
        <Label>{label}</Label>
        <input
          type={type}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-2 w-full rounded-xl bg-white/[0.06] px-3 py-2 text-sm text-zinc-100 placeholder-zinc-400 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-orange-400/60"
          placeholder={label.replace("*", "")}
        />
      </div>
    );
  }

  function Bullet({ children }: { children: React.ReactNode }) {
    return (
      <li className="flex items-start gap-2">
        <span className="mt-0.5 grid h-5 w-5 place-items-center rounded-full bg-orange-500/15 text-orange-300 ring-1 ring-white/10">✓</span>
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
  