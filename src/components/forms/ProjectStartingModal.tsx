import React, { useEffect, useRef, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { FaCheckCircle, FaTimesCircle, FaExclamationTriangle, FaSearch, FaSpinner, FaRocket, FaUser, FaEnvelope, FaPhone, FaBuilding, FaProjectDiagram, FaDollarSign, FaCalendarAlt, FaFileAlt, FaShieldAlt } from 'react-icons/fa';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
        const userMessage = 'Your project request was sent successfully! We will contact you soon.';
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
      {submitting && typeof window !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black/80 backdrop-blur-lg">
          <div className="mb-6">
            {/* Branded Loading Animation */}
            <svg id="goodav-bimi.svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 390.2 387.4" className="w-32 h-auto animate-spin loading-spinner">
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
          <div className="text-white text-xl font-semibold drop-shadow-lg animate-pulse mt-2">Please wait while we submit your project...</div>
        </div>,
        document.body
      )}
      <Dialog.Root open={open} onOpenChange={isOpen => {
        // Prevent closing modal when popup is open
        if (showPopup) return;
        if (!isOpen) onClose();
      }}>
        <Dialog.Portal>
          <Dialog.Overlay className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300${showPopup ? ' pointer-events-none' : ''}`} />
          <Dialog.Content
            ref={dialogRef}
            className={`fixed left-1/2 top-1/2 z-50 w-full max-w-5xl max-w-[95vw] 
                       -translate-x-1/2 -translate-y-1/2 
                       rounded-3xl border border-white/15 
                       bg-gradient-to-br from-white/8 to-white/4 shadow-2xl backdrop-blur-xl 
                       p-0 overflow-y-auto 
                       max-h-[90vh]
                       ${showPopup ? ' pointer-events-none' : ''}`}
            aria-modal="true"
            role="dialog"
            itemScope
            itemType="https://schema.org/ContactPage"
          >
            {/* SEO Structured Data */}
            <script type="application/ld+json">
              {JSON.stringify({
                "@context": "https://schema.org",
                "@type": "ContactPage",
                "name": "Start Your Audiovisual Project - GoodAV",
                "description": "Begin your professional audiovisual production project with comprehensive form submission and expert consultation.",
                "url": "https://goodav.net/contact",
                "mainEntity": {
                  "@type": "Organization",
                  "name": "GoodAV",
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "contactType": "Project Inquiry",
                    "availableLanguage": "English"
                  }
                }
              })}
            </script>

            {/* Enhanced Header with Animation */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="h-3 rounded-t-3xl bg-gradient-to-r from-orange-400/40 via-amber-400/30 to-orange-500/40" />
              <div className="absolute inset-0 rounded-t-3xl bg-gradient-to-r from-orange-500/10 via-transparent to-amber-400/10" />

              <button
                type="button"
                onClick={onClose}
                aria-label="Close dialog"
                className="group absolute right-6 top-6 z-20 h-12 w-12 rounded-full bg-white/10 backdrop-blur-xl ring-2 ring-white/30 hover:bg-white/20 flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-105"
              >
                <motion.span
                  className="h-8 w-8 rounded-full bg-gradient-to-br from-zinc-100/80 to-white/60 shadow-inner flex items-center justify-center"
                  whileHover={{ rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 text-zinc-800/80" aria-hidden>
                    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </motion.span>
              </button>

              <header className="px-8 pt-8 pb-6">
                <motion.div
                  className="flex items-center gap-4 text-orange-300/90 mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <motion.span
                    className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-orange-400/20 ring-2 ring-orange-300/30"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <FaRocket className="h-3 w-3 text-orange-300" />
                  </motion.span>
                  <h1 className="text-2xl font-bold">Start Your Project</h1>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h2 className="text-xl font-semibold text-white/90 mb-2">Transform Your Vision Into Reality</h2>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Fill out the form below and our team will contact you within 24 hours to discuss your project requirements and provide a customized solution.
                  </p>
                </motion.div>
              </header>
            </motion.div>
            {/* Enhanced Project Form */}
            <motion.form
              onSubmit={handleSubmit}
              className="grid gap-6 p-4 sm:p-8 pb-20 sm:pb-8 overflow-y-auto"
              aria-labelledby="project-starting-title"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <input type="hidden" name="hp_field" value="" />

              <motion.div
                className="grid grid-cols-1 gap-6 md:grid-cols-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {/* Full Name */}
                <motion.div
                  className="flex flex-col group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <label className="mb-2 text-sm font-medium flex items-center gap-2" htmlFor="project-name">
                    <FaUser className="h-4 w-4 text-orange-400" />
                    Full Name <span className="text-orange-300">*</span>
                  </label>
                  <input
                    id="project-name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    type="text"
                    placeholder="Your full name"
                    className="h-12 rounded-xl border border-white/15 bg-white/5 px-4 text-sm placeholder:text-white/40 outline-none transition-all duration-200 focus:border-orange-300/50 focus:bg-white/10 focus:ring-2 focus:ring-orange-300/20 hover:border-white/20"
                    required
                    aria-required="true"
                  />
                </motion.div>

                {/* Email Address */}
                <motion.div
                  className="flex flex-col group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <label className="mb-2 text-sm font-medium flex items-center gap-2" htmlFor="project-email">
                    <FaEnvelope className="h-4 w-4 text-orange-400" />
                    Email Address <span className="text-orange-300">*</span>
                  </label>
                  <input
                    id="project-email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    type="email"
                    placeholder="you@email.com"
                    className="h-12 rounded-xl border border-white/15 bg-white/5 px-4 text-sm placeholder:text-white/40 outline-none transition-all duration-200 focus:border-orange-300/50 focus:bg-white/10 focus:ring-2 focus:ring-orange-300/20 hover:border-white/20"
                    required
                    aria-required="true"
                  />
                </motion.div>

                {/* Phone Number (Country Code + Phone) */}
                <motion.div
                  className="flex flex-col group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <label className="mb-2 text-sm font-medium flex items-center gap-2" htmlFor="project-phone">
                    <FaPhone className="h-4 w-4 text-orange-400" />
                    Phone Number <span className="text-orange-300">*</span>
                  </label>
                  <div className="flex gap-3 items-center">
                    <select
                      id="project-country-code"
                      aria-label="Country Code"
                      value={countryCode}
                      onChange={e => setCountryCode(e.target.value)}
                      className="h-12 w-32 rounded-xl border border-white/15 bg-white/5 px-3 text-sm outline-none transition-all duration-200 focus:border-orange-300/50 focus:bg-white/10 focus:ring-2 focus:ring-orange-300/20 hover:border-white/20"
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
                      className="h-12 flex-1 rounded-xl border border-white/15 bg-white/5 px-4 text-sm placeholder:text-white/40 outline-none transition-all duration-200 focus:border-orange-300/50 focus:bg-white/10 focus:ring-2 focus:ring-orange-300/20 hover:border-white/20"
                      aria-label="Phone Number"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      required
                    />
                  </div>
                  {phone && phone.length < 7 && (
                    <motion.span
                      className="text-red-400 text-xs mt-2 flex items-center gap-2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      <FaExclamationTriangle className="w-3 h-3" />
                      Please enter at least 7 digits
                    </motion.span>
                  )}
                </motion.div>

                {/* Organization */}
                <motion.div
                  className="flex flex-col group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <label className="mb-2 text-sm font-medium flex items-center gap-2" htmlFor="project-organization">
                    <FaBuilding className="h-4 w-4 text-orange-400" />
                    Company / Organization <span className="text-orange-300">*</span>
                  </label>
                  <input
                    id="project-organization"
                    value={organization}
                    onChange={e => setOrganization(e.target.value)}
                    type="text"
                    placeholder="Organization name"
                    className="h-12 rounded-xl border border-white/15 bg-white/5 px-4 text-sm placeholder:text-white/40 outline-none transition-all duration-200 focus:border-orange-300/50 focus:bg-white/10 focus:ring-2 focus:ring-orange-300/20 hover:border-white/20"
                    required
                    aria-required="true"
                  />
                </motion.div>

                {/* Project Type */}
                <motion.div
                  className="col-span-1 md:col-span-2 group"
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                >
                  <label className="mb-2 text-sm font-medium flex items-center gap-2" htmlFor="project-type">
                    <FaProjectDiagram className="h-4 w-4 text-orange-400" />
                    Project Type <span className="text-orange-300">*</span>
                  </label>
                  <select
                    id="project-type"
                    aria-label="Project Type"
                    value={projectType}
                    onChange={e => setProjectType(e.target.value)}
                    required
                    className="h-12 w-full rounded-xl border border-white/15 bg-white/5 px-4 text-sm outline-none transition-all duration-200 focus:border-orange-300/50 focus:bg-white/10 focus:ring-2 focus:ring-orange-300/20 hover:border-white/20"
                    aria-required="true"
                  >
                    <option value="">Select your project type...</option>
                    {['Commercial','Documentary','Music Video','Event Coverage','Corporate Film','Other'].map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </motion.div>

                {/* Budget */}
                <motion.div
                  className="group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <label className="mb-2 text-sm font-medium flex items-center gap-2" htmlFor="project-budget">
                    <FaDollarSign className="h-4 w-4 text-orange-400" />
                    Estimated Budget
                  </label>
                  <select
                    id="project-budget"
                    aria-label="Estimated Budget"
                    value={budget}
                    onChange={e => setBudget(e.target.value)}
                    className="h-12 w-full rounded-xl border border-white/15 bg-white/5 px-4 text-sm outline-none transition-all duration-200 focus:border-orange-300/50 focus:bg-white/10 focus:ring-2 focus:ring-orange-300/20 hover:border-white/20"
                  >
                    {['Under $5,000','$5,000 – $10,000','$10,000 – $25,000','$25,000 – $50,000','$50,000+'].map(b => <option key={b}>{b}</option>)}
                  </select>
                </motion.div>

                {/* Timeline */}
                <motion.div
                  className="group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <label className="mb-2 text-sm font-medium flex items-center gap-2" htmlFor="project-timeline">
                    <FaCalendarAlt className="h-4 w-4 text-orange-400" />
                    Project Timeline
                  </label>
                  <select
                    id="project-timeline"
                    aria-label="Project Timeline"
                    value={timeline}
                    onChange={e => setTimeline(e.target.value)}
                    className="h-12 w-full rounded-xl border border-white/15 bg-white/5 px-4 text-sm outline-none transition-all duration-200 focus:border-orange-300/50 focus:bg-white/10 focus:ring-2 focus:ring-orange-300/20 hover:border-white/20"
                  >
                    {['When do you need this completed?','ASAP','Within 1 month','2-3 months','3-6 months','6+ months','Timeline is flexible'].map(t => <option key={t}>{t}</option>)}
                  </select>
                </motion.div>

                {/* Description */}
                <motion.div
                  className="col-span-1 md:col-span-2 group"
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                >
                  <label className="mb-2 text-sm font-medium flex items-center gap-2" htmlFor="project-description">
                    <FaFileAlt className="h-4 w-4 text-orange-400" />
                    Project Description <span className="text-orange-300">*</span>
                  </label>
                  <textarea
                    id="project-description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    rows={6}
                    placeholder="Tell us about your vision, goals, and any specific requirements..."
                    className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm placeholder:text-white/40 outline-none transition-all duration-200 focus:border-orange-300/50 focus:bg-white/10 focus:ring-2 focus:ring-orange-300/20 hover:border-white/20 resize-none"
                    required
                    aria-required="true"
                  />
                </motion.div>

                {/* Consent Checkbox */}
                <motion.div
                  className="col-span-1 md:col-span-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <label className="flex items-start gap-3 text-sm group cursor-pointer" htmlFor="project-consent">
                    <input
                      id="project-consent"
                      type="checkbox"
                      checked={consent}
                      onChange={e => setConsent(e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-white/20 bg-white/5 text-orange-400 focus:ring-0 focus:ring-orange-300/50 transition-all duration-200"
                    />
                    <span className="text-white/80 leading-relaxed flex items-center gap-2">
                      <FaShieldAlt className="h-4 w-4 text-orange-400/70" />
                      I agree to be contacted about this project and understand that GoodAV will handle my information according to their privacy policy.
                    </span>
                  </label>
                </motion.div>
              </motion.div>
              {/* Submit & Feedback */}
              <motion.div
                className="mt-4 flex flex-col items-center justify-end gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <div className="w-full flex justify-end gap-4">
                  <motion.button
                    type="button"
                    onClick={onClose}
                    className="h-12 rounded-xl border border-white/15 bg-transparent px-6 text-sm text-white/90 transition-all duration-200 hover:bg-white/10 hover:border-white/20"
                    aria-label="Cancel and close"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Not Now
                  </motion.button>
                  <motion.button
                    type="submit"
                    className="group relative inline-flex h-12 items-center gap-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-400 px-6 text-sm font-bold text-black shadow-2xl hover:shadow-orange-500/25 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-400/50 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={submitting}
                    aria-label="Send Project Request"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Button glow effect */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-r from-orange-400 to-amber-300 opacity-0 group-hover:opacity-20 transition-opacity duration-200"
                    />

                    {submitting ? (
                      <motion.div
                        className="flex items-center gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <FaSpinner className="h-4 w-4 animate-spin" />
                        <span>Submitting...</span>
                      </motion.div>
                    ) : (
                      <>
                        <motion.span
                          className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-black/10"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-black/80" aria-hidden>
                            <path d="M2 21l20-9L2 3v6l14 3L2 15v6z" />
                          </svg>
                        </motion.span>
                        <span className="relative z-10">Send Project Request</span>

                        {/* Animated sparkles */}
                        <motion.div
                          className="absolute inset-0 pointer-events-none"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                        >
                          {[...Array(3)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute w-1 h-1 bg-white rounded-full"
                              style={{
                                left: `${30 + i * 20}%`,
                                top: `${20 + (i % 2) * 60}%`
                              }}
                              animate={{
                                scale: [0, 1, 0],
                                opacity: [0, 1, 0]
                              }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                delay: i * 0.2
                              }}
                            />
                          ))}
                        </motion.div>
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            </motion.form>
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

type PopupProps = {
  show: boolean;
  type: string | null;
  message: string;
  details?: string;
  onClose: () => void;
}

function Popup({ show, type, message, details, onClose }: PopupProps) {
  // Trap focus and prevent background interaction
  useEffect(() => {
    if (!show) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        e.preventDefault();
      }
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    // Enhanced body scroll prevention for mobile
    if (show) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
      document.body.classList.add('modal-open');
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
      document.body.classList.remove('modal-open');
    }
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
      document.body.classList.remove('modal-open');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [show, onClose]);

  if (!show || !type) return null;

  return createPortal(
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 pointer-events-auto outline-none"
          aria-modal="true"
          role="dialog"
          tabIndex={-1}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="bg-gradient-to-br from-gray-900 to-gray-800 w-full max-w-md mx-auto rounded-2xl shadow-2xl border border-gray-700 p-6 sm:p-8 relative overflow-hidden"
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            tabIndex={0}
          >
            {/* Background glow effect */}
            <div
              aria-hidden="true"
              className={`absolute inset-0 rounded-2xl ${
                type === 'success' ? 'bg-orange-500/10' :
                type === 'warning' ? 'bg-orange-500/10' :
                'bg-red-500/10'
              }`}
            />

            <motion.button
              onClick={onClose}
              aria-label="Close popup"
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200 z-10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaTimesCircle className="w-5 h-5" />
            </motion.button>

            <motion.div
              className="flex justify-center mb-6 relative z-10"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              {type === 'success' ? (
                <motion.div
                  className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center ring-4 ring-orange-400/20"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <FaCheckCircle className="text-orange-400 w-8 h-8" />
                </motion.div>
              ) : type === 'warning' ? (
                <motion.div
                  className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center ring-4 ring-orange-400/20"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <FaExclamationTriangle className="text-orange-400 w-8 h-8" />
                </motion.div>
              ) : (
                <motion.div
                  className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center ring-4 ring-red-400/20"
                  animate={{ x: [-2, 2, -2] }}
                  transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <FaTimesCircle className="text-red-400 w-8 h-8" />
                </motion.div>
              )}
            </motion.div>

            <motion.h3
              className={`text-xl text-center font-bold mb-3 relative z-10 ${
                type === 'success' ? 'text-orange-400' :
                type === 'warning' ? 'text-orange-400' :
                'text-red-400'
              }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              {message}
            </motion.h3>

            {details && (
              <motion.div
                className="text-gray-300 text-sm text-center mb-6 relative z-10"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <details className="mx-auto max-w-[28rem] text-left">
                  <summary className="cursor-pointer text-sm text-orange-300 hover:text-orange-200 transition-colors duration-200">
                    View Details
                  </summary>
                  <pre className="whitespace-pre-wrap text-xs text-gray-300 mt-3 p-3 bg-gray-800/50 rounded-lg border border-gray-700 overflow-auto max-h-32">
                    {details}
                  </pre>
                </details>
              </motion.div>
            )}

            <motion.div
              className="flex justify-center relative z-10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <motion.button
                onClick={onClose}
                aria-label={
                  type === 'success' ? 'Continue and close modal' :
                  type === 'warning' ? 'Acknowledge warning' :
                  'Try again'
                }
                className={`px-8 py-3 rounded-xl font-bold transition-all duration-200 ${
                  type === 'success'
                    ? 'bg-gradient-to-r from-orange-500 to-amber-400 text-black hover:from-orange-400 hover:to-amber-300 shadow-lg hover:shadow-orange-500/25'
                    : type === 'warning'
                    ? 'bg-gradient-to-r from-orange-500 to-amber-400 text-black hover:from-orange-400 hover:to-amber-300 shadow-lg hover:shadow-orange-500/25'
                    : 'bg-gradient-to-r from-red-500 to-red-400 text-white hover:from-red-400 hover:to-red-300 shadow-lg hover:shadow-red-500/25'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {type === 'success' ? 'Continue' : type === 'warning' ? 'Understood' : 'Try Again'}
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
