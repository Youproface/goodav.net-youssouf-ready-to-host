import React, { useEffect, useRef } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { FaCheckCircle, FaTimesCircle, FaExclamationTriangle } from 'react-icons/fa';

type Props = {
  open: boolean;
  onClose: () => void;
};

const countryCodes = [
  { code: "+1", name: "United States" },
  { code: "+44", name: "United Kingdom" },
  { code: "+250", name: "Rwanda" },
  // ...add more as needed...
];

export default function ProjectStartingModal({ open, onClose }: Props) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [countryCode, setCountryCode] = React.useState('+250');
  const [organization, setOrganization] = React.useState('');
  const [projectType, setProjectType] = React.useState('');
  const [budget, setBudget] = React.useState('Under $5,000');
  const [timeline, setTimeline] = React.useState('When do you need this completed?');
  const [description, setDescription] = React.useState('');
  const [consent, setConsent] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);
  const [showPopup, setShowPopup] = React.useState(false);
  const [popupType, setPopupType] = React.useState<'success' | 'error' | 'warning' | null>(null);
  const [popupMessage, setPopupMessage] = React.useState('');
  const [popupDetails, setPopupDetails] = React.useState('');
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setSubmitStatus(null);
      setShowPopup(false);
      setPopupType(null);
      setPopupMessage('');
      setPopupDetails('');
    }
  }, [open]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setSubmitStatus(null);
    try {
      await new Promise(res => setTimeout(res, 1000));
      setName('');
      setEmail('');
      setPhone('');
      setOrganization('');
      setProjectType('');
      setBudget('Under $5,000');
      setTimeline('When do you need this completed?');
      setDescription('');
      setConsent(false);
      setCountryCode('+250');
      setShowPopup(true);
      setPopupType('success');
      setPopupMessage('Your project request was sent successfully!');
      setPopupDetails('');
    } catch (error) {
      setSubmitStatus('Submission failed. Please try again.');
      setShowPopup(true);
      setPopupType('error');
      setPopupMessage('Submission Failed');
      setPopupDetails('Network or server error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Dialog.Root open={open} onOpenChange={isOpen => !isOpen && onClose()}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
          <Dialog.Content ref={dialogRef} className="fixed left-1/2 top-1/2 z-50 w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/15 bg-white/5 shadow-xl backdrop-blur-xl p-0">
            <div className="h-2 rounded-t-2xl bg-gradient-to-r from-orange-400/40 via-white/10 to-indigo-400/40" />
            <button type="button" onClick={onClose} aria-label="Close dialog" className="group absolute right-4 top-[50px] -translate-y-1/2 z-20 h-12 w-12 rounded-full bg-white/10 backdrop-blur-xl ring-2 ring-white/30 hover:bg-white/20 flex items-center justify-center shadow-lg">
              <span className="h-8 w-8 rounded-full bg-gradient-to-br from-zinc-100/80 to-white/60 shadow-inner flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-zinc-800/80" aria-hidden>
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
            </button>
            <header className="px-6 pt-6 sm:px-8">
              <div className="flex items-center gap-3 text-orange-300/90">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-orange-400/20 ring-1 ring-orange-300/30">
                  <span className="h-2 w-2 rounded-full bg-orange-300" />
                </span>
                <h1 className="text-xl font-semibold">Start Your Project</h1>
              </div>
              <div className="mt-4">
                <h2 className="text-lg font-semibold">Transform Your Vision Into Reality</h2>
                <p className="mt-1 text-sm text-white/70">Ready to create something extraordinary? Our expert team is here to bring audiovisual dreams to life with African authenticity and global standards.</p>
              </div>
            </header>
            <form onSubmit={handleSubmit} className="grid gap-6 p-6 sm:p-8" aria-labelledby="project-starting-title">
              <input type="hidden" name="hp_field" value="" />
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-medium">Full Name <span className="text-orange-300">*</span></label>
                  <input value={name} onChange={e => setName(e.target.value)} type="text" aria-required placeholder="Your full name" className={`h-11 rounded-lg border border-white/15 bg-white/5 px-3 text-sm placeholder:text-white/40 outline-none transition focus:border-orange-300/40 focus:bg-white/10 ${name.trim() ? 'ring-1 ring-orange-400/30' : ''}`} />
                </div>
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-medium">Email Address <span className="text-orange-300">*</span></label>
                  <input value={email} onChange={e => setEmail(e.target.value)} type="email" aria-required placeholder="you@company.com" className={`h-11 rounded-lg border border-white/15 bg-white/5 px-3 text-sm placeholder:text-white/40 outline-none transition focus:border-orange-300/40 focus:bg-white/10 ${email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? 'ring-1 ring-orange-400/30' : ''}`} />
                </div>
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-medium">Phone Number</label>
                  <div className="flex gap-2">
                    <select aria-label="Country code" value={countryCode} onChange={e => setCountryCode(e.target.value)} className="h-11 rounded-lg border border-white/15 bg-white/5 px-3 text-sm outline-none transition focus:border-orange-300/40 focus:bg-white/10 min-w-[120px]">
                      {countryCodes.map((c, i) => (<option key={`${c.code}-${i}`} value={c.code}>{c.code} {c.name}</option>))}
                    </select>
                    <input value={phone} onChange={e => setPhone(e.target.value.replace(/\D/g, ''))} type="tel" placeholder="123456789" className="h-11 rounded-lg border border-white/15 bg-white/5 px-3 text-sm placeholder:text-white/40 outline-none transition focus:border-orange-300/40 focus:bg-white/10 flex-1" />
                  </div>
                  {phone && phone.length < 7 && (<div className="text-red-400 text-xs mt-2 flex items-center gap-2"><FaExclamationTriangle className="w-3 h-3" />Please enter at least 7 digits</div>)}
                </div>
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-medium">Company / Organization <span className="text-orange-300">*</span></label>
                  <input value={organization} onChange={e => setOrganization(e.target.value)} type="text" placeholder="Organization name" className="h-11 rounded-lg border border-white/15 bg-white/5 px-3 text-sm placeholder:text-white/40 outline-none transition focus:border-orange-300/40 focus:bg-white/10" />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="mb-1 text-sm font-medium">Project Type <span className="text-orange-300">*</span></label>
                  <select aria-label="Project Type" value={projectType} onChange={e => setProjectType(e.target.value)} required className="h-11 rounded-lg border border-white/15 bg-white/5 px-3 text-sm outline-none transition focus:border-orange-300/40 focus:bg-white/10 w-full">
                    <option value="">Select your project type...</option>
                    {['Commercial','Documentary','Music Video','Event Coverage','Corporate Film','Other'].map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label className="mb-1 text-sm font-medium">Estimated Budget</label>
                  <select aria-label="Estimated Budget" value={budget} onChange={e => setBudget(e.target.value)} className="h-11 rounded-lg border border-white/15 bg-white/5 px-3 text-sm outline-none transition focus:border-orange-300/40 focus:bg-white/10 w-full">
                    {['Under $5,000','$5,000 – $10,000','$10,000 – $25,000','$25,000 – $50,000','$50,000+'].map(b => <option key={b}>{b}</option>)}
                  </select>
                </div>
                <div>
                  <label className="mb-1 text-sm font-medium">Project Timeline</label>
                  <select aria-label="Project Timeline" value={timeline} onChange={e => setTimeline(e.target.value)} className="h-11 rounded-lg border border-white/15 bg-white/5 px-3 text-sm outline-none transition focus:border-orange-300/40 focus:bg-white/10 w-full">
                    {['When do you need this completed?','ASAP','Within 1 month','2-3 months','3-6 months','6+ months','Timeline is flexible'].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="mb-1 text-sm font-medium">Project Description <span className="text-orange-300">*</span></label>
                  <textarea value={description} onChange={e => setDescription(e.target.value)} rows={6} placeholder="Tell us about your vision, goals, and any specific requirements..." className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm placeholder:text-white/40 outline-none transition focus:border-orange-300/40 focus:bg-white/10 w-full" />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="flex items-start gap-3 text-sm">
                    <input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} className="mt-0.5 h-4 w-4 rounded border-white/20 bg-white/5 text-orange-400 focus:ring-0" />
                    <span className="text-white/80">I agree to be contacted about this project and understand that GoodAV will handle my information according to their privacy policy.</span>
                  </label>
                </div>
              </div>
              <div className="mt-2 flex flex-col items-center justify-end gap-3">
                <div className="w-full flex justify-end gap-3">
                  <button type="button" onClick={onClose} className="h-11 rounded-lg border border-white/15 bg-transparent px-4 text-sm text-white/90 transition hover:bg-white/10">Not Now</button>
                  <button type="submit" className="group inline-flex h-11 items-center gap-2 rounded-lg bg-gradient-to-r from-orange-400 to-orange-500 px-4 text-sm font-medium text-black shadow-[0_6px_20px_-6px_rgba(255,140,0,0.6)] transition hover:brightness-105 focus:outline-none" disabled={submitting}>
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-black/10">
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-black/80" aria-hidden>
                        <path d="M2 21l20-9L2 3v6l14 3L2 15v6z" />
                      </svg>
                    </span>
                    {submitting ? 'Submitting...' : 'Send Project Request'}
                  </button>
                </div>
                {submitStatus && !submitStatus.includes('successfully') && (
                  <div className="mt-3 text-orange-400 text-sm text-center">
                    {submitStatus}
                    {submitStatus.includes('failed') && (<div className="mt-1 text-orange-300">If the problem persists, contact us at form@goodav.net</div>)}
                  </div>
                )}
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      <Popup
        show={showPopup}
        type={popupType}
        message={popupMessage}
        details={popupDetails}
        onClose={() => {
          setShowPopup(false);
          if (popupType === 'success') {
            onClose();
          }
        }}
      />
    </>
  );
}

function Popup({ show, type, message, details, onClose }: { show: boolean; type: 'success' | 'error' | 'warning' | null; message: string; details?: string; onClose: () => void }) {
  if (!show || !type) return null;
  const handlePopupClose = () => {
    setTimeout(() => {
      onClose();
    }, 100);
  };
  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-[#1b1b1d] w-full max-w-md mx-auto rounded-xl shadow-2xl border border-gray-700 p-4 sm:p-6 relative">
        <button onClick={handlePopupClose} aria-label="Close popup" className="absolute top-3 right-3 text-gray-400 hover:text-white"> <FaTimesCircle className="w-5 h-5" /> </button>
        <div className="flex justify-center mb-4">
          {type === 'success' ? (
            <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center"><FaCheckCircle className="text-orange-400 w-6 h-6" /></div>
          ) : type === 'warning' ? (
            <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center"><FaExclamationTriangle className="text-orange-400 w-6 h-6" /></div>
          ) : (
            <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center"><FaTimesCircle className="text-red-400 w-6 h-6" /></div>
          )}
        </div>
        <h3 className={`text-lg text-center font-semibold mb-2 ${type === 'success' ? 'text-orange-400' : type === 'warning' ? 'text-orange-400' : 'text-red-400'}`}>{message}</h3>
        {details && (
          <div className="text-gray-300 text-sm text-center mb-4">
            <details className="mx-auto max-w-[28rem] text-left"><summary className="cursor-pointer text-sm text-orange-300">Details</summary><pre className="whitespace-pre-wrap text-xs text-gray-300 mt-2 p-2 bg-[#141414] rounded">{details}</pre></details>
          </div>
        )}
        <div className="flex justify-center">
          <button 
            onClick={handlePopupClose} 
            aria-label={type === 'success' ? 'Continue and close modal' : type === 'warning' ? 'Acknowledge warning' : 'Try again'}
            className={`px-6 py-3 rounded-lg font-medium ${type === 'success' ? 'bg-orange-600 hover:bg-orange-700 text-white' : type === 'warning' ? 'bg-orange-600 hover:bg-orange-700 text-white' : 'bg-red-600 hover:bg-red-700 text-white'}`}
          >
            {type === 'success' ? 'Continue' : type === 'warning' ? 'Understood' : 'Try Again'}
          </button>
        </div>
      </div>
    </div>
  );
}
import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { FaCheckCircle, FaTimesCircle, FaExclamationTriangle, FaCircle } from 'react-icons/fa';

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function ProjectStartingModal({ open, onClose }: Props) {
  // Comprehensive list of country codes (copied from BookingModal for parity)
  const countryCodes = [
    { code: "+1", name: "United States" },
    { code: "+1", name: "Canada" },
    { code: "+7", name: "Russia" },
    { code: "+20", name: "Egypt" },
    { code: "+27", name: "South Africa" },
    { code: "+39", name: "Italy" },
    { code: "+40", name: "Romania" },
    { code: "+41", name: "Switzerland" },
    { code: "+43", name: "Austria" },
    { code: "+44", name: "United Kingdom" },
    { code: "+45", name: "Denmark" },
    { code: "+46", name: "Sweden" },
    { code: "+47", name: "Norway" },
    { code: "+48", name: "Poland" },
    { code: "+49", name: "Germany" },
    { code: "+51", name: "Peru" },
    { code: "+52", name: "Mexico" },
    { code: "+53", name: "Cuba" },
    // ...existing code...
    // Place the return statement at the end of the function
    // All logic and hooks above, all JSX below
    return (
      <>
        <Dialog.Root open={open} onOpenChange={isOpen => !isOpen && onClose()}>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
            <Dialog.Content
              ref={dialogRef}
              className="fixed left-[50%] top-[50%] z-50 w-full max-w-4xl translate-x-[-50%] translate-y-[-50%] overflow-visible rounded-2xl border border-white/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] backdrop-blur-xl p-0 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]"
              onEscapeKeyDown={e => e.preventDefault()}
            >
              <div className="h-2 rounded-t-2xl bg-gradient-to-r from-orange-400/40 via-white/10 to-indigo-400/40" />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close dialog"
                className="group absolute right-4 top-[50px] -translate-y-1/2 z-20 h-12 w-12 rounded-full bg-white/10 backdrop-blur-xl ring-2 ring-white/30 hover:bg-white/20 flex items-center justify-center shadow-lg"
              >
                <span className="h-8 w-8 rounded-full bg-gradient-to-br from-zinc-100/80 to-white/60 shadow-inner flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 text-zinc-800/80" aria-hidden>
                    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </span>
              </button>
              <header className="px-6 pt-6 sm:px-8">
                <div className="flex items-center gap-3 text-orange-300/90">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-orange-400/20 ring-1 ring-orange-300/30">
                    <span className="h-2 w-2 rounded-full bg-orange-300" />
                  </span>
                  <h1 className="text-xl font-semibold">Start Your Project</h1>
                </div>
                <div className="mt-4">
                  import React, { useEffect, useRef } from 'react';
                  import { createPortal } from 'react-dom';
                  import * as Dialog from '@radix-ui/react-dialog';
                  import { FaCheckCircle, FaTimesCircle, FaExclamationTriangle } from 'react-icons/fa';

                  type Props = {
                    open: boolean;
                    onClose: () => void;
                  };

                  export default function ProjectStartingModal({ open, onClose }: Props) {
                    const [name, setName] = React.useState('');
                    const [email, setEmail] = React.useState('');
                    const [phone, setPhone] = React.useState('');
                    const [countryCode, setCountryCode] = React.useState('+250');
                    const [organization, setOrganization] = React.useState('');
                    const [projectType, setProjectType] = React.useState('');
                    const [budget, setBudget] = React.useState('Under $5,000');
                    const [timeline, setTimeline] = React.useState('When do you need this completed?');
                    const [description, setDescription] = React.useState('');
                    const [consent, setConsent] = React.useState(false);
                    const [submitStatus, setSubmitStatus] = React.useState<string | null>(null);
                    const [submitting, setSubmitting] = React.useState(false);
                    const [showPopup, setShowPopup] = React.useState(false);
                    const [popupType, setPopupType] = React.useState<'success' | 'error' | 'warning' | null>(null);
                    const [popupMessage, setPopupMessage] = React.useState('');
                    const [popupDetails, setPopupDetails] = React.useState('');
                    const dialogRef = useRef<HTMLDivElement>(null);
                    const countryCodes = [
                      { code: "+1", name: "United States" },
                      { code: "+44", name: "United Kingdom" },
                      { code: "+250", name: "Rwanda" },
                      // ...add more as needed...
                    ];

                    useEffect(() => {
                      if (open) {
                        setSubmitStatus(null);
                        setShowPopup(false);
                        setPopupType(null);
                        setPopupMessage('');
                        setPopupDetails('');
                      }
                    }, [open]);

                    async function handleSubmit(e: React.FormEvent) {
                      e.preventDefault();
                      setSubmitting(true);
                      setSubmitStatus(null);
                      try {
                        await new Promise(res => setTimeout(res, 1000));
                        setName('');
                        setEmail('');
                        setPhone('');
                        setOrganization('');
                        setProjectType('');
                        setBudget('Under $5,000');
                        setTimeline('When do you need this completed?');
                        setDescription('');
                        setConsent(false);
                        setCountryCode('+250');
                        setShowPopup(true);
                        setPopupType('success');
                        setPopupMessage('Your project request was sent successfully!');
                        setPopupDetails('');
                      } catch (error) {
                        setSubmitStatus('Submission failed. Please try again.');
                        setShowPopup(true);
                        setPopupType('error');
                        setPopupMessage('Submission Failed');
                        setPopupDetails('Network or server error. Please try again.');
                      } finally {
                        setSubmitting(false);
                      }
                    }

                    return (
                      <>
                        <Dialog.Root open={open} onOpenChange={isOpen => !isOpen && onClose()}>
                          <Dialog.Portal>
                            <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
                            <Dialog.Content ref={dialogRef} className="fixed left-1/2 top-1/2 z-50 w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/15 bg-white/5 shadow-xl backdrop-blur-xl p-0">
                              <div className="h-2 rounded-t-2xl bg-gradient-to-r from-orange-400/40 via-white/10 to-indigo-400/40" />
                              <button type="button" onClick={onClose} aria-label="Close dialog" className="group absolute right-4 top-[50px] -translate-y-1/2 z-20 h-12 w-12 rounded-full bg-white/10 backdrop-blur-xl ring-2 ring-white/30 hover:bg-white/20 flex items-center justify-center shadow-lg">
                                <span className="h-8 w-8 rounded-full bg-gradient-to-br from-zinc-100/80 to-white/60 shadow-inner flex items-center justify-center">
                                  <svg viewBox="0 0 24 24" className="h-4 w-4 text-zinc-800/80" aria-hidden>
                                    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                  </svg>
                                </span>
                              </button>
                              <header className="px-6 pt-6 sm:px-8">
                                <div className="flex items-center gap-3 text-orange-300/90">
                                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-orange-400/20 ring-1 ring-orange-300/30">
                                    <span className="h-2 w-2 rounded-full bg-orange-300" />
                                  </span>
                                  <h1 className="text-xl font-semibold">Start Your Project</h1>
                                </div>
                                <div className="mt-4">
                                  <h2 className="text-lg font-semibold">Transform Your Vision Into Reality</h2>
                                  <p className="mt-1 text-sm text-white/70">Ready to create something extraordinary? Our expert team is here to bring audiovisual dreams to life with African authenticity and global standards.</p>
                                </div>
                              </header>
                              <form onSubmit={handleSubmit} className="grid gap-6 p-6 sm:p-8" aria-labelledby="project-starting-title">
                                <input type="hidden" name="hp_field" value="" />
                                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                  <div className="flex flex-col">
                                    <label className="mb-1 text-sm font-medium">Full Name <span className="text-orange-300">*</span></label>
                                    <input value={name} onChange={e => setName(e.target.value)} type="text" aria-required placeholder="Your full name" className={`h-11 rounded-lg border border-white/15 bg-white/5 px-3 text-sm placeholder:text-white/40 outline-none transition focus:border-orange-300/40 focus:bg-white/10 ${name.trim() ? 'ring-1 ring-orange-400/30' : ''}`} />
                                  </div>
                                  <div className="flex flex-col">
                                    <label className="mb-1 text-sm font-medium">Email Address <span className="text-orange-300">*</span></label>
                                    <input value={email} onChange={e => setEmail(e.target.value)} type="email" aria-required placeholder="you@company.com" className={`h-11 rounded-lg border border-white/15 bg-white/5 px-3 text-sm placeholder:text-white/40 outline-none transition focus:border-orange-300/40 focus:bg-white/10 ${email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? 'ring-1 ring-orange-400/30' : ''}`} />
                                  </div>
                                  <div className="flex flex-col">
                                    <label className="mb-1 text-sm font-medium">Phone Number</label>
                                    <div className="flex gap-2">
                                      <select aria-label="Country code" value={countryCode} onChange={e => setCountryCode(e.target.value)} className="h-11 rounded-lg border border-white/15 bg-white/5 px-3 text-sm outline-none transition focus:border-orange-300/40 focus:bg-white/10 min-w-[120px]">
                                        {countryCodes.map((c, i) => (<option key={`${c.code}-${i}`} value={c.code}>{c.code} {c.name}</option>))}
                                      </select>
                                      <input value={phone} onChange={e => setPhone(e.target.value.replace(/\D/g, ''))} type="tel" placeholder="123456789" className="h-11 rounded-lg border border-white/15 bg-white/5 px-3 text-sm placeholder:text-white/40 outline-none transition focus:border-orange-300/40 focus:bg-white/10 flex-1" />
                                    </div>
                                    {phone && phone.length < 7 && (<div className="text-red-400 text-xs mt-2 flex items-center gap-2"><FaExclamationTriangle className="w-3 h-3" />Please enter at least 7 digits</div>)}
                                  </div>
                                  <div className="flex flex-col">
                                    <label className="mb-1 text-sm font-medium">Company / Organization <span className="text-orange-300">*</span></label>
                                    <input value={organization} onChange={e => setOrganization(e.target.value)} type="text" placeholder="Organization name" className="h-11 rounded-lg border border-white/15 bg-white/5 px-3 text-sm placeholder:text-white/40 outline-none transition focus:border-orange-300/40 focus:bg-white/10" />
                                  </div>
                                  <div className="col-span-1 md:col-span-2">
                                    <label className="mb-1 text-sm font-medium">Project Type <span className="text-orange-300">*</span></label>
                                    <select aria-label="Project Type" value={projectType} onChange={e => setProjectType(e.target.value)} required className="h-11 rounded-lg border border-white/15 bg-white/5 px-3 text-sm outline-none transition focus:border-orange-300/40 focus:bg-white/10 w-full">
                                      <option value="">Select your project type...</option>
                                      {['Commercial','Documentary','Music Video','Event Coverage','Corporate Film','Other'].map(o => <option key={o} value={o}>{o}</option>)}
                                    </select>
                                  </div>
                                  <div>
                                    <label className="mb-1 text-sm font-medium">Estimated Budget</label>
                                    <select aria-label="Estimated Budget" value={budget} onChange={e => setBudget(e.target.value)} className="h-11 rounded-lg border border-white/15 bg-white/5 px-3 text-sm outline-none transition focus:border-orange-300/40 focus:bg-white/10 w-full">
                                      {['Under $5,000','$5,000 – $10,000','$10,000 – $25,000','$25,000 – $50,000','$50,000+'].map(b => <option key={b}>{b}</option>)}
                                    </select>
                                  </div>
                                  <div>
                                    <label className="mb-1 text-sm font-medium">Project Timeline</label>
                                    <select aria-label="Project Timeline" value={timeline} onChange={e => setTimeline(e.target.value)} className="h-11 rounded-lg border border-white/15 bg-white/5 px-3 text-sm outline-none transition focus:border-orange-300/40 focus:bg-white/10 w-full">
                                      {['When do you need this completed?','ASAP','Within 1 month','2-3 months','3-6 months','6+ months','Timeline is flexible'].map(t => <option key={t}>{t}</option>)}
                                    </select>
                                  </div>
                                  <div className="col-span-1 md:col-span-2">
                                    <label className="mb-1 text-sm font-medium">Project Description <span className="text-orange-300">*</span></label>
                                    <textarea value={description} onChange={e => setDescription(e.target.value)} rows={6} placeholder="Tell us about your vision, goals, and any specific requirements..." className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm placeholder:text-white/40 outline-none transition focus:border-orange-300/40 focus:bg-white/10 w-full" />
                                  </div>
                                  <div className="col-span-1 md:col-span-2">
                                    <label className="flex items-start gap-3 text-sm">
                                      <input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} className="mt-0.5 h-4 w-4 rounded border-white/20 bg-white/5 text-orange-400 focus:ring-0" />
                                      <span className="text-white/80">I agree to be contacted about this project and understand that GoodAV will handle my information according to their privacy policy.</span>
                                    </label>
                                  </div>
                                </div>
                                <div className="mt-2 flex flex-col items-center justify-end gap-3">
                                  <div className="w-full flex justify-end gap-3">
                                    <button type="button" onClick={onClose} className="h-11 rounded-lg border border-white/15 bg-transparent px-4 text-sm text-white/90 transition hover:bg-white/10">Not Now</button>
                                    <button type="submit" className="group inline-flex h-11 items-center gap-2 rounded-lg bg-gradient-to-r from-orange-400 to-orange-500 px-4 text-sm font-medium text-black shadow-[0_6px_20px_-6px_rgba(255,140,0,0.6)] transition hover:brightness-105 focus:outline-none" disabled={submitting}>
                                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-black/10">
                                        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-black/80" aria-hidden>
                                          <path d="M2 21l20-9L2 3v6l14 3L2 15v6z" />
                                        </svg>
                                      </span>
                                      {submitting ? 'Submitting...' : 'Send Project Request'}
                                    </button>
                                  </div>
                                  {submitStatus && !submitStatus.includes('successfully') && (
                                    <div className="mt-3 text-orange-400 text-sm text-center">
                                      {submitStatus}
                                      {submitStatus.includes('failed') && (<div className="mt-1 text-orange-300">If the problem persists, contact us at form@goodav.net</div>)}
                                    </div>
                                  )}
                                </div>
                              </form>
                            </Dialog.Content>
                          </Dialog.Portal>
                        </Dialog.Root>
                        <Popup
                          show={showPopup}
                          type={popupType}
                          message={popupMessage}
                          details={popupDetails}
                          onClose={() => {
                            setShowPopup(false);
                            if (popupType === 'success') {
                              onClose();
                            }
                          }}
                        />
                      </>
                    );
      </Dialog.Portal>
      {/* Inline popup for success / error messages */}
      <Popup
        show={showPopup}
        type={popupType}
        message={popupMessage}
        details={popupDetails}
        onClose={() => {
          setShowPopup(false);
          if (popupType === 'success') {
            onClose(); // Close modal on success
          }
        }}
      />
            <p className="mt-1 text-sm text-white/70">
              Ready to create something extraordinary? Our expert team is here to bring audiovisual dreams to life with African authenticity and global standards.
            </p>
          </div>
        </header>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="grid gap-6 p-6 sm:p-8"
          aria-labelledby="project-starting-title"
        >
          <input type="hidden" name="hp_field" value="" />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium">Full Name <span className="text-orange-300">*</span></label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                aria-required
                placeholder="Your full name"
                className={`h-11 rounded-lg border border-white/15 bg-white/5 px-3 text-sm placeholder:text-white/40 outline-none transition focus:border-orange-300/40 focus:bg-white/10 ${name.trim() ? 'ring-1 ring-orange-400/30' : ''}`}
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium">Email Address <span className="text-orange-300">*</span></label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                aria-required
                placeholder="you@company.com"
                className={`h-11 rounded-lg border border-white/15 bg-white/5 px-3 text-sm placeholder:text-white/40 outline-none transition focus:border-orange-300/40 focus:bg-white/10 ${email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? 'ring-1 ring-orange-400/30' : ''}`}
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium">Phone Number</label>
              <div className="flex gap-2">
                <select aria-label="Country code" value={countryCode} onChange={(e) => setCountryCode(e.target.value)} className="h-11 rounded-lg border border-white/15 bg-white/5 px-3 text-sm outline-none transition focus:border-orange-300/40 focus:bg-white/10 min-w-[120px]">
                  {countryCodes.map((c, i) => (<option key={`${c.code}-${i}`} value={c.code}>{c.code} {c.name}</option>))}
                </select>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  type="tel"
                  placeholder="123456789"
                  className="h-11 rounded-lg border border-white/15 bg-white/5 px-3 text-sm placeholder:text-white/40 outline-none transition focus:border-orange-300/40 focus:bg-white/10 flex-1"
                />
              </div>
              {phone && phone.length < 7 && (
                <div className="text-red-400 text-xs mt-2 flex items-center gap-2"><FaExclamationTriangle className="w-3 h-3" />Please enter at least 7 digits</div>
              )}
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium">Company / Organization <span className="text-orange-300">*</span></label>
              <input
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                type="text"
                placeholder="Organization name"
                className="h-11 rounded-lg border border-white/15 bg-white/5 px-3 text-sm placeholder:text-white/40 outline-none transition focus:border-orange-300/40 focus:bg-white/10"
              />
            </div>

            <div className="col-span-1 md:col-span-2">
              <label className="mb-1 text-sm font-medium">Project Type <span className="text-orange-300">*</span></label>
              <select
                aria-label="Project Type"
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                required
                className="h-11 rounded-lg border border-white/15 bg-white/5 px-3 text-sm outline-none transition focus:border-orange-300/40 focus:bg-white/10 w-full"
              >
                <option value="">Select your project type...</option>
                {['Commercial','Documentary','Music Video','Event Coverage','Corporate Film','Other'].map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>

            <div>
              <label className="mb-1 text-sm font-medium">Estimated Budget</label>
              <select aria-label="Estimated Budget" value={budget} onChange={(e) => setBudget(e.target.value)} className="h-11 rounded-lg border border-white/15 bg-white/5 px-3 text-sm outline-none transition focus:border-orange-300/40 focus:bg-white/10 w-full">
                {['Under $5,000','$5,000 – $10,000','$10,000 – $25,000','$25,000 – $50,000','$50,000+'].map(b => <option key={b}>{b}</option>)}
              </select>
            </div>

            <div>
              <label className="mb-1 text-sm font-medium">Project Timeline</label>
              <select aria-label="Project Timeline" value={timeline} onChange={(e) => setTimeline(e.target.value)} className="h-11 rounded-lg border border-white/15 bg-white/5 px-3 text-sm outline-none transition focus:border-orange-300/40 focus:bg-white/10 w-full">
                {['When do you need this completed?','ASAP','Within 1 month','2-3 months','3-6 months','6+ months','Timeline is flexible'].map(t => <option key={t}>{t}</option>)}
              </select>
            </div>

            <div className="col-span-1 md:col-span-2">
              <label className="mb-1 text-sm font-medium">Project Description <span className="text-orange-300">*</span></label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={6} placeholder="Tell us about your vision, goals, and any specific requirements..." className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm placeholder:text-white/40 outline-none transition focus:border-orange-300/40 focus:bg-white/10 w-full" />
            </div>

            <div className="col-span-1 md:col-span-2">
              <label className="flex items-start gap-3 text-sm">
                <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 h-4 w-4 rounded border-white/20 bg-white/5 text-orange-400 focus:ring-0" />
                <span className="text-white/80">I agree to be contacted about this project and understand that GoodAV will handle my information according to their privacy policy.</span>
              </label>
            </div>
          </div>

          {/* Footer actions */}
          <div className="mt-2 flex flex-col items-center justify-end gap-3">
            <div className="w-full flex justify-end gap-3">
              <button type="button" onClick={onClose} className="h-11 rounded-lg border border-white/15 bg-transparent px-4 text-sm text-white/90 transition hover:bg-white/10">Not Now</button>
              <button type="submit" className="group inline-flex h-11 items-center gap-2 rounded-lg bg-gradient-to-r from-orange-400 to-orange-500 px-4 text-sm font-medium text-black shadow-[0_6px_20px_-6px_rgba(255,140,0,0.6)] transition hover:brightness-105 focus:outline-none" disabled={submitting}>
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-black/10">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-black/80" aria-hidden>
                    <path d="M2 21l20-9L2 3v6l14 3L2 15v6z" />
                  </svg>
                </span>
                {submitting ? 'Submitting...' : 'Send Project Request'}
              </button>
            </div>

            {/* Inline submit status: show only non-success messages (success uses the popup) */}
            {submitStatus && !submitStatus.includes('successfully') && (
              <div className="mt-3 text-orange-400 text-sm text-center">
                {submitStatus}
                {submitStatus.includes('failed') && (<div className="mt-1 text-orange-300">If the problem persists, contact us at form@goodav.net</div>)}
              </div>
            )}
          </div>
        </form>
        </Dialog.Content>
        </Dialog.Portal>
        {/* Inline popup for success / error messages */}
        <Popup 
          show={showPopup} 
          type={popupType} 
          message={popupMessage} 
          details={popupDetails} 
          onClose={() => {
            setShowPopup(false);
            if (popupType === 'success') {
              onClose(); // Close modal on success
            }
          }} 
        />
      </Dialog.Root>
  );
}

// Success / Error popup (global to this component)
function Popup({ show, type, message, details, onClose }: { show: boolean; type: 'success' | 'error' | 'warning' | null; message: string; details?: string; onClose: () => void }) {
  if (!show || !type) return null;
  // Custom close handler for modal-close logic
  const handlePopupClose = () => {
    if (type === 'success') {
      // Close modal on success
      onClose();
    } else {
      // Keep modal open for error/warning
      onClose(); // Optionally, you can keep the modal open or reset form/step here
    }
  };
  const popup = (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-[#1b1b1d] w-full max-w-md mx-auto rounded-xl shadow-2xl border border-gray-700 p-4 sm:p-6 relative">
        <button onClick={handlePopupClose} aria-label="Close popup" className="absolute top-3 right-3 text-gray-400 hover:text-white"> <FaTimesCircle className="w-5 h-5" /> </button>
        <div className="flex justify-center mb-4">
          {type === 'success' ? (
            <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center"><FaCheckCircle className="text-orange-400 w-6 h-6" /></div>
          ) : type === 'warning' ? (
            <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center"><FaExclamationTriangle className="text-orange-400 w-6 h-6" /></div>
          ) : (
            <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center"><FaTimesCircle className="text-red-400 w-6 h-6" /></div>
          )}
        </div>
        <h3 className={`text-lg text-center font-semibold mb-2 ${type === 'success' ? 'text-orange-400' : type === 'warning' ? 'text-orange-400' : 'text-red-400'}`}>{message}</h3>
        {details && (
          <div className="text-gray-300 text-sm text-center mb-4">
            <details className="mx-auto max-w-[28rem] text-left"><summary className="cursor-pointer text-sm text-orange-300">Details</summary><pre className="whitespace-pre-wrap text-xs text-gray-300 mt-2 p-2 bg-[#141414] rounded">{details}</pre></details>
          </div>
        )}
        <div className="flex justify-center">
          <button 
            onClick={handlePopupClose} 
            aria-label={type === 'success' ? 'Continue and close modal' : type === 'warning' ? 'Acknowledge warning' : 'Try again'}
            className={`px-6 py-3 rounded-lg font-medium ${type === 'success' ? 'bg-orange-600 hover:bg-orange-700 text-white' : type === 'warning' ? 'bg-orange-600 hover:bg-orange-700 text-white' : 'bg-red-600 hover:bg-red-700 text-white'}`}
          >
            {type === 'success' ? 'Continue' : type === 'warning' ? 'Understood' : 'Try Again'}
          </button>
        </div>
      </div>
    </div>
  );

  try {
    return createPortal(popup, document.body);
  } catch (e) {
    // Fallback to inline render if portal is not available (safeguard for SSR/test envs)
    return popup;
  }
}

// Note: Popup is intentionally not exported to avoid fast-refresh warnings when files export non-components.

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
        aria-label={label}
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
