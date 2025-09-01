import React, { useEffect, useRef, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { FaCheckCircle, FaTimesCircle, FaExclamationTriangle } from 'react-icons/fa';

// Comprehensive country code list (copied from BookingModal)
const countryCodes = [
  { code: "+1", name: "United States" },
  { code: "+1", name: "Canada" },
  { code: "+7", name: "Russia" },
  { code: "+20", name: "Egypt" },
  { code: "+27", name: "South Africa" },
  { code: "+30", name: "Greece" },
  { code: "+31", name: "Netherlands" },
  { code: "+32", name: "Belgium" },
  { code: "+33", name: "France" },
  { code: "+34", name: "Spain" },
  { code: "+36", name: "Hungary" },
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
  { code: "+54", name: "Argentina" },
  { code: "+55", name: "Brazil" },
  { code: "+56", name: "Chile" },
  { code: "+57", name: "Colombia" },
  { code: "+58", name: "Venezuela" },
  { code: "+60", name: "Malaysia" },
  { code: "+61", name: "Australia" },
  { code: "+62", name: "Indonesia" },
  { code: "+63", name: "Philippines" },
  { code: "+64", name: "New Zealand" },
  { code: "+65", name: "Singapore" },
  { code: "+66", name: "Thailand" },
  { code: "+81", name: "Japan" },
  { code: "+82", name: "South Korea" },
  { code: "+84", name: "Vietnam" },
  { code: "+86", name: "China" },
  { code: "+90", name: "Turkey" },
  { code: "+91", name: "India" },
  { code: "+92", name: "Pakistan" },
  { code: "+93", name: "Afghanistan" },
  { code: "+94", name: "Sri Lanka" },
  { code: "+95", name: "Myanmar" },
  { code: "+98", name: "Iran" },
  { code: "+212", name: "Morocco" },
  { code: "+213", name: "Algeria" },
  { code: "+216", name: "Tunisia" },
  { code: "+218", name: "Libya" },
  { code: "+220", name: "Gambia" },
  { code: "+221", name: "Senegal" },
  { code: "+222", name: "Mauritania" },
  { code: "+223", name: "Mali" },
  { code: "+224", name: "Guinea" },
  { code: "+225", name: "Ivory Coast" },
  { code: "+226", name: "Burkina Faso" },
  { code: "+227", name: "Niger" },
  { code: "+228", name: "Togo" },
  { code: "+229", name: "Benin" },
  { code: "+230", name: "Mauritius" },
  { code: "+231", name: "Liberia" },
  { code: "+232", name: "Sierra Leone" },
  { code: "+233", name: "Ghana" },
  { code: "+234", name: "Nigeria" },
  { code: "+235", name: "Chad" },
  { code: "+236", name: "Central African Republic" },
  { code: "+237", name: "Cameroon" },
  { code: "+238", name: "Cape Verde" },
  { code: "+239", name: "Sao Tome and Principe" },
  { code: "+240", name: "Equatorial Guinea" },
  { code: "+241", name: "Gabon" },
  { code: "+242", name: "Republic of the Congo" },
  { code: "+243", name: "Democratic Republic of the Congo" },
  { code: "+244", name: "Angola" },
  { code: "+245", name: "Guinea-Bissau" },
  { code: "+246", name: "British Indian Ocean Territory" },
  { code: "+247", name: "Ascension Island" },
  { code: "+248", name: "Seychelles" },
  { code: "+249", name: "Sudan" },
  { code: "+250", name: "Rwanda" },
  { code: "+251", name: "Ethiopia" },
  { code: "+252", name: "Somalia" },
  { code: "+253", name: "Djibouti" },
  { code: "+254", name: "Kenya" },
  { code: "+255", name: "Tanzania" },
  { code: "+256", name: "Uganda" },
  { code: "+257", name: "Burundi" },
  { code: "+258", name: "Mozambique" },
  { code: "+260", name: "Zambia" },
  { code: "+261", name: "Madagascar" },
  { code: "+262", name: "Reunion" },
  { code: "+263", name: "Zimbabwe" },
  { code: "+264", name: "Namibia" },
  { code: "+265", name: "Malawi" },
  { code: "+266", name: "Lesotho" },
  { code: "+267", name: "Botswana" },
  { code: "+268", name: "Eswatini" },
  { code: "+269", name: "Comoros" },
  { code: "+290", name: "Saint Helena" },
  { code: "+291", name: "Eritrea" },
  { code: "+297", name: "Aruba" },
  { code: "+298", name: "Faroe Islands" },
  { code: "+299", name: "Greenland" },
  { code: "+350", name: "Gibraltar" },
  { code: "+351", name: "Portugal" },
  { code: "+352", name: "Luxembourg" },
  { code: "+353", name: "Ireland" },
  { code: "+354", name: "Iceland" },
  { code: "+355", name: "Albania" },
  { code: "+356", name: "Malta" },
  { code: "+357", name: "Cyprus" },
  { code: "+358", name: "Finland" },
  { code: "+359", name: "Bulgaria" },
  { code: "+370", name: "Lithuania" },
  { code: "+371", name: "Latvia" },
  { code: "+372", name: "Estonia" },
  { code: "+373", name: "Moldova" },
  { code: "+374", name: "Armenia" },
  { code: "+375", name: "Belarus" },
  { code: "+376", name: "Andorra" },
  { code: "+377", name: "Monaco" },
  { code: "+378", name: "San Marino" },
  { code: "+380", name: "Ukraine" },
  { code: "+381", name: "Serbia" },
  { code: "+382", name: "Montenegro" },
  { code: "+383", name: "Kosovo" },
  { code: "+385", name: "Croatia" },
  { code: "+386", name: "Slovenia" },
  { code: "+387", name: "Bosnia and Herzegovina" },
  { code: "+389", name: "North Macedonia" },
  { code: "+420", name: "Czech Republic" },
  { code: "+421", name: "Slovakia" },
  { code: "+423", name: "Liechtenstein" },
  { code: "+500", name: "Falkland Islands" },
  { code: "+501", name: "Belize" },
  { code: "+502", name: "Guatemala" },
  { code: "+503", name: "El Salvador" },
  { code: "+504", name: "Honduras" },
  { code: "+505", name: "Nicaragua" },
  { code: "+506", name: "Costa Rica" },
  { code: "+507", name: "Panama" },
  { code: "+508", name: "Saint Pierre and Miquelon" },
  { code: "+509", name: "Haiti" },
  { code: "+590", name: "Guadeloupe" },
  { code: "+591", name: "Bolivia" },
  { code: "+592", name: "Guyana" },
  { code: "+593", name: "Ecuador" },
  { code: "+594", name: "French Guiana" },
  { code: "+595", name: "Paraguay" },
  { code: "+596", name: "Martinique" },
  { code: "+597", name: "Suriname" },
  { code: "+598", name: "Uruguay" },
  { code: "+599", name: "Curacao" },
  { code: "+670", name: "East Timor" },
  { code: "+672", name: "Antarctica" },
  { code: "+673", name: "Brunei" },
  { code: "+674", name: "Nauru" },
  { code: "+675", name: "Papua New Guinea" },
  { code: "+676", name: "Tonga" },
  { code: "+677", name: "Solomon Islands" },
  { code: "+678", name: "Vanuatu" },
  { code: "+679", name: "Fiji" },
  { code: "+680", name: "Palau" },
  { code: "+681", name: "Wallis and Futuna" },
  { code: "+682", name: "Cook Islands" },
  { code: "+683", name: "Niue" },
  { code: "+684", name: "American Samoa" },
  { code: "+685", name: "Samoa" },
  { code: "+686", name: "Kiribati" },
  { code: "+687", name: "New Caledonia" },
  { code: "+688", name: "Tuvalu" },
  { code: "+689", name: "French Polynesia" },
  { code: "+690", name: "Tokelau" },
  { code: "+691", name: "Micronesia" },
  { code: "+692", name: "Marshall Islands" },
  { code: "+850", name: "North Korea" },
  { code: "+852", name: "Hong Kong" },
  { code: "+853", name: "Macau" },
  { code: "+855", name: "Cambodia" },
  { code: "+856", name: "Laos" },
  { code: "+880", name: "Bangladesh" },
  { code: "+886", name: "Taiwan" },
  { code: "+960", name: "Maldives" },
  { code: "+961", name: "Lebanon" },
  { code: "+962", name: "Jordan" },
  { code: "+963", name: "Syria" },
  { code: "+964", name: "Iraq" },
  { code: "+965", name: "Kuwait" },
  { code: "+966", name: "Saudi Arabia" },
  { code: "+967", name: "Yemen" },
  { code: "+968", name: "Oman" },
  { code: "+970", name: "Palestine" },
  { code: "+971", name: "United Arab Emirates" },
  { code: "+972", name: "Israel" },
  { code: "+973", name: "Bahrain" },
  { code: "+974", name: "Qatar" },
  { code: "+975", name: "Bhutan" },
  { code: "+976", name: "Mongolia" },
  { code: "+977", name: "Nepal" },
  { code: "+992", name: "Tajikistan" },
  { code: "+993", name: "Turkmenistan" },
  { code: "+994", name: "Azerbaijan" },
  { code: "+995", name: "Georgia" },
  { code: "+996", name: "Kyrgyzstan" },
  { code: "+998", name: "Uzbekistan" }
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

  // --- Validation ---
  function validateForm() {
    const errors = [];
    if (!name.trim()) errors.push('Full name is required');
    if (!email.trim()) errors.push('Email address is required');
    if (!organization.trim()) errors.push('Organization is required');
    if (!projectType.trim()) errors.push('Project type is required');
    if (!description.trim()) errors.push('Project description is required');
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) errors.push('Please enter a valid email address');
    // Phone validation (optional but if provided, should be valid)
    if (phone && phone.length < 7) {
      errors.push('Please enter a valid phone number (at least 7 digits)');
    }
    return errors;
  }

  // --- Feedback Popup ---
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

  // --- Backend Integration ---
  async function handleSubmit(e) {
    e.preventDefault();
    const errors = validateForm();
    if (errors.length > 0) {
      setSubmitStatus(errors.join('. '));
      showNotificationPopup('error', 'Please Complete Required Fields', errors.join('. '));
      return;
    }
    setSubmitting(true);
    setSubmitStatus('Submitting your project...');
    const projectData = {
      name: name.trim(),
      email: email.trim(),
      phone: phone ? `${countryCode}${phone}` : '',
      organization: organization.trim(),
      projectType: projectType.trim(),
      budget,
      timeline,
      description: description.trim(),
      consent,
      type: 'project',
    };
    try {
      const response = await fetch('/process_project.php', {
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
      <Dialog.Root open={open} onOpenChange={isOpen => !isOpen && onClose()}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
          <Dialog.Content ref={dialogRef} className="fixed left-1/2 top-1/2 z-50 w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/15 bg-white/5 shadow-xl backdrop-blur-xl p-0" aria-modal="true" role="dialog">
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
                {/* Phone Number with Country Code */}
                <div className="flex gap-2">
                  <label className="sr-only" htmlFor="project-country-code">Country Code</label>
                  <select id="project-country-code" aria-label="Country Code" value={countryCode} onChange={e => setCountryCode(e.target.value)} className="h-11 rounded-lg border border-white/15 bg-white/5 px-2 text-sm outline-none transition focus:border-orange-300/40 focus:bg-white/10">
                    {countryCodes.map((c, i) => (<option key={`${c.code}-${i}`} value={c.code}>{c.code} {c.name}</option>))}
                  </select>
                  <label className="sr-only" htmlFor="project-phone">Phone Number</label>
                  <input id="project-phone" value={phone} onChange={e => setPhone(e.target.value.replace(/\D/g, ''))} type="tel" placeholder="123456789" className="h-11 rounded-lg border border-white/15 bg-white/5 px-3 text-sm placeholder:text-white/40 outline-none transition focus:border-orange-300/40 focus:bg-white/10 flex-1" aria-label="Phone Number" />
                </div>
                {/* Phone Validation Feedback */}
                {phone && phone.length < 7 && (<div className="text-red-400 text-xs mt-2 flex items-center gap-2"><FaExclamationTriangle className="w-3 h-3" />Please enter at least 7 digits</div>)}
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
                {/* Feedback message */}
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
      {/* Feedback Popup */}
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
  const handlePopupClose = () => {
    setTimeout(() => {
      onClose();
    }, 100);
  };
  // Centered popup (same as BookingModal)
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
