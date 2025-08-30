import { useState } from "react";
import {
  Video,
  Camera,
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
  const [timezone, setTimezone] = useState('Africa/Kigali');
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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [organization, setOrganization] = useState("");
  const [project, setProject] = useState("");
  const [submitStatus, setSubmitStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleFormSubmit(e) {
    e.preventDefault();
    if (!name || !email || !selectedDate || !selectedTime) {
      setSubmitStatus('Please fill in all required fields.');
      return;
    }
    setSubmitting(true);
    setSubmitStatus('Submitting...');
    const bookingData = {
      name,
      email,
      phone,
      organization,
      project,
      date: selectedDate ? `${selectedDate.year}-${selectedDate.month+1}-${selectedDate.day}` : '',
      time: selectedTime,
      timezone,
    };
    try {
      const res = await fetch('http://localhost:4000/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });
      const result = await res.json();
      if (result.success) {
        setSubmitStatus('Booking submitted successfully!');
        // Optionally reset form fields here
      } else {
        setSubmitStatus(result.error || 'Submission failed.');
      }
    } catch (err) {
      setSubmitStatus('Network error. Please try again.');
    }
    setSubmitting(false);
  }
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="w-full md:w-1/2">
        <h3 className="text-xl font-semibold mb-4">Select a Date & Time</h3>
         {/* Calendar UI: dynamic, only current/future dates selectable */}
         <div className="flex items-center justify-between mb-2">
           <button
             className="text-lg px-2"
             onClick={() => {
               if (calendarMonth === 0) {
                 setCalendarMonth(11);
                 setCalendarYear(calendarYear - 1);
               } else {
                 setCalendarMonth(calendarMonth - 1);
               }
             }}
             disabled={calendarYear === today.getFullYear() && calendarMonth === today.getMonth()}
           >&#60;</button>
           <span className="font-medium">{new Date(calendarYear, calendarMonth).toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
           <button
             className="text-lg px-2"
             onClick={() => {
               if (calendarMonth === 11) {
                 setCalendarMonth(0);
                 setCalendarYear(calendarYear + 1);
               } else {
                 setCalendarMonth(calendarMonth + 1);
               }
             }}
           >&#62;</button>
         </div>
         <div className="grid grid-cols-7 gap-2 mb-2 text-center text-gray-400 text-xs">
           {['SUN','MON','TUE','WED','THU','FRI','SAT'].map(d => <div key={d}>{d}</div>)}
         </div>
         <div className="grid grid-cols-7 gap-2 text-center">
           {calendarGrid.flat().map((day, i) => (
             day ? (
               <button
                 key={i}
                 className={`rounded-full h-8 w-8 flex items-center justify-center text-sm font-bold transition-all
                   ${isPastDate(calendarYear, calendarMonth, day) ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-orange-100 text-orange-700 hover:bg-orange-300'}
                   ${selectedDate && selectedDate.day === day && selectedDate.month === calendarMonth && selectedDate.year === calendarYear ? 'bg-orange-600 text-white ring-4 ring-orange-400 shadow-lg scale-110 z-10' : ''}`}
                 disabled={isPastDate(calendarYear, calendarMonth, day)}
                 onClick={() => setSelectedDate({ day, month: calendarMonth, year: calendarYear })}
                 aria-label={isPastDate(calendarYear, calendarMonth, day) ? 'Past date not selectable' : `Select ${day} ${calendarMonth+1} ${calendarYear}`}
               >
                 {day}
               </button>
             ) : <div key={i}></div>
           ))}
         </div>
         <div className="mt-4">
           <label htmlFor="timezone" className="font-medium text-sm mr-2">Time zone</label>
           <select
             id="timezone"
             className="p-1 rounded bg-[#1b1b1d] text-orange-500 border border-orange-500"
             value={timezone}
             onChange={e => setTimezone(e.target.value)}
             title="Select your time zone"
           >
             {timeZones.map(tz => (
               <option key={tz} value={tz}>{tz}</option>
             ))}
           </select>
         </div>
        {/* Contact & Project Info Section */}
        <div className="w-full mt-8">
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Full Name *"
              className="p-3 rounded bg-[#1b1b1d] border border-orange-500 focus:outline-none w-full text-white placeholder-orange-300"
            />
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email Address *"
              className="p-3 rounded bg-[#1b1b1d] border border-orange-500 focus:outline-none w-full text-white placeholder-orange-300"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="Phone Number"
              className="p-3 rounded bg-[#1b1b1d] border border-orange-500 focus:outline-none w-full text-white placeholder-orange-300"
            />
            <input
              type="text"
              value={organization}
              onChange={e => setOrganization(e.target.value)}
              placeholder="Organization"
              className="p-3 rounded bg-[#1b1b1d] border border-orange-500 focus:outline-none w-full text-white placeholder-orange-300"
            />
          </div>
          <textarea
            value={project}
            onChange={e => setProject(e.target.value)}
            placeholder="Tell us more about your project vision..."
            className="p-3 rounded bg-[#1b1b1d] border border-orange-500 focus:outline-none w-full text-white placeholder-orange-300 mb-4"
            rows={4}
          />
        {/* Schedule Consultation Button and feedback */}
        <div className="flex flex-col items-center mt-6">
          <button
            onClick={handleFormSubmit}
            className="flex items-center px-6 py-2 bg-orange-600 rounded-lg hover:bg-orange-700 text-white font-semibold"
            disabled={submitting}
          >
            <Calendar className="w-5 h-5 mr-2" />
            <span>Schedule Consultation</span>
          </button>
          {submitStatus && <div className="mt-2 text-orange-400 text-sm text-center">{submitStatus}</div>}
        </div>
        </div>
      </div>
       <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
         <div className="mb-4 text-lg font-medium">
           {selectedDate ? `${new Date(selectedDate.year, selectedDate.month, selectedDate.day).toLocaleDateString()}` : 'Select a date'}
         </div>
         <div className="flex flex-col gap-3 w-full max-w-xs">
           {/* Time slots: disabled until date selected */}
           {timeSlots.map(slot => (
             <div key={slot} className="flex gap-2">
               <button
                 className={`flex-1 py-2 rounded border text-center font-medium transition-all
                   ${selectedDate ? (selectedTime === slot ? 'bg-orange-700 text-white border-orange-700' : 'bg-[#1b1b1d] text-orange-500 border-orange-500 hover:bg-orange-100') : 'bg-gray-800 text-gray-500 border-gray-700 cursor-not-allowed'}`}
                 onClick={() => selectedDate && setSelectedTime(slot)}
                 disabled={!selectedDate}
               >
                 {slot}
                 {/* Show converted time if timezone is not Africa/Kigali */}
                 {timezone !== 'Africa/Kigali' && selectedDate && (
                   <span className="block text-xs text-orange-300 mt-1">
                     {(() => {
                       const dateObj = new Date(selectedDate.year, selectedDate.month, selectedDate.day);
                       return getConvertedTime(slot, 'Africa/Kigali', timezone, dateObj);
                     })()} ({timezone})
                   </span>
                 )}
               </button>
               {selectedTime === slot && selectedDate && (
                 <button className="px-4 py-2 rounded bg-orange-600 text-white font-semibold shadow" onClick={() => alert(`Confirmed: ${selectedDate.day}/${selectedDate.month+1}/${selectedDate.year} at ${selectedTime}`)}>
                   Confirm
                 </button>
               )}
             </div>
           ))}
         </div>
         {/* Feedback and validation comments */}
         {!selectedDate && <div className="text-orange-400 mt-4 text-sm">Please select a date to view available times.</div>}
         {selectedDate && !selectedTime && <div className="text-orange-400 mt-4 text-sm">Please select a time slot to confirm your booking.</div>}
         {selectedDate && selectedTime && <div className="mt-4 text-sm font-semibold text-orange-300">Ready to confirm: {new Date(selectedDate.year, selectedDate.month, selectedDate.day).toLocaleDateString()} at {selectedTime} ({timezone})</div>}
       </div>
    </div>
  );
}
