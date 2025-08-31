import React, { useEffect, useRef } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { FaCheckCircle, FaTimesCircle, FaExclamationTriangle, FaCircle } from 'react-icons/fa';

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function ProjectStartingModal({ open, onClose }: Props) {
  // Form state (controlled inputs) - follow BookingModal best practices
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

  // Comprehensive list of country codes (copied from BookingModal for parity)
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

  const [submitStatus, setSubmitStatus] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);
  const [showPopup, setShowPopup] = React.useState(false);
  const [popupType, setPopupType] = React.useState<'success' | 'error' | 'warning' | null>(null);
  const [popupMessage, setPopupMessage] = React.useState('');
  const [popupDetails, setPopupDetails] = React.useState('');

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
    const handler = (e: Event) => {
      const ke = e as KeyboardEvent;
      if (ke.key !== 'Tab') return;
      if (ke.shiftKey && document.activeElement === first) {
        ke.preventDefault();
        (last || first).focus();
      } else if (!ke.shiftKey && document.activeElement === last) {
        ke.preventDefault();
        (first || last).focus();
      }
    };
    first?.focus();
    el.addEventListener('keydown', handler);
    return () => el.removeEventListener('keydown', handler);
  }, [open]);

  // Validate the form and return an array of error messages
  function validateForm() {
    const errors: string[] = [];
    if (!name.trim()) errors.push('Full name is required');
    if (!email.trim()) errors.push('Email address is required');
    if (!organization.trim()) errors.push('Organization is required');
    if (!projectType.trim()) errors.push('Please select a project type');
    if (!description.trim()) errors.push('Project description is required');
    if (!consent) errors.push('Please agree to be contacted');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) errors.push('Please enter a valid email address');

    if (phone && phone.replace(/\D/g, '').length < 7) {
      errors.push('Please enter a valid phone number (at least 7 digits)');
    }

    return errors;
  }

  // Show popup helper (success / error / warning)
  const showNotificationPopup = (type: 'success' | 'error' | 'warning', message: string, details = '') => {
    setPopupType(type);
    setPopupMessage(message);
    setPopupDetails(details);
    setShowPopup(true);
  };

  // Handle form submission with validation, API call, and UX feedback
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Honeypot check
    const hp = (e.currentTarget as HTMLFormElement).querySelector<HTMLInputElement>('input[name="hp_field"]')?.value;
    if (hp) {
      // Likely spam — silently ignore but log
      console.warn('Honeypot triggered');
      return;
    }

    const errors = validateForm();
    if (errors.length > 0) {
      setSubmitStatus(`${errors.join('. ')}.`);
      showNotificationPopup('error', 'Please complete required fields', errors.join('\n'));
      return;
    }

    setSubmitting(true);
    setSubmitStatus('Submitting your project request...');

    const payload = {
      name: name.trim(),
      email: email.trim(),
  phone: phone ? `${countryCode}${phone.replace(/\D/g, '')}` : '',
      organization: organization.trim(),
      projectType,
      budget,
      timeline,
      description: description.trim(),
    };

    try {
      // Replace the endpoint with your real API endpoint. Keep a short timeout for UX.
      const response = await fetch('/process_project.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => ({}));

      if (response.ok && (result.success === true || result.success === undefined)) {
        // success
        setSubmitStatus('Your project request was submitted successfully! We will contact you soon.');
        showNotificationPopup('success', 'Request Submitted', `Thank you — we received your request. Booking ID: ${result.id ?? 'N/A'}`);

  // Reset form after success
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
      } else {
        const err = result.error || 'Submission failed. Please try again.';
        setSubmitStatus(err);
        showNotificationPopup('error', 'Submission Failed', err + (result.warning_details ? `\n${result.warning_details}` : ''));
      }
    } catch (error: unknown) {
      console.error('Submission error', error);
      setSubmitStatus('Network or server error. Please try again.');
      showNotificationPopup('error', 'Network Error', 'Please check your internet connection and try again.');
    } finally {
      setSubmitting(false);
    }
  }

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

            {/* Inline submit status */}
            {submitStatus && (
              <div className="mt-3 text-orange-400 text-sm text-center">
                {submitStatus}
                {submitStatus.includes('successfully') && (<div className="mt-1 text-orange-300">Thank you — you will receive a confirmation email shortly.</div>)}
                {submitStatus.includes('failed') && (<div className="mt-1 text-orange-300">If the problem persists, contact us at form@goodav.net</div>)}
              </div>
            )}
          </div>
        </form>
        </Dialog.Content>
        </Dialog.Portal>
        {/* Inline popup for success / error messages */}
        <Popup show={showPopup} type={popupType} message={popupMessage} details={popupDetails} onClose={() => setShowPopup(false)} />
      </Dialog.Root>
  );
}

// Success / Error popup (global to this component)
function Popup({ show, type, message, details, onClose }: { show: boolean; type: 'success' | 'error' | 'warning' | null; message: string; details?: string; onClose: () => void }) {
  if (!show || !type) return null;
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-[#1b1b1d] w-full max-w-md mx-auto rounded-xl shadow-2xl border border-gray-700 p-4 sm:p-6 relative">
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
          <button onClick={onClose} className={`px-6 py-3 rounded-lg font-medium ${type === 'success' ? 'bg-orange-600 hover:bg-orange-700 text-white' : type === 'warning' ? 'bg-orange-600 hover:bg-orange-700 text-white' : 'bg-red-600 hover:bg-red-700 text-white'}`}>{type === 'success' ? 'Continue' : type === 'warning' ? 'Understood' : 'Try Again'}</button>
        </div>
      </div>
    </div>
  );
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
