import React, { useEffect, useRef, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { FaCheckCircle, FaTimesCircle, FaExclamationTriangle } from 'react-icons/fa';

const countryCodes = [
  { code: "+1", name: "United States" },
  { code: "+44", name: "United Kingdom" },
  { code: "+250", name: "Rwanda" },
  { code: "+33", name: "France" },
  { code: "+49", name: "Germany" },
  { code: "+39", name: "Italy" },
  { code: "+34", name: "Spain" },
  { code: "+81", name: "Japan" },
  { code: "+86", name: "China" },
  { code: "+91", name: "India" },
  // ...add more as needed
];

export default function ProjectStartingModal({ open, onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+250');
  const [organization, setOrganization] = useState('');
  const [projectType, setProjectType] = useState('');
  const [budget, setBudget] = useState('Under $5,000');
  const [timeline, setTimeline] = useState('When do you need this completed?');
  const [description, setDescription] = useState('');
  const [consent, setConsent] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState(null);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupDetails, setPopupDetails] = useState('');
  const dialogRef = useRef(null);

  useEffect(() => {
    if (open) {
      setSubmitStatus(null);
      setShowPopup(false);
      setPopupType(null);
      setPopupMessage('');
      setPopupDetails('');
    }
  }, [open]);

  async function handleSubmit(e) {
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
              </div>
            </header>
            <form onSubmit={handleSubmit} className="grid gap-6 p-6 sm:p-8" aria-labelledby="project-starting-title">
              <input type="hidden" name="hp_field" value="" />
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-medium">Full Name <span className="text-orange-300">*</span></label>
                  <input value={name} onChange={e => setName(e.target.value)} type="text" placeholder="Your name" className="h-11 rounded-lg border border-white/15 bg-white/5 px-3 text-sm placeholder:text-white/40 outline-none transition focus:border-orange-300/40 focus:bg-white/10" required />
                </div>
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-medium">Email Address <span className="text-orange-300">*</span></label>
                  <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="you@email.com" className="h-11 rounded-lg border border-white/15 bg-white/5 px-3 text-sm placeholder:text-white/40 outline-none transition focus:border-orange-300/40 focus:bg-white/10" required />
                </div>
                <div className="flex gap-2">
                  <select aria-label="Country Code" value={countryCode} onChange={e => setCountryCode(e.target.value)} className="h-11 rounded-lg border border-white/15 bg-white/5 px-2 text-sm outline-none transition focus:border-orange-300/40 focus:bg-white/10">
                    {countryCodes.map((c, i) => (<option key={`${c.code}-${i}`} value={c.code}>{c.code} {c.name}</option>))}
                  </select>
                  <input value={phone} onChange={e => setPhone(e.target.value.replace(/\D/g, ''))} type="tel" placeholder="123456789" className="h-11 rounded-lg border border-white/15 bg-white/5 px-3 text-sm placeholder:text-white/40 outline-none transition focus:border-orange-300/40 focus:bg-white/10 flex-1" />
                </div>
                {phone && phone.length < 7 && (<div className="text-red-400 text-xs mt-2 flex items-center gap-2"><FaExclamationTriangle className="w-3 h-3" />Please enter at least 7 digits</div>)}
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

function Popup({ show, type, message, details, onClose }) {
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
