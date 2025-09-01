import React, { useEffect, useRef, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { FaCheckCircle, FaTimesCircle, FaExclamationTriangle, FaSearch } from 'react-icons/fa';
import { createPortal } from 'react-dom';
import countryCodes from '../../data/countryCodes.json';

export default function ProjectStartingModal({ open, onClose }) {
  // --- Validation ---
  function validateForm() {
    if (!name.trim()) {
      showNotificationPopup('error', 'Full Name is required');
      return false;
    }
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      showNotificationPopup('error', 'A valid Email Address is required');
      return false;
    }
    if (!phone.trim() || phone.length < 7) {
      showNotificationPopup('error', 'A valid Phone Number (at least 7 digits) is required');
      return false;
    }
    if (!organization.trim()) {
      showNotificationPopup('error', 'Company / Organization is required');
      return false;
    }
    if (!projectType.trim()) {
      showNotificationPopup('error', 'Project Type is required');
      return false;
    }
    if (!budget.trim()) {
      showNotificationPopup('error', 'Estimated Budget is required');
      return false;
    }
    if (!timeline.trim() || timeline === 'When do you need this completed?') {
      showNotificationPopup('error', 'Project Timeline is required');
      return false;
    }
    if (!description.trim()) {
      showNotificationPopup('error', 'Project Description is required');
      return false;
    }
    if (!consent) {
      showNotificationPopup('error', 'You must agree to be contacted about this project');
      return false;
    }
    return true;
  }
  // --- Feedback Popup Logic ---
  function showNotificationPopup(type, message, details = '') {
    setPopupType(type);
    setPopupMessage(message);
    setPopupDetails(details);
    setShowPopup(true);
  }

  function closePopup() {
    setShowPopup(false);
    setPopupType(null);
    setPopupMessage('');
    setPopupDetails('');
    if (popupType === 'success') {
      onClose(); // Close modal on success
    }
  }
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
  const [countrySearch, setCountrySearch] = useState('');
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

  // --- Validation ---
  // --- Validation ---

  // --- Backend Integration ---
  async function handleSubmit(e) {
    e.preventDefault();
    if (submitting) return; // Prevent multiple submissions
    if (!validateForm()) return;
    setSubmitting(true);
    setSubmitStatus('Submitting your project request...');
    const projectData = {
      name,
      email,
      phone,
      countryCode,
      organization,
      projectType,
      budget,
      timeline,
      description: description.trim(),
      consent,
      type: 'project',
    };
    try {
      const apiBase = import.meta.env.VITE_API_BASE_URL || '';
      const response = await fetch(`${apiBase}/process_project.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData),
      });
      const result = await response.json();
      if (response.ok && result.success) {
        let userMessage = 'Your project request was sent successfully! We will contact you soon.';
        setSubmitStatus(userMessage);
        setTimeout(() => setSubmitStatus(''), 6000);
        setName('');
        setEmail('');
        setPhone('');
        setCountryCode('+250');
        setOrganization('');
        setProjectType('');
        setBudget('Under $5,000');
        setTimeline('When do you need this completed?');
        setDescription('');
        setConsent(false);
        let popupDetailsStr = '';
        if (result.warning_details) {
          if (Array.isArray(result.warning_details)) {
            popupDetailsStr = result.warning_details.join('\n');
          } else {
            popupDetailsStr = String(result.warning_details);
          }
        }
        if (result.warning) {
          const combined = `Your project has been saved successfully (ID: ${result.id}). ${result.warning}.` + (popupDetailsStr ? `\n\nDetails:\n${popupDetailsStr}` : '');
          showNotificationPopup('warning', 'Project Saved - Email Issue', combined);
        } else {
          const successDetails = `Your project request has been received. Project ID: ${result.id}. We will contact you soon.` + (popupDetailsStr ? `\n\nDetails:\n${popupDetailsStr}` : '');
          showNotificationPopup('success', 'Project Submitted Successfully!', successDetails);
        }
      } else {
        const errorMessage = result.error || 'Submission failed. Please try again.';
        setSubmitStatus(errorMessage);
        let errorDetails = errorMessage;
        if (result.warning_details) {
          if (Array.isArray(result.warning_details)) {
            errorDetails = errorMessage + '\n\n' + result.warning_details.join('\n');
          } else {
            errorDetails = errorMessage + '\n\n' + String(result.warning_details);
          }
        }
        showNotificationPopup('error', 'Project Submission Failed', errorDetails);
      }
    } catch (error) {
      setSubmitStatus('Network error. Please check your connection and try again.');
      showNotificationPopup('error', 'Network Error', 'Please check your internet connection and try again. If the problem persists, contact our support team.');
    } finally {
      setSubmitting(false);
    }
  }

  // --- Accessibility: Close on ESC ---
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // --- Modal UI ---
  return (
    <>
      <Dialog.Root open={open} onOpenChange={isOpen => {
        // Prevent closing modal when popup is open
        if (showPopup) return;
        if (!isOpen) onClose();
      }}>
        <Dialog.Portal>
          <Dialog.Overlay className={`fixed inset-0 bg-black/60 backdrop-blur-sm${showPopup ? ' pointer-events-none' : ''}`} />
          <Dialog.Content ref={dialogRef} className={`fixed left-1/2 top-1/2 z-50 w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/15 bg-white/5 shadow-xl backdrop-blur-xl p-0${showPopup ? ' pointer-events-none' : ''}`} aria-modal="true" role="dialog">
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
            {/* Project Form */}
            <form onSubmit={handleSubmit} className="grid gap-6 p-6 sm:p-8" aria-labelledby="project-starting-title">
              <input type="hidden" name="hp_field" value="" />
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {/* Full Name */}
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-medium" htmlFor="project-name">Full Name <span className="text-orange-300">*</span></label>
                  <input id="project-name" value={name} onChange={e => setName(e.target.value)} type="text" placeholder="Your name" className="h-11 rounded-lg border border-white/15 bg-white/5 px-3 text-sm placeholder:text-white/40 outline-none transition focus:border-orange-300/40 focus:bg-white/10" required aria-required="true" />
                </div>
                {/* Email Address */}
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-medium" htmlFor="project-email">Email Address <span className="text-orange-300">*</span></label>
                  <input id="project-email" value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="you@email.com" className="h-11 rounded-lg border border-white/15 bg-white/5 px-3 text-sm placeholder:text-white/40 outline-none transition focus:border-orange-300/40 focus:bg-white/10" required aria-required="true" />
                </div>
                {/* Phone Number (Country Code + Phone) */}
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-medium" htmlFor="project-phone">Phone Number <span className="text-orange-300">*</span></label>
                  <div className="flex gap-2 items-center">
                    <select
                      id="project-country-code"
                      aria-label="Country Code"
                      value={countryCode}
                      onChange={e => setCountryCode(e.target.value)}
                      className="h-10 w-32 rounded-lg border border-white/15 bg-white/5 px-2 text-base outline-none transition focus:border-orange-300/40 focus:bg-white/10 overflow-y-auto max-h-[40vh]"
                    >
                      {countryCodes.map((c, i) => (
                        <option key={`${c.code}-${i}`} value={c.code}>{c.code} {c.name}</option>
                      ))}
                    </select>
                    <input
                      id="project-phone"
                      value={phone}
                      onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
                      type="tel"
                      placeholder="123456789"
                      className="h-10 flex-1 rounded-lg border border-white/15 bg-white/5 px-3 text-base placeholder:text-white/40 outline-none transition focus:border-orange-300/40 focus:bg-white/10"
                      aria-label="Phone Number"
                      inputMode="numeric"
                      pattern="[0-9]*"
                    />
                  </div>
                  {phone && phone.length < 7 && (<span className="text-red-400 text-xs mt-1 flex items-center gap-1"><FaExclamationTriangle className="w-3 h-3" />Please enter at least 7 digits</span>)}
                </div>
                {/* Organization */}
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-medium" htmlFor="project-organization">Company / Organization <span className="text-orange-300">*</span></label>
                  <input id="project-organization" value={organization} onChange={e => setOrganization(e.target.value)} type="text" placeholder="Organization name" className="h-11 rounded-lg border border-white/15 bg-white/5 px-3 text-sm placeholder:text-white/40 outline-none transition focus:border-orange-300/40 focus:bg-white/10" required aria-required="true" />
                </div>
                {/* Project Type */}
                <div className="col-span-1 md:col-span-2">
                  <label className="mb-1 text-sm font-medium" htmlFor="project-type">Project Type <span className="text-orange-300">*</span></label>
                  <select id="project-type" aria-label="Project Type" value={projectType} onChange={e => setProjectType(e.target.value)} required className="h-11 rounded-lg border border-white/15 bg-white/5 px-3 text-sm outline-none transition focus:border-orange-300/40 focus:bg-white/10 w-full" aria-required="true">
                    <option value="">Select your project type...</option>
                    {['Commercial','Documentary','Music Video','Event Coverage','Corporate Film','Other'].map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                {/* Budget */}
                <div>
                  <label className="mb-1 text-sm font-medium" htmlFor="project-budget">Estimated Budget</label>
                  <select id="project-budget" aria-label="Estimated Budget" value={budget} onChange={e => setBudget(e.target.value)} className="h-11 rounded-lg border border-white/15 bg-white/5 px-3 text-sm outline-none transition focus:border-orange-300/40 focus:bg-white/10 w-full">
                    {['Under $5,000','$5,000 – $10,000','$10,000 – $25,000','$25,000 – $50,000','$50,000+'].map(b => <option key={b}>{b}</option>)}
                  </select>
                </div>
                {/* Timeline */}
                <div>
                  <label className="mb-1 text-sm font-medium" htmlFor="project-timeline">Project Timeline</label>
                  <select id="project-timeline" aria-label="Project Timeline" value={timeline} onChange={e => setTimeline(e.target.value)} className="h-11 rounded-lg border border-white/15 bg-white/5 px-3 text-sm outline-none transition focus:border-orange-300/40 focus:bg-white/10 w-full">
                    {['When do you need this completed?','ASAP','Within 1 month','2-3 months','3-6 months','6+ months','Timeline is flexible'].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                {/* Description */}
                <div className="col-span-1 md:col-span-2">
                  <label className="mb-1 text-sm font-medium" htmlFor="project-description">Project Description <span className="text-orange-300">*</span></label>
                  <textarea id="project-description" value={description} onChange={e => setDescription(e.target.value)} rows={6} placeholder="Tell us about your vision, goals, and any specific requirements..." className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm placeholder:text-white/40 outline-none transition focus:border-orange-300/40 focus:bg-white/10 w-full" required aria-required="true" />
                </div>
                {/* Consent Checkbox */}
                <div className="col-span-1 md:col-span-2">
                  <label className="flex items-start gap-3 text-sm" htmlFor="project-consent">
                    <input id="project-consent" type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} className="mt-0.5 h-4 w-4 rounded border-white/20 bg-white/5 text-orange-400 focus:ring-0" />
                    <span className="text-white/80">I agree to be contacted about this project and understand that GoodAV will handle my information according to their privacy policy.</span>
                  </label>
                </div>
              </div>
              {/* Submit & Feedback */}
              <div className="mt-2 flex flex-col items-center justify-end gap-3">
                <div className="w-full flex justify-end gap-3">
                  <button type="button" onClick={onClose} className="h-11 rounded-lg border border-white/15 bg-transparent px-4 text-sm text-white/90 transition hover:bg-white/10" aria-label="Cancel and close">Not Now</button>
                  <button type="submit" className="group inline-flex h-11 items-center gap-2 rounded-lg bg-gradient-to-r from-orange-400 to-orange-500 px-4 text-sm font-medium text-black shadow-[0_6px_20px_-6px_rgba(255,140,0,0.6)] transition hover:brightness-105 focus:outline-none" disabled={submitting} aria-label="Send Project Request">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-black/10">
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-black/80" aria-hidden>
                        <path d="M2 21l20-9L2 3v6l14 3L2 15v6z" />
                      </svg>
                    </span>
                    {submitting ? 'Submitting...' : 'Send Project Request'}
                  </button>
                </div>
                  {/* Feedback message removed */}
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
  {/* Feedback Popup: This overlay uses z-[99999] to ensure it always appears above the modal. If you change modal z-index, update this accordingly. */}
      <Popup
        show={showPopup}
        type={popupType}
        message={popupMessage}
        details={popupDetails}
        onClose={closePopup}
      />
    </>
  );
}

function Popup({ show, type, message, details, onClose }) {
  if (!show || !type) return null;
  // Trap focus and prevent background interaction
  useEffect(() => {
    if (!show) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();
      }
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.body.style.overflow = show ? 'hidden' : '';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [show, onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 pointer-events-auto"
      aria-modal="true"
      role="dialog"
      tabIndex={-1}
      style={{ outline: 'none' }}
    >
      <div
        className="bg-[#1b1b1d] w-full max-w-md mx-auto rounded-xl shadow-2xl border border-gray-700 p-4 sm:p-6 relative"
        tabIndex={0}
      >
        <button onClick={onClose} aria-label="Close popup" className="absolute top-3 right-3 text-gray-400 hover:text-white"> <FaTimesCircle className="w-5 h-5" /> </button>
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
            onClick={onClose} 
            aria-label={type === 'success' ? 'Continue and close modal' : type === 'warning' ? 'Acknowledge warning' : 'Try again'}
            className={`px-6 py-3 rounded-lg font-medium ${type === 'success' ? 'bg-orange-600 hover:bg-orange-700 text-white' : type === 'warning' ? 'bg-orange-600 hover:bg-orange-700 text-white' : 'bg-red-600 hover:bg-red-700 text-white'}`}
          >
            {type === 'success' ? 'Continue' : type === 'warning' ? 'Understood' : 'Try Again'}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
