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


  const nextStep = () => setStep((s) => Math.min(s + 1, 6));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  useEffect(() => {
    setModalOpen(isOpen);
    if (isOpen) {
      setStep(1);
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
      if (!open) return;
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }, [open, onClose]);
    
  function handleFormSubmit(e): void {
    e.preventDefault();
  }

  return (
    <>
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center 
                bg-gradient-to-br from-black/70 via-gray-900/60 to-black/70 
                backdrop-blur-sm h-[100vh]">
          <div className="bg-[#1b1b1d] w-[90%] max-w-3xl rounded-xl shadow-lg text-white p-6 md:p-8  mx-auto">
            {/* Close Button */}
            {/* <button
              onClick={handleClose}
              className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl"
            >
              ✕
            </button> */}
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
            {/* Header */}
            <h2 className="text-lg font-semibold text-orange-400 flex items-center gap-2">
              Let’s Start Your Project
            </h2>

            {/* Progress Bar */}
            <div className="w-full bg-gray-700 h-1 mt-3 rounded">
              <div
                className="bg-orange-500 h-1 rounded"
                style={{ width: `${(step / 6) * 100}%` }}
              ></div>
            </div>

            {/* Step Title */}
            <p className="mt-4 text-sm font-medium">Step {step} of 6</p>

            {/* Step Content */}
            <div className="mt-6">
              {step === 1 && <Step1 setCanProceed={setCanProceed} />}
              {step === 2 && <Step2 setCanProceed={setCanProceed} />}
              {step === 3 && <Step3 setCanProceed={setCanProceed} />}
              {step === 4 && <Step4 setCanProceed={setCanProceed} />}
              {step === 5 && <Step5 nextStep={nextStep} />}
              {step === 6 && <Step6 />}
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              {step > 1 ? (
                <button
                  onClick={prevStep}
                  className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600"
                >
                  ← Previous
                </button>
              ) : (
                <div />
              )}

              {step < 6 ? (
                <button
                  onClick={nextStep}
                  className={`px-6 py-2 rounded-lg ${(step >= 1 && step <= 4 && !canProceed) ? 'bg-gray-500 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600'}`}
                  disabled={step >= 1 && step <= 4 && !canProceed}
                >
                  Next →
                </button>
              ) : (
                <button
                  onClick={handleFormSubmit}
                  className="flex items-center px-6 py-2 bg-green-600 rounded-lg hover:bg-green-700"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  <span>Schedule Consultation</span>
                </button>
              )}
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
      <h3 className="text-xl font-semibold mb-4">
        What type of project do you have in mind?
      </h3>
      <div className="grid md:grid-cols-2 gap-4">
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={() => setSelectedOption(opt.label)}
            className={`flex items-start gap-3 p-4 rounded-lg border text-left transition-all duration-200 ${selectedOption === opt.label
                ? ' bg-orange-500 border-orange-500 shadow-lg shadow-orange-500/20'
                : 'bg-[#252529] border-gray-700 hover:bg-[#2f2f31]'
              }`}
          >
            <opt.icon className={`w-6 h-6 mt-1 ${selectedOption === opt.label ? 'text-white-400' : 'text-orange-400/80'
              }`} />
            <div>
              <h4 className="font-semibold">{opt.label}</h4>
              <p className="text-sm text-white-400">{opt.desc}</p>
            </div>
          </button>
        ))}

      </div>
      {selectedOption === "Other" && (
        <div className="mt-4">
          <label className="block text-sm font-medium text-white-400" htmlFor="other">Please specify your project type:</label>
          <input type="text" id="other" name="other" className="mt-1 block w-full rounded-md border-gray-600 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 focus:border-orange-500 focus:ring-orange-500" placeholder="Desribe your project" />
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
      <h3 className="text-xl font-semibold mb-4">
        What’s the scale of your project?
      </h3>
      <div className="grid md:grid-cols-3 gap-4">
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`flex items-start gap-3 p-4 rounded-lg border text-left transition-colors ${activeIndex === i
                ? "bg-orange-500 border-orange-500 text-white"
                : "bg-[#252529] hover:bg-[#2f2f31] border-gray-700"
              }`}
          >
            <opt.icon
              className={`w-6 h-6 mt-1 ${activeIndex === i ? "text-white" : "text-orange-400"
                }`}
            />
            <div>
              <h4
                className={`font-semibold ${activeIndex === i ? "text-white" : "text-gray-200"
                  }`}
              >
                {opt.label}
              </h4>
              <p
                className={`text-sm whitespace-pre-line ${activeIndex === i ? "text-white/90" : "text-gray-400"
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
      <h3 className="text-xl font-semibold mb-4">
        When do you need this completed?
      </h3>
      <div className="grid md:grid-cols-2 gap-4">
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`flex items-start gap-3 p-4 rounded-lg border text-left transition-colors
            ${active === i
                ? "bg-orange-500 border-orange-400"
                : "bg-[#252529] hover:bg-[#2f2f31] border-gray-700"
              }`}
          >
            <opt.icon
              className={`w-6 h-6 mt-1 ${active === i ? "text-white-500" : "text-orange-400"
                }`}
            />
            <div>
              <h4
                className={`font-semibold ${active === i ? "text-white-400" : ""
                  }`}
              >
                {opt.label}
              </h4>
              <p className="text-sm text-white-400">{opt.desc}</p>
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
      <h3 className="text-xl font-semibold mb-4">
        What’s your project investment level?
      </h3>
      <div className="grid md:grid-cols-2 gap-4">
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`flex items-start gap-3 p-4 rounded-lg border border-gray-700 text-left
              ${active === i ? "bg-orange-500 border-orange-400 text-white" : "bg-[#252529]"}
              `}
          >
            <opt.icon className={`w-6 h-6 mt-1 ${active === i ? "text-white" : "text-orange-400"}`} />
            <div>
              <h4 className="font-semibold">{opt.label}</h4>
              <p className="text-sm text-white-400">{opt.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </>
  );
}

/* -------------------------
  STEP 5 (No validation required, user can always proceed)
------------------------- */
function Step5({ nextStep }: { nextStep: () => void }) {
  // const [active, setActive] = useState(null);
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
      <h3 className="text-xl font-semibold mb-4">
        Any additional services needed?
      </h3>
      <div className="grid md:grid-cols-2 gap-4">
        {options.map((opt, i) => {
          const isActive = selected.includes(i);
          return (
            <button
              key={i}
              onClick={() => toggleOption(i)}
              className={`flex items-start gap-3 p-4 rounded-lg border text-left transition-colors
                ${
                  isActive
                    ? "bg-orange-500 border-orange-400 text-white"
                    : "bg-[#252529] border-gray-700 hover:bg-[#2f2f31]"
                }`}
            >
              <opt.icon
                className={`w-6 h-6 mt-1 ${
                  isActive ? "text-white" : "text-orange-400"
                }`}
              />
              <div>
                <h4 className="font-semibold">{opt.label}</h4>
                <p className="text-sm text-white-400">{opt.desc}</p>
              </div>
            </button>
          );
        })}
      </div>
      <div className="flex justify-center">
        <button
          onClick={() => {setSelected([]); nextStep()}}
          className="mt-4 bg-orange-500 text-white p-2 rounded"
        >
          Skip – None needed
        </button>
      </div>
    </>
  );
}

/* -------------------------
   STEP 6
------------------------- */
function Step6() {
  // Calendar and time slot picker UI
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [timezone, setTimezone] = useState('Eastern time - US & Canada');
  const month = 'July 2024';
  const days = [
    [30, 1, 2, 3, 4, 5, 6],
    [7, 8, 9, 10, 11, 12, 13],
    [14, 15, 16, 17, 18, 19, 20],
    [21, 22, 23, 24, 25, 26, 27],
    [28, 29, 30, 31, 1, 2, 3],
  ];
  const availableDays = [16, 17, 19, 22, 23, 24, 25, 30, 31];
  const timeSlots = ['10:00am', '11:00am', '1:00pm', '2:30pm', '4:00pm'];
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="w-full md:w-1/2">
        <h3 className="text-xl font-semibold mb-4">Select a Date & Time</h3>
        <div className="flex items-center justify-between mb-2">
          <button className="text-lg px-2">&#60;</button>
          <span className="font-medium">{month}</span>
          <button className="text-lg px-2">&#62;</button>
        </div>
        <div className="grid grid-cols-7 gap-2 mb-2 text-center text-gray-400 text-xs">
          {['SUN','MON','TUE','WED','THU','FRI','SAT'].map(d => <div key={d}>{d}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-2 text-center">
          {days.flat().map((day, i) => (
            <button
              key={i}
              className={`rounded-full h-8 w-8 flex items-center justify-center text-sm font-medium transition-all
                ${availableDays.includes(day) ? 'bg-blue-100 text-blue-700 hover:bg-blue-300' : 'text-gray-500'}
                ${selectedDate === day ? 'bg-blue-600 text-white' : ''}`}
              disabled={!availableDays.includes(day)}
              onClick={() => setSelectedDate(day)}
            >
              {day}
            </button>
          ))}
        </div>
        <div className="mt-4">
          <label htmlFor="timezone" className="font-medium text-sm mr-2">Time zone</label>
          <select
            id="timezone"
            className="p-1 rounded bg-gray-100 text-gray-700"
            value={timezone}
            onChange={e => setTimezone(e.target.value)}
            title="Select your time zone"
          >
            <option>Eastern time - US & Canada</option>
            <option>Central time - US & Canada</option>
            <option>Pacific time - US & Canada</option>
            <option>GMT</option>
          </select>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
        <div className="mb-4 text-lg font-medium">
          {selectedDate ? `Monday, July ${selectedDate}` : 'Select a date'}
        </div>
        <div className="flex flex-col gap-3 w-full max-w-xs">
          {timeSlots.map(slot => (
            <div key={slot} className="flex gap-2">
              <button
                className={`flex-1 py-2 rounded border text-center font-medium transition-all
                  ${selectedTime === slot ? 'bg-blue-700 text-white border-blue-700' : 'bg-white text-blue-700 border-blue-300 hover:bg-blue-100'}`}
                onClick={() => setSelectedTime(slot)}
              >
                {slot}
              </button>
              {selectedTime === slot && (
                <button className="px-4 py-2 rounded bg-blue-600 text-white font-semibold shadow" onClick={() => alert(`Confirmed: ${selectedDate} at ${selectedTime}`)}>
                  Confirm
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
