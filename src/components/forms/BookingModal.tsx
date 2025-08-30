import { useEffect, useState } from "react";
import {
  Video,
  Camera,
  Film,
  Radio,
  Briefcase,
  Users,
  Clock,
  Calendar,
  DollarSign,
  Star,
  Layers,
  PenTool,
  Share2,
  Settings,
  User,
  Building,
} from "lucide-react"; // install via: npm install lucide-react
import * as Tooltip from "@radix-ui/react-tooltip";

export default function BookingModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState(1);
  const [modalOpen, setModalOpen] = useState(isOpen);
  // Validation state for Step 1
  const [canProceed, setCanProceed] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+250"); // Rwanda default
  const [organization, setOrganization] = useState("");
  const [project, setProject] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [timezone, setTimezone] = useState('Africa/Kigali');
  const [meetingSoftware, setMeetingSoftware] = useState("Zoom"); // New state for meeting software
  const [submitStatus, setSubmitStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState(null);
  const [timeSlotConfirmed, setTimeSlotConfirmed] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState<'success' | 'error' | 'warning' | null>(null);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupDetails, setPopupDetails] = useState('');

  // Comprehensive list of country codes
  const countryCodes = [
    { code: "+1", name: "United States", flag: "🇺🇸" },
    { code: "+1", name: "Canada", flag: "🇨🇦" },
    { code: "+7", name: "Russia", flag: "🇷🇺" },
    { code: "+20", name: "Egypt", flag: "🇪🇬" },
    { code: "+27", name: "South Africa", flag: "🇿🇦" },
    { code: "+30", name: "Greece", flag: "🇬🇷" },
    { code: "+31", name: "Netherlands", flag: "🇳🇱" },
    { code: "+32", name: "Belgium", flag: "🇧🇪" },
    { code: "+33", name: "France", flag: "🇫🇷" },
    { code: "+34", name: "Spain", flag: "🇪🇸" },
    { code: "+36", name: "Hungary", flag: "🇭🇺" },
    { code: "+39", name: "Italy", flag: "🇮🇹" },
    { code: "+40", name: "Romania", flag: "🇷🇴" },
    { code: "+41", name: "Switzerland", flag: "🇨🇭" },
    { code: "+43", name: "Austria", flag: "🇦🇹" },
    { code: "+44", name: "United Kingdom", flag: "🇬🇧" },
    { code: "+45", name: "Denmark", flag: "🇩🇰" },
    { code: "+46", name: "Sweden", flag: "🇸🇪" },
    { code: "+47", name: "Norway", flag: "🇳🇴" },
    { code: "+48", name: "Poland", flag: "🇵🇱" },
    { code: "+49", name: "Germany", flag: "🇩🇪" },
    { code: "+51", name: "Peru", flag: "🇵🇪" },
    { code: "+52", name: "Mexico", flag: "🇲🇽" },
    { code: "+53", name: "Cuba", flag: "🇨🇺" },
    { code: "+54", name: "Argentina", flag: "🇦🇷" },
    { code: "+55", name: "Brazil", flag: "🇧🇷" },
    { code: "+56", name: "Chile", flag: "🇨🇱" },
    { code: "+57", name: "Colombia", flag: "🇨🇴" },
    { code: "+58", name: "Venezuela", flag: "🇻🇪" },
    { code: "+60", name: "Malaysia", flag: "🇲🇾" },
    { code: "+61", name: "Australia", flag: "🇦🇺" },
    { code: "+62", name: "Indonesia", flag: "🇮🇩" },
    { code: "+63", name: "Philippines", flag: "🇵🇭" },
    { code: "+64", name: "New Zealand", flag: "🇳🇿" },
    { code: "+65", name: "Singapore", flag: "🇸🇬" },
    { code: "+66", name: "Thailand", flag: "🇹🇭" },
    { code: "+81", name: "Japan", flag: "🇯🇵" },
    { code: "+82", name: "South Korea", flag: "🇰🇷" },
    { code: "+84", name: "Vietnam", flag: "🇻🇳" },
    { code: "+86", name: "China", flag: "🇨🇳" },
    { code: "+90", name: "Turkey", flag: "🇹🇷" },
    { code: "+91", name: "India", flag: "🇮🇳" },
    { code: "+92", name: "Pakistan", flag: "🇵🇰" },
    { code: "+93", name: "Afghanistan", flag: "🇦🇫" },
    { code: "+94", name: "Sri Lanka", flag: "🇱🇰" },
    { code: "+95", name: "Myanmar", flag: "🇲🇲" },
    { code: "+98", name: "Iran", flag: "🇮🇷" },
    { code: "+212", name: "Morocco", flag: "🇲🇦" },
    { code: "+213", name: "Algeria", flag: "🇩🇿" },
    { code: "+216", name: "Tunisia", flag: "🇹🇳" },
    { code: "+218", name: "Libya", flag: "🇱🇾" },
    { code: "+220", name: "Gambia", flag: "🇬🇲" },
    { code: "+221", name: "Senegal", flag: "🇸🇳" },
    { code: "+222", name: "Mauritania", flag: "🇲🇷" },
    { code: "+223", name: "Mali", flag: "🇲🇱" },
    { code: "+224", name: "Guinea", flag: "🇬🇳" },
    { code: "+225", name: "Ivory Coast", flag: "🇨🇮" },
    { code: "+226", name: "Burkina Faso", flag: "🇧🇫" },
    { code: "+227", name: "Niger", flag: "🇳🇪" },
    { code: "+228", name: "Togo", flag: "🇹🇬" },
    { code: "+229", name: "Benin", flag: "🇧🇯" },
    { code: "+230", name: "Mauritius", flag: "🇲🇺" },
    { code: "+231", name: "Liberia", flag: "🇱🇷" },
    { code: "+232", name: "Sierra Leone", flag: "🇸🇱" },
    { code: "+233", name: "Ghana", flag: "🇬🇭" },
    { code: "+234", name: "Nigeria", flag: "🇳🇬" },
    { code: "+235", name: "Chad", flag: "🇹🇩" },
    { code: "+236", name: "Central African Republic", flag: "🇨🇫" },
    { code: "+237", name: "Cameroon", flag: "🇨🇲" },
    { code: "+238", name: "Cape Verde", flag: "🇨🇻" },
    { code: "+239", name: "São Tomé and Príncipe", flag: "🇸🇹" },
    { code: "+240", name: "Equatorial Guinea", flag: "🇬🇶" },
    { code: "+241", name: "Gabon", flag: "🇬🇦" },
    { code: "+242", name: "Republic of the Congo", flag: "🇨🇬" },
    { code: "+243", name: "Democratic Republic of the Congo", flag: "🇨🇩" },
    { code: "+244", name: "Angola", flag: "🇦🇴" },
    { code: "+245", name: "Guinea-Bissau", flag: "🇬🇼" },
    { code: "+246", name: "British Indian Ocean Territory", flag: "🇮🇴" },
    { code: "+247", name: "Ascension Island", flag: "🇦🇨" },
    { code: "+248", name: "Seychelles", flag: "🇸🇨" },
    { code: "+249", name: "Sudan", flag: "🇸🇩" },
    { code: "+250", name: "Rwanda", flag: "🇷🇼" },
    { code: "+251", name: "Ethiopia", flag: "🇪🇹" },
    { code: "+252", name: "Somalia", flag: "🇸🇴" },
    { code: "+253", name: "Djibouti", flag: "🇩🇯" },
    { code: "+254", name: "Kenya", flag: "🇰🇪" },
    { code: "+255", name: "Tanzania", flag: "🇹🇿" },
    { code: "+256", name: "Uganda", flag: "🇺🇬" },
    { code: "+257", name: "Burundi", flag: "🇧🇮" },
    { code: "+258", name: "Mozambique", flag: "🇲🇿" },
    { code: "+260", name: "Zambia", flag: "🇿🇲" },
    { code: "+261", name: "Madagascar", flag: "🇲🇬" },
    { code: "+262", name: "Réunion", flag: "🇷🇪" },
    { code: "+263", name: "Zimbabwe", flag: "🇿🇼" },
    { code: "+264", name: "Namibia", flag: "🇳🇦" },
    { code: "+265", name: "Malawi", flag: "🇲🇼" },
    { code: "+266", name: "Lesotho", flag: "🇱🇸" },
    { code: "+267", name: "Botswana", flag: "🇧🇼" },
    { code: "+268", name: "Eswatini", flag: "🇸🇿" },
    { code: "+269", name: "Comoros", flag: "🇰🇲" },
    { code: "+290", name: "Saint Helena", flag: "🇸🇭" },
    { code: "+291", name: "Eritrea", flag: "🇪🇷" },
    { code: "+297", name: "Aruba", flag: "🇦🇼" },
    { code: "+298", name: "Faroe Islands", flag: "🇫🇴" },
    { code: "+299", name: "Greenland", flag: "🇬🇱" },
    { code: "+350", name: "Gibraltar", flag: "🇬🇮" },
    { code: "+351", name: "Portugal", flag: "🇵🇹" },
    { code: "+352", name: "Luxembourg", flag: "🇱🇺" },
    { code: "+353", name: "Ireland", flag: "🇮🇪" },
    { code: "+354", name: "Iceland", flag: "🇮🇸" },
    { code: "+355", name: "Albania", flag: "🇦🇱" },
    { code: "+356", name: "Malta", flag: "🇲🇹" },
    { code: "+357", name: "Cyprus", flag: "🇨🇾" },
    { code: "+358", name: "Finland", flag: "🇫🇮" },
    { code: "+359", name: "Bulgaria", flag: "🇧🇬" },
    { code: "+370", name: "Lithuania", flag: "🇱🇹" },
    { code: "+371", name: "Latvia", flag: "🇱🇻" },
    { code: "+372", name: "Estonia", flag: "🇪🇪" },
    { code: "+373", name: "Moldova", flag: "🇲🇩" },
    { code: "+374", name: "Armenia", flag: "🇦🇲" },
    { code: "+375", name: "Belarus", flag: "🇧🇾" },
    { code: "+376", name: "Andorra", flag: "🇦🇩" },
    { code: "+377", name: "Monaco", flag: "🇲🇨" },
    { code: "+378", name: "San Marino", flag: "🇸🇲" },
    { code: "+380", name: "Ukraine", flag: "🇺🇦" },
    { code: "+381", name: "Serbia", flag: "🇷🇸" },
    { code: "+382", name: "Montenegro", flag: "🇲🇪" },
    { code: "+383", name: "Kosovo", flag: "🇽🇰" },
    { code: "+385", name: "Croatia", flag: "🇭🇷" },
    { code: "+386", name: "Slovenia", flag: "🇸🇮" },
    { code: "+387", name: "Bosnia and Herzegovina", flag: "🇧🇦" },
    { code: "+389", name: "North Macedonia", flag: "🇲🇰" },
    { code: "+420", name: "Czech Republic", flag: "🇨🇿" },
    { code: "+421", name: "Slovakia", flag: "🇸🇰" },
    { code: "+423", name: "Liechtenstein", flag: "🇱🇮" },
    { code: "+500", name: "Falkland Islands", flag: "🇫🇰" },
    { code: "+501", name: "Belize", flag: "🇧🇿" },
    { code: "+502", name: "Guatemala", flag: "🇬🇹" },
    { code: "+503", name: "El Salvador", flag: "🇸🇻" },
    { code: "+504", name: "Honduras", flag: "🇭🇳" },
    { code: "+505", name: "Nicaragua", flag: "🇳🇮" },
    { code: "+506", name: "Costa Rica", flag: "🇨🇷" },
    { code: "+507", name: "Panama", flag: "🇵🇦" },
    { code: "+508", name: "Saint Pierre and Miquelon", flag: "🇵🇲" },
    { code: "+509", name: "Haiti", flag: "🇭🇹" },
    { code: "+590", name: "Guadeloupe", flag: "🇬🇵" },
    { code: "+591", name: "Bolivia", flag: "🇧🇴" },
    { code: "+592", name: "Guyana", flag: "🇬🇾" },
    { code: "+593", name: "Ecuador", flag: "🇪🇨" },
    { code: "+594", name: "French Guiana", flag: "🇬🇫" },
    { code: "+595", name: "Paraguay", flag: "🇵🇾" },
    { code: "+596", name: "Martinique", flag: "🇲🇶" },
    { code: "+597", name: "Suriname", flag: "🇸🇷" },
    { code: "+598", name: "Uruguay", flag: "🇺🇾" },
    { code: "+599", name: "Curaçao", flag: "🇨🇼" },
    { code: "+670", name: "East Timor", flag: "🇹🇱" },
    { code: "+672", name: "Antarctica", flag: "🇦🇶" },
    { code: "+673", name: "Brunei", flag: "🇧🇳" },
    { code: "+674", name: "Nauru", flag: "🇳🇷" },
    { code: "+675", name: "Papua New Guinea", flag: "🇵🇬" },
    { code: "+676", name: "Tonga", flag: "🇹🇴" },
    { code: "+677", name: "Solomon Islands", flag: "🇸🇧" },
    { code: "+678", name: "Vanuatu", flag: "🇻🇺" },
    { code: "+679", name: "Fiji", flag: "🇫🇯" },
    { code: "+680", name: "Palau", flag: "🇵🇼" },
    { code: "+681", name: "Wallis and Futuna", flag: "🇼🇫" },
    { code: "+682", name: "Cook Islands", flag: "🇨🇰" },
    { code: "+683", name: "Niue", flag: "🇳🇺" },
    { code: "+684", name: "American Samoa", flag: "🇦🇸" },
    { code: "+685", name: "Samoa", flag: "🇼🇸" },
    { code: "+686", name: "Kiribati", flag: "🇰🇮" },
    { code: "+687", name: "New Caledonia", flag: "🇳🇨" },
    { code: "+688", name: "Tuvalu", flag: "🇹🇻" },
    { code: "+689", name: "French Polynesia", flag: "🇵🇫" },
    { code: "+690", name: "Tokelau", flag: "🇹🇰" },
    { code: "+691", name: "Micronesia", flag: "🇫🇲" },
    { code: "+692", name: "Marshall Islands", flag: "🇲🇭" },
    { code: "+850", name: "North Korea", flag: "🇰🇵" },
    { code: "+852", name: "Hong Kong", flag: "🇭🇰" },
    { code: "+853", name: "Macau", flag: "🇲🇴" },
    { code: "+855", name: "Cambodia", flag: "🇰🇭" },
    { code: "+856", name: "Laos", flag: "🇱🇦" },
    { code: "+880", name: "Bangladesh", flag: "🇧🇩" },
    { code: "+886", name: "Taiwan", flag: "🇹🇼" },
    { code: "+960", name: "Maldives", flag: "🇲🇻" },
    { code: "+961", name: "Lebanon", flag: "🇱🇧" },
    { code: "+962", name: "Jordan", flag: "🇯🇴" },
    { code: "+963", name: "Syria", flag: "🇸🇾" },
    { code: "+964", name: "Iraq", flag: "🇮🇶" },
    { code: "+965", name: "Kuwait", flag: "🇰🇼" },
    { code: "+966", name: "Saudi Arabia", flag: "🇸🇦" },
    { code: "+967", name: "Yemen", flag: "🇾🇪" },
    { code: "+968", name: "Oman", flag: "🇴🇲" },
    { code: "+970", name: "Palestine", flag: "🇵🇸" },
    { code: "+971", name: "United Arab Emirates", flag: "🇦🇪" },
    { code: "+972", name: "Israel", flag: "🇮🇱" },
    { code: "+973", name: "Bahrain", flag: "🇧🇭" },
    { code: "+974", name: "Qatar", flag: "🇶🇦" },
    { code: "+975", name: "Bhutan", flag: "🇧🇹" },
    { code: "+976", name: "Mongolia", flag: "🇲🇳" },
    { code: "+977", name: "Nepal", flag: "🇳🇵" },
    { code: "+992", name: "Tajikistan", flag: "🇹🇯" },
    { code: "+993", name: "Turkmenistan", flag: "🇹🇲" },
    { code: "+994", name: "Azerbaijan", flag: "🇦🇿" },
    { code: "+995", name: "Georgia", flag: "🇬🇪" },
    { code: "+996", name: "Kyrgyzstan", flag: "🇰🇬" },
    { code: "+998", name: "Uzbekistan", flag: "🇺🇿" }
  ];

  const nextStep = () => setStep((s) => Math.min(s + 1, 8));
  const prevStep = () => {
    setStep((s) => Math.max(s - 1, 1));
    // Clear submit status when navigating back
    if (submitStatus) {
      setSubmitStatus('');
    }
  };

  // Validation function
  const validateForm = () => {
    const errors = [];

    // Required fields validation
    if (!name.trim()) errors.push('Full name is required');
    if (!email.trim()) errors.push('Email address is required');
    if (!organization.trim()) errors.push('Organization is required');
    if (!project.trim()) errors.push('Project description is required');
    if (!selectedDate) errors.push('Please select a date');
    if (!selectedTime) errors.push('Please select a time slot');

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) errors.push('Please enter a valid email address');

    // Phone validation (optional but if provided, should be valid)
    if (phone && phone.length < 7) {
      errors.push('Please enter a valid phone number (at least 7 digits)');
    }

    return errors;
  };

  // Check if form is valid for button state
  const isFormValid = () => {
    return validateForm().length === 0;
  };

  useEffect(() => {
    setModalOpen(isOpen);
    if (isOpen) {
      setStep(1);
      // Clear any previous submit status when modal opens
      setSubmitStatus('');
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleClose = () => {
    setModalOpen(false);
    onClose();
  };

  // Close on ESC
  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalOpen, onClose]);

  // Handle time slot confirmation
  const handleTimeConfirmation = () => {
    const formattedDate = new Date(selectedDate.year, selectedDate.month, selectedDate.day).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const message = `<i class="fas fa-check-circle text-green-400 text-xl"></i> <strong>Time Slot Confirmed!</strong><br><i class="fas fa-calendar text-orange-400"></i> <strong>${formattedDate}</strong><br><i class="fas fa-clock text-orange-400"></i> <strong>${selectedTime}</strong> (${timezone})`;
    setConfirmationMessage(message);
    setTimeSlotConfirmed(true);
    
    // Auto-hide the message after 5 seconds
    setTimeout(() => setConfirmationMessage(null), 5000);
  };

  // Show popup notification
  const showNotificationPopup = (type: 'success' | 'error' | 'warning', message: string, details: string = '') => {
    setPopupType(type);
    setPopupMessage(message);
    setPopupDetails(details);
    setShowPopup(true);
  };

  // Close popup
  const closePopup = () => {
    setShowPopup(false);
    setPopupType(null);
    setPopupMessage('');
    setPopupDetails('');
  };

  // Send booking data to backend API
  async function handleFormSubmit(e) {
    e.preventDefault();

    // Comprehensive validation
    const errors = validateForm();

    if (errors.length > 0) {
      setSubmitStatus(`<i class="fas fa-times-circle text-red-400"></i> ${errors.join('. ')}.`);
      
      // Show validation error popup
      showNotificationPopup(
        'error',
        'Please Complete Required Fields',
        errors.join('. ')
      );
      return;
    }

    setSubmitting(true);
    setSubmitStatus('Submitting your booking...');

    const bookingData = {
      name: name.trim(),
      email: email.trim(),
      phone: phone ? `${countryCode}${phone}` : '',
      organization: organization.trim(),
      project: project.trim(),
      date: selectedDate ? `${selectedDate.year}-${String(selectedDate.month + 1).padStart(2, '0')}-${String(selectedDate.day).padStart(2, '0')}` : '',
      time: selectedTime,
      timezone,
      meetingSoftware: meetingSoftware || '',
    };

    try {
      const response = await fetch('http://localhost:8000/process_booking.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus('<i class="fas fa-check-circle text-green-400"></i> Your booking was submitted successfully! We will contact you soon.');
        
        // Auto-clear success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus('');
        }, 5000);
        
        // Reset form after successful submission
        setName('');
        setEmail('');
        setPhone('');
        setCountryCode('+250'); // Reset to Rwanda default
        setOrganization('');
        setProject('');
        setSelectedDate(null);
        setSelectedTime('');
        setStep(1);
        setTimeSlotConfirmed(false);
        setMeetingSoftware('');
        
        // Show success popup or warning popup based on email status
        if (result.warning) {
          showNotificationPopup(
            'warning', // Use warning styling for email issues
            'Booking Saved - Email Issue',
            `Your booking has been saved successfully (ID: ${result.id}), but there was an issue sending the confirmation email. ${result.warning}. We will still contact you to confirm your appointment.`
          );
        } else {
          showNotificationPopup(
            'success',
            'Booking Submitted Successfully!',
            `Your consultation request has been received. Booking ID: ${result.id}. We will contact you soon to confirm your appointment.`
          );
        }
      } else {
        const errorMessage = result.error || 'Submission failed. Please try again.';
        setSubmitStatus(`<i class="fas fa-times-circle text-red-400"></i> ${errorMessage}`);
        
        // Show error popup
        showNotificationPopup(
          'error',
          'Booking Submission Failed',
          errorMessage
        );
      }
    } catch (error) {
      console.error('Submission error:', error);
      if (error instanceof TypeError && error.message.includes('fetch')) {
        setSubmitStatus('<i class="fas fa-times-circle text-red-400"></i> Network error. Please check your connection and try again.');
        
        // Show network error popup
        showNotificationPopup(
          'error',
          'Network Error',
          'Please check your internet connection and try again. If the problem persists, contact our support team.'
        );
      } else {
        setSubmitStatus('<i class="fas fa-times-circle text-red-400"></i> An unexpected error occurred. Please try again or contact support.');
        
        // Show generic error popup
        showNotificationPopup(
          'error',
          'Unexpected Error',
          'An unexpected error occurred while submitting your booking. Please try again or contact our support team for assistance.'
        );
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center 
                bg-gradient-to-br from-black/70 via-gray-900/60 to-black/70 
                backdrop-blur-sm min-h-screen p-2 sm:p-4 md:p-6
                overflow-y-auto">
          <div className="bg-[#1b1b1d] w-full max-w-4xl rounded-xl shadow-lg text-white 
                mx-auto my-4 max-h-[95vh] overflow-hidden flex flex-col
                transform transition-all duration-300 ease-out">
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
              className="group absolute right-3 top-3 sm:right-4 sm:top-4 z-20 
                h-10 w-10 sm:h-12 sm:w-12 rounded-full 
                bg-white/10 backdrop-blur-xl ring-2 ring-white/30 
                hover:bg-white/20 flex items-center justify-center shadow-lg
                active:scale-95 transition-transform"
            >
              <span className="h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-gradient-to-br from-zinc-100/80 to-white/60 shadow-inner flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="h-3 w-3 sm:h-4 sm:w-4 text-zinc-800/80" aria-hidden>
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
            </button>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
              {/* Header */}
              <h2 className="text-lg sm:text-xl font-semibold text-orange-400 flex items-center gap-2 mb-4">
                Let’s Start Your Project
              </h2>

              {/* Progress Bar */}
              <div className="w-full bg-gray-700 h-2 rounded-full mb-4 overflow-hidden">
                <div
                  className="bg-orange-500 h-full rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${(step / 8) * 100}%` } as any}
                />
              </div>

              {/* Step Title */}
              <p className="text-xs sm:text-sm font-medium text-gray-300 mb-6">
                Step {step} of 8
              </p>

              {/* Step Content */}
              <div className="mb-8">
                {step === 1 && <Step1 setCanProceed={setCanProceed} />}
                {step === 2 && <Step2 setCanProceed={setCanProceed} />}
                {step === 3 && <Step3 setCanProceed={setCanProceed} />}
                {step === 4 && <Step4 setCanProceed={setCanProceed} />}
                {step === 5 && <Step5 nextStep={nextStep} />}
                {step === 6 && <Step6 meetingSoftware={meetingSoftware} setMeetingSoftware={setMeetingSoftware} />}
                {step === 7 && <Step7 setCanProceed={setCanProceed} selectedDate={selectedDate} setSelectedDate={setSelectedDate} selectedTime={selectedTime} setSelectedTime={setSelectedTime} timezone={timezone} setTimezone={setTimezone} handleTimeConfirmation={handleTimeConfirmation} confirmationMessage={confirmationMessage} timeSlotConfirmed={timeSlotConfirmed} setTimeSlotConfirmed={setTimeSlotConfirmed} meetingSoftware={meetingSoftware} />}
                {step === 8 && <Step8 submitStatus={submitStatus} handleFormSubmit={handleFormSubmit} name={name} setName={setName} email={email} setEmail={setEmail} phone={phone} setPhone={setPhone} countryCode={countryCode} setCountryCode={setCountryCode} countryCodes={countryCodes} organization={organization} setOrganization={setOrganization} project={project} setProject={setProject} selectedDate={selectedDate} selectedTime={selectedTime} timezone={timezone} submitting={submitting} meetingSoftware={meetingSoftware} />}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center p-4 sm:p-6 border-t border-gray-700 bg-[#1a1a1c]">
              {step > 1 ? (
                <button
                  onClick={prevStep}
                  className="flex items-center gap-2 px-4 py-3 sm:px-6 sm:py-3 
                    bg-gray-700 hover:bg-gray-600 active:bg-gray-500
                    rounded-lg text-sm sm:text-base font-medium
                    transition-all duration-200 active:scale-95
                    min-h-[44px] touch-manipulation"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span className="hidden xs:inline">Previous</span>
                </button>
              ) : (
                <div />
              )}

              {step === 8 ? (
                <Tooltip.Provider>
                  <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                      <button
                        onClick={handleFormSubmit}
                        className={`flex items-center gap-2 px-4 py-3 sm:px-6 sm:py-3 
                          rounded-lg text-sm sm:text-base font-semibold
                          transition-all duration-200 active:scale-95
                          min-h-[44px] touch-manipulation ${
                          submitting || !meetingSoftware
                            ? 'bg-gray-500 cursor-not-allowed'
                            : 'bg-orange-600 hover:bg-orange-700 active:bg-orange-500'
                        }`}
                        disabled={submitting || !meetingSoftware}
                      >
                        <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span>Schedule Consultation</span>
                      </button>
                    </Tooltip.Trigger>
                    {(submitting || !meetingSoftware) && (
                      <Tooltip.Portal>
                        <Tooltip.Content
                          className="bg-gray-900 text-white px-4 py-3 rounded-lg text-sm shadow-2xl border-2 border-gray-600 max-w-xs z-[10001]"
                          sideOffset={8}
                          side="top"
                        >
                          {submitting ? 'Submitting your booking...' : 'Please select a meeting platform'}
                          <Tooltip.Arrow className="fill-gray-900" />
                        </Tooltip.Content>
                      </Tooltip.Portal>
                    )}
                  </Tooltip.Root>
                </Tooltip.Provider>
              ) : step < 8 ? (
                <Tooltip.Provider>
                  <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                      <button
                        onClick={nextStep}
                        className={`flex items-center gap-2 px-4 py-3 sm:px-6 sm:py-3 
                          rounded-lg text-sm sm:text-base font-medium
                          transition-all duration-200 active:scale-95
                          min-h-[44px] touch-manipulation ${
                          (step >= 1 && step <= 4 && !canProceed) || (step === 7 && (!selectedDate || !selectedTime || !timeSlotConfirmed)) 
                            ? 'bg-gray-500 cursor-not-allowed' 
                            : 'bg-orange-500 hover:bg-orange-600 active:bg-orange-400'
                        }`}
                        disabled={(step >= 1 && step <= 4 && !canProceed) || (step === 7 && (!selectedDate || !selectedTime || !timeSlotConfirmed))}
                      >
                        <span className="hidden xs:inline">Next</span>
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </Tooltip.Trigger>
                    {((step >= 1 && step <= 4 && !canProceed) || (step === 7 && (!selectedDate || !selectedTime || !timeSlotConfirmed))) && (
                      <Tooltip.Portal>
                        <Tooltip.Content
                          className="bg-gray-900 text-white px-4 py-3 rounded-lg text-sm shadow-2xl border-2 border-gray-600 max-w-xs z-[10001]"
                          sideOffset={8}
                          side="top"
                        >
                          {step >= 1 && step <= 4 ? 'Please make a selection to continue' : 'Please select a date, time, and confirm your selection to continue'}
                          <Tooltip.Arrow className="fill-gray-900" />
                        </Tooltip.Content>
                      </Tooltip.Portal>
                    )}
                  </Tooltip.Root>
                </Tooltip.Provider>
              ) : (
                <div />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Success/Error Popup */}
      {showPopup && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-[#1b1b1d] w-full max-w-md mx-auto rounded-xl shadow-2xl border border-gray-700 
            p-4 sm:p-6 relative popup-enter transform translate-y-0 max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={closePopup}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-white 
                text-xl transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center
                touch-manipulation active:scale-95"
              aria-label="Close popup"
            >
              ✕
            </button>

            {/* Icon */}
            <div className="flex justify-center mb-4">
              {popupType === 'success' ? (
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-orange-500/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              ) : popupType === 'warning' ? (
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-orange-500/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
              ) : (
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-500/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              )}
            </div>

            {/* Title */}
            <h3 className={`text-lg sm:text-xl font-semibold text-center mb-2 ${
              popupType === 'success' ? 'text-orange-400' :
              popupType === 'warning' ? 'text-orange-400' : 'text-red-400'
            }`}>
              {popupMessage}
            </h3>

            {/* Details */}
            {popupDetails && (
              <p className="text-gray-300 text-center text-sm leading-relaxed mb-6 max-h-32 overflow-y-auto">
                {popupDetails}
              </p>
            )}

            {/* Action Button */}
            <div className="flex justify-center">
              <button
                onClick={closePopup}
                className={`px-6 py-3 rounded-lg font-medium transition-colors min-h-[44px] 
                  touch-manipulation active:scale-95 text-sm sm:text-base ${
                  popupType === 'success'
                    ? 'bg-orange-600 hover:bg-orange-700 text-white'
                    : popupType === 'warning'
                    ? 'bg-orange-600 hover:bg-orange-700 text-white'
                    : 'bg-red-600 hover:bg-red-700 text-white'
                }`}
              >
                {popupType === 'success' ? 'Continue' :
                 popupType === 'warning' ? 'Understood' : 'Try Again'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* -------------------------
   STEP 1
------------------------- */
function Step1({ setCanProceed }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  // Validation: update canProceed when selection changes
  // Step 1: canProceed is true only if an option is selected
  useEffect(() => { setCanProceed(!!selectedOption); }, [selectedOption, setCanProceed]);
  const options = [
    {
      label: "Video Production",
      desc: "Corporate videos, documentaries, promotional content",
      icon: Film,
    },
    { label: "Live Streaming", desc: "Events, conferences, webinars", icon: Radio },
    {
      label: "Photography",
      desc: "Event coverage, corporate headshots, product photography",
      icon: Camera,
    },
    {
      label: "Full Production",
      desc: "Complete audiovisual package",
      icon: Video,
    },
    { label: "Other", desc: "Custom project – please specify", icon: Briefcase },
  ];

  return (
    <>
      <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
        What type of project do you have in mind?
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={() => setSelectedOption(opt.label)}
            className={`flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-lg border text-left 
              transition-all duration-200 active:scale-95 touch-manipulation
              min-h-[60px] sm:min-h-[70px] ${
              selectedOption === opt.label
                ? 'bg-orange-500 border-orange-500 shadow-lg shadow-orange-500/20'
                : 'bg-[#252529] border-gray-700 hover:bg-[#2f2f31] active:bg-[#2a2a2c]'
            }`}
          >
            <opt.icon className={`w-5 h-5 sm:w-6 sm:h-6 mt-1 flex-shrink-0 ${
              selectedOption === opt.label ? 'text-white' : 'text-orange-400/80'
            }`} />
            <div className="min-w-0 flex-1">
              <h4 className={`font-semibold text-sm sm:text-base ${
                selectedOption === opt.label ? 'text-white' : 'text-gray-200'
              }`}>
                {opt.label}
              </h4>
              <p className={`text-xs sm:text-sm mt-1 ${
                selectedOption === opt.label ? 'text-white/90' : 'text-gray-400'
              }`}>
                {opt.desc}
              </p>
            </div>
          </button>
        ))}
      </div>
      {selectedOption === "Other" && (
        <div className="mt-4 sm:mt-6">
          <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="other">
            Please specify your project type:
          </label>
          <input
            type="text"
            id="other"
            name="other"
            className="w-full rounded-lg border-gray-600 bg-gray-800 px-4 py-3 text-white 
              placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20
              text-base min-h-[44px] touch-manipulation"
            placeholder="Describe your project"
          />
        </div>
      )}
    </>
  );
}

/* -------------------------
   STEP 2
------------------------- */
function Step2({ setCanProceed }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  // Step 2: canProceed is true only if an option is selected
  useEffect(() => { setCanProceed(activeIndex !== null); }, [activeIndex, setCanProceed]);
  const options = [
    {
      label: "Small Scale",
      desc: "1 location, 1–2 days\n1–2 camera operators, 1 photographer",
      icon: User,
    },
    {
      label: "Medium Scale",
      desc: "1–7 days\n2+ camera operators, 1 photographer",
      icon: Users,
    },
    {
      label: "Large Scale",
      desc: "Multiple locations, 1+ weeks\n5+ camera operators, 2+ photographers",
      icon: Building,
    },
  ];
  return (
    <>
      <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
        What's the scale of your project?
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-lg border text-left 
              transition-all duration-200 active:scale-95 touch-manipulation
              min-h-[80px] sm:min-h-[90px] ${
              activeIndex === i
                ? "bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/20"
                : "bg-[#252529] hover:bg-[#2f2f31] border-gray-700 active:bg-[#2a2a2c]"
            }`}
          >
            <opt.icon
              className={`w-5 h-5 sm:w-6 sm:h-6 mt-1 flex-shrink-0 ${
                activeIndex === i ? "text-white" : "text-orange-400"
              }`}
            />
            <div className="min-w-0 flex-1">
              <h4
                className={`font-semibold text-sm sm:text-base ${
                  activeIndex === i ? "text-white" : "text-gray-200"
                }`}
              >
                {opt.label}
              </h4>
              <p
                className={`text-xs sm:text-sm mt-1 whitespace-pre-line ${
                  activeIndex === i ? "text-white/90" : "text-gray-400"
                }`}
              >
                {opt.desc}
              </p>
            </div>
          </button>
        ))}
      </div>
    </>
  );
}

/* -------------------------
   STEP 3
------------------------- */
function Step3({ setCanProceed }) {
  const [active, setActive] = useState(null);
  // Step 3: canProceed is true only if an option is selected
  useEffect(() => { setCanProceed(active !== null); }, [active, setCanProceed]);
  const options = [
    { label: "Urgent (1–2 weeks)", desc: "Rush delivery", icon: Clock },
    { label: "Standard (3–4 weeks)", desc: "Normal production timeline", icon: Calendar },
    { label: "Flexible (1–2 months)", desc: "We can work around your schedule", icon: Calendar },
    { label: "Planning Phase", desc: "Just exploring options", icon: PenTool },
  ];
  return (
    <>
      <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
        When do you need this completed?
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-lg border text-left 
              transition-all duration-200 active:scale-95 touch-manipulation
              min-h-[60px] sm:min-h-[70px] ${
              active === i
                ? "bg-orange-500 border-orange-400 text-white shadow-lg shadow-orange-500/20"
                : "bg-[#252529] hover:bg-[#2f2f31] border-gray-700 active:bg-[#2a2a2c]"
            }`}
          >
            <opt.icon
              className={`w-5 h-5 sm:w-6 sm:h-6 mt-1 flex-shrink-0 ${
                active === i ? "text-white" : "text-orange-400"
              }`}
            />
            <div className="min-w-0 flex-1">
              <h4
                className={`font-semibold text-sm sm:text-base ${
                  active === i ? "text-white" : "text-gray-200"
                }`}
              >
                {opt.label}
              </h4>
              <p className={`text-xs sm:text-sm mt-1 ${
                active === i ? "text-white/90" : "text-gray-400"
              }`}>
                {opt.desc}
              </p>
            </div>
          </button>
        ))}
      </div>
    </>
  );
}

/* -------------------------
   STEP 4
------------------------- */
function Step4({ setCanProceed }) {
  const [active, setActive] = useState(null);
  // Step 4: canProceed is true only if an option is selected
  useEffect(() => { setCanProceed(active !== null); }, [active, setCanProceed]);
  const options = [
    { label: "Startup Package", desc: "Essential production", icon: DollarSign },
    { label: "Professional Package", desc: "Enhanced production", icon: Star },
    { label: "Enterprise Package", desc: "Comprehensive service", icon: Layers },
    { label: "Premium Package", desc: "Luxury features", icon: Settings },
  ];
  return (
    <>
      <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
        What's your project investment level?
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-lg border text-left 
              transition-all duration-200 active:scale-95 touch-manipulation
              min-h-[60px] sm:min-h-[70px] ${
              active === i 
                ? "bg-orange-500 border-orange-400 text-white shadow-lg shadow-orange-500/20" 
                : "bg-[#252529] border-gray-700 hover:bg-[#2f2f31] active:bg-[#2a2a2c]"
            }`}
          >
            <opt.icon className={`w-5 h-5 sm:w-6 sm:h-6 mt-1 flex-shrink-0 ${
              active === i ? "text-white" : "text-orange-400"
            }`} />
            <div className="min-w-0 flex-1">
              <h4 className={`font-semibold text-sm sm:text-base ${
                active === i ? "text-white" : "text-gray-200"
              }`}>
                {opt.label}
              </h4>
              <p className={`text-xs sm:text-sm mt-1 ${
                active === i ? "text-white/90" : "text-gray-400"
              }`}>
                {opt.desc}
              </p>
            </div>
          </button>
        ))}
      </div>
    </>
  );
}

/* -------------------------
  STEP 5 (Service selection - can always proceed)
------------------------- */
function Step5({ nextStep }: { nextStep: () => void }) {
  const [selected, setSelected] = useState<number[]>([]);

  const options = [
    { label: "Post-Production", desc: "Editing, sound design", icon: Film },
    { label: "Animation & Graphics", desc: "Motion graphics, titles", icon: Layers },
    { label: "Scriptwriting", desc: "Content creation", icon: PenTool },
    { label: "Distribution", desc: "Social media, broadcasting", icon: Share2 },
  ];

  const toggleOption = (i: number) => {
    setSelected((prev) =>
      prev.includes(i) ? prev.filter((item) => item !== i) : [...prev, i]
    );
  };

  return (
     <>
      <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
        Any additional services needed?
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {options.map((opt, i) => {
          const isActive = selected.includes(i);
          return (
            <button
              key={i}
              onClick={() => toggleOption(i)}
              className={`flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-lg border text-left 
                transition-all duration-200 active:scale-95 touch-manipulation
                min-h-[60px] sm:min-h-[70px] ${
                isActive
                  ? "bg-orange-500 border-orange-400 text-white shadow-lg shadow-orange-500/20"
                  : "bg-[#252529] border-gray-700 hover:bg-[#2f2f31] active:bg-[#2a2a2c]"
              }`}
            >
              <opt.icon
                className={`w-5 h-5 sm:w-6 sm:h-6 mt-1 flex-shrink-0 ${
                  isActive ? "text-white" : "text-orange-400"
                }`}
              />
              <div className="min-w-0 flex-1">
                <h4 className={`font-semibold text-sm sm:text-base ${
                  isActive ? "text-white" : "text-gray-200"
                }`}>
                  {opt.label}
                </h4>
                <p className={`text-xs sm:text-sm mt-1 ${
                  isActive ? "text-white/90" : "text-gray-400"
                }`}>
                  {opt.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selection Summary */}
      {selected.length > 0 && (
        <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-orange-900/20 border border-orange-500/50 rounded-lg">
          <p className="text-orange-300 text-sm">
            <strong>Selected Services:</strong> {selected.map(i => options[i].label).join(", ")}
          </p>
        </div>
      )}

      {/* Skip Option */}
      <div className="flex justify-center mt-4 sm:mt-6">
        <button
          onClick={() => {setSelected([]); nextStep()}}
          className="bg-gray-600 hover:bg-gray-700 active:bg-gray-500 text-white 
            px-4 py-3 sm:px-6 sm:py-3 rounded-lg transition-all duration-200 
            active:scale-95 min-h-[44px] touch-manipulation text-sm sm:text-base"
        >
          Skip – None needed
        </button>
      </div>

      {/* Helper Text */}
      <div className="text-center mt-4">
        <p className="text-gray-400 text-xs sm:text-sm">
          {selected.length === 0
            ? "Select any additional services or click 'Skip' to continue"
            : `${selected.length} service${selected.length > 1 ? 's' : ''} selected - click 'Next' to continue`
          }
        </p>
      </div>
    </>
  );
}

/* -------------------------
   STEP 6 - Preferred Meeting Platform Selection
------------------------- */
function Step6({ meetingSoftware, setMeetingSoftware }) {
  return (
    <div className="max-w-2xl mx-auto">
      <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Preferred Meeting Platform</h3>
      <p className="text-gray-300 text-center text-sm sm:text-base mb-6 sm:mb-8">
        Choose your preferred platform for our consultation meeting. We'll send you the meeting details via email.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-lg mx-auto">
        {[
          {
            label: "Zoom",
            desc: "Most popular video conferencing platform",
            icon: "fas fa-video",
          },
          {
            label: "Microsoft Teams",
            desc: "Integrated with Microsoft ecosystem",
            icon: "fas fa-users",
          },
          {
            label: "Google Meet",
            desc: "Simple and easy to use",
            icon: "fas fa-search",
          },
          {
            label: "Phone Call",
            desc: "Traditional phone consultation",
            icon: "fas fa-phone",
          },
        ].map((option, i) => (
          <button
            key={i}
            onClick={() => setMeetingSoftware(option.label)}
            className={`flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-lg border text-left 
              transition-all duration-200 active:scale-95 touch-manipulation
              min-h-[60px] sm:min-h-[70px] ${
              meetingSoftware === option.label
                ? 'bg-orange-500 border-orange-500 shadow-lg shadow-orange-500/20'
                : 'bg-[#252529] border-gray-700 hover:bg-[#2f2f31] active:bg-[#2a2a2c]'
            }`}
          >
            <i className={`${option.icon} w-5 h-5 sm:w-6 sm:h-6 mt-1 flex-shrink-0 ${
              meetingSoftware === option.label ? 'text-white' : 'text-orange-400'
            }`}></i>
            <div className="min-w-0 flex-1">
              <h5 className={`font-semibold text-sm sm:text-base ${
                meetingSoftware === option.label ? 'text-white' : 'text-gray-200'
              }`}>
                {option.label}
              </h5>
              <p className={`text-xs sm:text-sm mt-1 ${
                meetingSoftware === option.label ? 'text-white/90' : 'text-gray-400'
              }`}>
                {option.desc}
              </p>
            </div>
          </button>
        ))}
      </div>

      {!meetingSoftware && (
        <div className="text-center mt-4 sm:mt-6">
          <p className="text-orange-400 text-sm">Please select a meeting platform to continue</p>
        </div>
      )}
    </div>
  );
}

/* -------------------------
   STEP 7 - Date and Time Selection
------------------------- */
function Step7({ setCanProceed, selectedDate, setSelectedDate, selectedTime, setSelectedTime, timezone, setTimezone, handleTimeConfirmation, confirmationMessage, timeSlotConfirmed, setTimeSlotConfirmed, meetingSoftware }) {
  // Calendar and time slot picker UI
  // List of time zones (IANA)
  const timeZones = [
    'Africa/Kigali', // Kigali (Central African Time)
    'Africa/Maputo',
    'Africa/Lagos',
    'Africa/Cairo',
    'Europe/London',
    'Europe/Paris',
    'Europe/Berlin',
    'America/New_York',
    'America/Chicago',
    'America/Denver',
    'America/Los_Angeles',
    'Asia/Dubai',
    'Asia/Kolkata',
    'Asia/Tokyo',
    'Asia/Shanghai',
    'Australia/Sydney',
    'Pacific/Auckland',
    'UTC',
  ];
  // Calendar logic: allow selection from today to any future date
  const today = new Date();
  const [calendarMonth, setCalendarMonth] = useState(today.getMonth());
  const [calendarYear, setCalendarYear] = useState(today.getFullYear());
  // Helper to get days in month
  function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
  }
  // Helper to get first day of week (0=Sun)
  function getFirstDayOfWeek(year, month) {
    return new Date(year, month, 1).getDay();
  }
  const daysInMonth = getDaysInMonth(calendarYear, calendarMonth);
  const firstDayOfWeek = getFirstDayOfWeek(calendarYear, calendarMonth);
  // Build calendar grid
  const calendarGrid = [];
  let dayNum = 1;
  for (let i = 0; i < 6; i++) {
    const week = [];
    for (let j = 0; j < 7; j++) {
      if ((i === 0 && j < firstDayOfWeek) || dayNum > daysInMonth) {
        week.push(null);
      } else {
        week.push(dayNum);
        dayNum++;
      }
    }
    calendarGrid.push(week);
  }
  // Validation: only allow current/future dates
  function isPastDate(year, month, day) {
    const d = new Date(year, month, day);
    const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
    return d.getTime() < todayMidnight;
  }
  const timeSlots = ['10:00', '11:00', '13:00', '14:30', '16:00']; // 24h format for clarity
  // Timezone conversion logic
  // Robust time conversion using Intl API
  function getConvertedTime(time, fromTz, toTz, dateObj) {
    // time: 'HH:mm', fromTz/toTz: IANA string, dateObj: Date
    const [h, m] = time.split(':').map(Number);
    const baseDate = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate(), h, m);
    // Convert from base timezone to UTC
    const utcDate = new Date(baseDate.toLocaleString('en-US', { timeZone: fromTz }));
    // Convert UTC to target timezone
    const targetDateStr = utcDate.toLocaleString('en-US', { timeZone: toTz, hour: '2-digit', minute: '2-digit', hour12: false });
    return targetDateStr;
  }

  // Step 7: canProceed is true only if date and time are selected AND confirmed
  useEffect(() => { setCanProceed(selectedDate && selectedTime && timeSlotConfirmed); }, [selectedDate, selectedTime, timeSlotConfirmed, setCanProceed]);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Selected Appointment Summary - Show only when confirmed */}
      {selectedDate && selectedTime && timeSlotConfirmed && (
        <div className="p-3 sm:p-4 bg-orange-900/20 border border-orange-500/50 rounded-lg">
          <h4 className="text-orange-400 font-semibold mb-2 text-sm sm:text-base">Selected Appointment:</h4>
          <p className="text-orange-300 text-sm sm:text-base">
            {new Date(selectedDate.year, selectedDate.month, selectedDate.day).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })} at {selectedTime} ({timezone})
          </p>
          {meetingSoftware && (
            <p className="text-orange-300 mt-1 text-sm">Meeting Platform: {meetingSoftware}</p>
          )}
        </div>
      )}

      {/* Calendar and Time Selection Section */}
      <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
        {/* Calendar Section */}
        <div className="w-full lg:w-1/2">
          <h3 className="text-lg sm:text-xl font-semibold mb-4">Select a Date</h3>

          {/* Calendar Navigation */}
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <button
              className="text-lg sm:text-xl px-3 py-2 sm:px-4 sm:px-3 touch-manipulation active:scale-95"
              onClick={() => {
                if (calendarMonth === 0) {
                  setCalendarMonth(11);
                  setCalendarYear(calendarYear - 1);
                } else {
                  setCalendarMonth(calendarMonth - 1);
                }
              }}
              disabled={calendarYear === today.getFullYear() && calendarMonth === today.getMonth()}
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="font-medium text-sm sm:text-base px-2">
              {new Date(calendarYear, calendarMonth).toLocaleString('default', { month: 'long', year: 'numeric' })}
            </span>
            <button
              className="text-lg sm:text-xl px-3 py-2 sm:px-4 sm:px-3 touch-manipulation active:scale-95"
              onClick={() => {
                if (calendarMonth === 11) {
                  setCalendarMonth(0);
                  setCalendarYear(calendarYear + 1);
                } else {
                  setCalendarMonth(calendarMonth + 1);
                }
              }}
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-3 sm:mb-4 text-center text-gray-400 text-xs">
            {['SUN','MON','TUE','WED','THU','FRI','SAT'].map(d => <div key={d} className="py-2">{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center mb-4">
            {calendarGrid.flat().map((day, i) => (
              day ? (
                <button
                  key={i}
                  className={`rounded-full h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center 
                    text-sm font-bold transition-all active:scale-95 touch-manipulation
                    ${isPastDate(calendarYear, calendarMonth, day) 
                      ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                      : 'bg-[#252529] text-gray-200 border border-gray-700 hover:bg-[#2f2f31] active:bg-[#2a2a2c]'}
                    ${selectedDate && selectedDate.day === day && selectedDate.month === calendarMonth && selectedDate.year === calendarYear 
                      ? 'bg-orange-500 text-white border-orange-500 shadow-lg shadow-orange-500/20' : ''}`}
                  disabled={isPastDate(calendarYear, calendarMonth, day)}
                  onClick={() => setSelectedDate({ day, month: calendarMonth, year: calendarYear })}
                  aria-label={isPastDate(calendarYear, calendarMonth, day) ? 'Past date not selectable' : `Select ${day} ${calendarMonth+1} ${calendarYear}`}
                >
                  {day}
                </button>
              ) : <div key={i}></div>
            ))}
          </div>

          {/* Timezone Selection */}
          <div className="mb-4">
            <label htmlFor="timezone" className="font-medium text-sm mb-2 block">Time zone</label>
            <select
              id="timezone"
              className="w-full p-3 rounded bg-[#252529] text-orange-400 border border-gray-700 
                focus:border-orange-500 focus:outline-none text-sm sm:text-base min-h-[44px] touch-manipulation"
              value={timezone}
              onChange={e => setTimezone(e.target.value)}
              title="Select your time zone"
            >
              {timeZones.map(tz => (
                <option key={tz} value={tz}>{tz}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Time Slots Section */}
        <div className="w-full lg:w-1/2">
          <h3 className="text-lg sm:text-xl font-semibold mb-4">Select a Time</h3>

          <div className="mb-4 text-sm sm:text-base font-medium">
            {selectedDate ? `${new Date(selectedDate.year, selectedDate.month, selectedDate.day).toLocaleDateString()}` : 'Select a date first'}
          </div>

          <div className="flex flex-col gap-3 w-full max-w-xs">
            {/* Time slots: disabled until date selected, locked when confirmed */}
            {timeSlots.map(slot => (
              <div key={slot} className="flex gap-2">
                <Tooltip.Provider>
                  <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                      <button
                        className={`flex-1 py-3 sm:py-4 px-3 rounded border text-center font-medium 
                          transition-all active:scale-95 touch-manipulation min-h-[44px]
                          ${!selectedDate ? 'bg-gray-800 text-gray-500 border-gray-700 cursor-not-allowed' :
                            timeSlotConfirmed && selectedTime === slot ? 'bg-orange-600 text-white border-orange-600 cursor-not-allowed' :
                            selectedTime === slot ? 'bg-orange-500 text-white border-orange-500 shadow-lg shadow-orange-500/20' :
                            'bg-[#252529] text-orange-400 border-gray-700 hover:bg-[#2f2f31] active:bg-[#2a2a2c]'}`}
                        onClick={() => {
                          if (selectedDate && !timeSlotConfirmed) {
                            setSelectedTime(slot);
                          }
                        }}
                        disabled={!selectedDate || timeSlotConfirmed}
                      >
                        <div className="text-sm sm:text-base">{slot}</div>
                        {/* Show converted time if timezone is not Africa/Kigali */}
                        {timezone !== 'Africa/Kigali' && selectedDate && (
                          <div className="text-xs text-orange-300 mt-1">
                            {(() => {
                              const dateObj = new Date(selectedDate.year, selectedDate.month, selectedDate.day);
                              return getConvertedTime(slot, 'Africa/Kigali', timezone, dateObj);
                            })()} ({timezone})
                          </div>
                        )}
                      </button>
                    </Tooltip.Trigger>
                    {(!selectedDate || timeSlotConfirmed) && (
                      <Tooltip.Portal>
                        <Tooltip.Content
                          className="bg-gray-900 text-white px-4 py-3 rounded-lg text-sm shadow-2xl border-2 border-gray-600 max-w-xs z-[10001]"
                          sideOffset={8}
                          side="top"
                        >
                          {!selectedDate ? 'Please select a date first' : 'Time slot confirmed - cannot change'}
                          <Tooltip.Arrow className="fill-gray-900" />
                        </Tooltip.Content>
                      </Tooltip.Portal>
                    )}
                  </Tooltip.Root>
                </Tooltip.Provider>
                {selectedTime === slot && selectedDate && !timeSlotConfirmed && (
                  <Tooltip.Provider>
                    <Tooltip.Root>
                      <Tooltip.Trigger asChild>
                        <button
                          className="px-3 py-3 sm:px-4 sm:py-4 rounded font-semibold shadow transition-colors 
                            bg-orange-600 text-white hover:bg-orange-700 active:bg-orange-500
                            min-h-[44px] touch-manipulation active:scale-95"
                          onClick={handleTimeConfirmation}
                        >
                          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </button>
                      </Tooltip.Trigger>
                      <Tooltip.Portal>
                        <Tooltip.Content
                          className="bg-gray-900 text-white px-4 py-3 rounded-lg text-sm shadow-2xl border-2 border-gray-600 max-w-xs z-[10001]"
                          sideOffset={8}
                          side="top"
                        >
                          Confirm this time slot
                          <Tooltip.Arrow className="fill-gray-900" />
                        </Tooltip.Content>
                      </Tooltip.Portal>
                    </Tooltip.Root>
                  </Tooltip.Provider>
                )}
                {selectedTime === slot && selectedDate && timeSlotConfirmed && (
                  <div className="px-3 py-3 sm:px-4 sm:py-4 rounded font-semibold bg-orange-600 text-white opacity-75 min-h-[44px] flex items-center justify-center">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Professional Confirmation Message */}
          {confirmationMessage && (
            <div className="mt-6 p-3 sm:p-4 bg-orange-900/20 border border-orange-500/50 rounded-lg animate-in slide-in-from-top-2 duration-300">
              <div className="text-center" dangerouslySetInnerHTML={{__html: confirmationMessage}} />
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

/* -------------------------
   STEP 8 - Personal Information
------------------------- */
function Step8({ submitStatus, handleFormSubmit, name, setName, email, setEmail, phone, setPhone, countryCode, setCountryCode, countryCodes, organization, setOrganization, project, setProject, selectedDate, selectedTime, timezone, submitting, meetingSoftware }) {
  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Personal Information Section */}
      <div className="w-full">
        <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Personal Information</h3>

        {/* Contact Form */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div className="relative">
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Full Name *"
              className={`p-3 sm:p-4 rounded-lg bg-[#252529] border focus:outline-none w-full 
                text-white placeholder-gray-400 transition-all duration-200 text-base
                min-h-[48px] touch-manipulation ${
                name.trim() ? 'border-orange-500 shadow-lg shadow-orange-500/20' : 'border-gray-700 focus:border-orange-500'
              }`}
              required
            />
            {name && !name.trim() && (
              <div className="absolute -bottom-6 left-0 text-orange-400 text-xs font-medium 
                bg-orange-900/20 px-2 py-1 rounded border border-orange-500/50 animate-in slide-in-from-top-1 duration-200">
                ⚠️ Full name is required
              </div>
            )}
          </div>
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email Address *"
              className={`p-3 sm:p-4 rounded-lg bg-[#252529] border focus:outline-none w-full 
                text-white placeholder-gray-400 transition-all duration-200 text-base
                min-h-[48px] touch-manipulation ${
                email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? 'border-orange-500 shadow-lg shadow-orange-500/20' :
                email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? 'border-red-500' : 'border-gray-700 focus:border-orange-500'
              }`}
              required
            />
            {email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && (
              <div className="absolute -bottom-6 left-0 text-red-400 text-xs font-medium 
                bg-red-900/20 px-2 py-1 rounded border border-red-500/50 animate-in slide-in-from-top-1 duration-200">
                ⚠️ Please enter a valid email address
              </div>
            )}
          </div>
        </div>

        {/* Organization field */}
        <div className="mb-6 sm:mb-8 relative">
          <input
            type="text"
            value={organization}
            onChange={e => setOrganization(e.target.value)}
            placeholder="Organization *"
            className={`p-3 sm:p-4 rounded-lg bg-[#252529] border focus:outline-none w-full 
              text-white placeholder-gray-400 transition-all duration-200 text-base
              min-h-[48px] touch-manipulation ${
              organization.trim() ? 'border-orange-500 shadow-lg shadow-orange-500/20' : 'border-gray-700 focus:border-orange-500'
            }`}
            required
          />
          {organization && !organization.trim() && (
            <div className="absolute -bottom-6 left-0 text-orange-400 text-xs font-medium 
              bg-orange-900/20 px-2 py-1 rounded border border-orange-500/50 animate-in slide-in-from-top-1 duration-200">
              ⚠️ Organization is required
            </div>
          )}
        </div>

        {/* Phone number field */}
        <div className="mb-6 sm:mb-8 relative">
          <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
          <div className="flex gap-2">
            <select
              value={countryCode}
              onChange={e => setCountryCode(e.target.value)}
              className="p-3 sm:p-4 rounded-lg bg-[#252529] border border-gray-700 
                focus:border-orange-500 focus:outline-none text-white min-w-[120px] 
                text-sm sm:text-base min-h-[48px] touch-manipulation"
              title="Select country code"
            >
              {countryCodes.map((country, index) => (
                <option key={`${country.code}-${country.name}-${index}`} value={country.code}>
                  {country.flag} {country.code} {country.name}
                </option>
              ))}
            </select>
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value.replace(/\D/g, ''))} // Only allow digits
              placeholder="123456789"
              className={`p-3 sm:p-4 rounded-lg bg-[#252529] border focus:outline-none flex-1 
                text-white placeholder-gray-400 transition-all duration-200 text-base
                min-h-[48px] touch-manipulation ${
                phone && phone.length >= 7 ? 'border-orange-500 shadow-lg shadow-orange-500/20' :
                phone && phone.length < 7 ? 'border-red-500' : 'border-gray-700 focus:border-orange-500'
              }`}
            />
          </div>
          {phone && phone.length < 7 && (
            <div className="absolute -bottom-6 left-0 text-red-400 text-xs font-medium 
              bg-red-900/20 px-2 py-1 rounded border border-red-500/50 animate-in slide-in-from-top-1 duration-200 mt-2">
              ⚠️ Please enter a valid phone number (at least 7 digits)
            </div>
          )}
        </div>

        <textarea
          value={project}
          onChange={e => setProject(e.target.value)}
          placeholder="Tell us more about your project vision... *"
          className={`p-3 sm:p-4 rounded-lg bg-[#252529] border focus:outline-none w-full 
            text-white placeholder-gray-400 mb-6 sm:mb-8 transition-all duration-200 
            text-base min-h-[100px] touch-manipulation ${
            project.trim() ? 'border-orange-500 shadow-lg shadow-orange-500/20' : 'border-gray-700 focus:border-orange-500'
          }`}
          rows={4}
          required
        />
        {project && !project.trim() && (
          <div className="mb-4 text-orange-400 text-xs font-medium 
            bg-orange-900/20 px-3 py-2 rounded border border-orange-500/50 animate-in slide-in-from-top-1 duration-200">
            ⚠️ Project description is required
          </div>
        )}

        {/* Validation Summary - Show in middle when required fields are missing */}
        {(!name.trim() || !email.trim() || !organization.trim() || !project.trim() || (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) || (phone && phone.length < 7)) && (
          <div className="mb-6 p-3 sm:p-4 bg-orange-900/20 border border-orange-500/50 rounded-lg animate-in slide-in-from-top-2 duration-300">
            <div className="text-center">
              <h4 className="text-orange-400 font-semibold mb-2 text-sm sm:text-base">⚠️ Please Complete Required Fields</h4>
              <div className="text-orange-300 text-sm space-y-1">
                {!name.trim() && <p>• Full name is required</p>}
                {!email.trim() && <p>• Email address is required</p>}
                {email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && <p>• Please enter a valid email address</p>}
                {!organization.trim() && <p>• Organization is required</p>}
                {!project.trim() && <p>• Project description is required</p>}
                {phone && phone.length < 7 && <p>• Please enter a valid phone number (at least 7 digits)</p>}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Schedule Consultation Button and feedback */}
      <div className="flex flex-col items-center mt-6">
        {submitStatus && !submitStatus.includes('Your booking was submitted successfully') && 
          <div className="mt-2 text-sm text-center" dangerouslySetInnerHTML={{__html: submitStatus}} />
        }
      </div>
    </div>
  );
}
