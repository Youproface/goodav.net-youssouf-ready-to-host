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
