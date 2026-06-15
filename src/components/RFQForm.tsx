import { useState } from 'react';
import { Check } from 'lucide-react';

export default function RFQForm() {
  const [rfqName, setRfqName] = useState('');
  const [rfqEmail, setRfqEmail] = useState('');
  const [rfqPhone, setRfqPhone] = useState('');
  const [rfqCountry, setRfqCountry] = useState('');
  const [rfqSubmitted, setRfqSubmitted] = useState(false);

  return (
    <section id="rfq" className="py-24 bg-warm-cream text-text-strong font-sans border-t border-black/4">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-10 grid lg:grid-cols-12 gap-16 items-start">

        {/* Left Column: Sourcing Desk Copy */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <span className="text-xs font-bold text-coffee-roast tracking-wider uppercase mb-3 block font-sans">
            Direct Export Desk
          </span>
          <h2 className="font-display font-normal text-3xl sm:text-4xl text-espresso-dark leading-[1.05] tracking-[-0.04em] mb-4">
            Partner with Seedicon
          </h2>
          <p className="text-text-muted text-sm leading-relaxed mb-8 font-medium">
            We build B2B trade supply chains. Submit your parameters, and our trade officers will compile pricing and logistics details within 24 hours.
          </p>
        </div>

        {/* Right Column: Premium RFQ Form Card */}
        <div className="lg:col-span-7 w-full">
          <div className="bg-white rounded-2xl border border-black/6 p-6 sm:p-8 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.06)] min-h-[380px] flex flex-col justify-center transition-all duration-500">
            {rfqSubmitted ? (
              /* Success Screen */
              <div className="text-center py-6 flex flex-col items-center animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-soft-green flex items-center justify-center mb-6 shadow-sm">
                  <Check className="w-8 h-8 text-export-green stroke-[3px]" />
                </div>
                <h3 className="font-display font-normal text-3xl text-espresso-dark mb-4">
                  RFQ submitted
                </h3>
                <p className="text-text-muted text-sm leading-relaxed max-w-md mx-auto mb-8 font-medium">
                  Thank you! Our B2B export desk has received your sourcing specifications. A trade officer will compile customized container pricing specs and reach out via email or your phone number within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setRfqName('');
                    setRfqEmail('');
                    setRfqPhone('');
                    setRfqCountry('');
                    setRfqSubmitted(false);
                  }}
                  className="bg-deep-forest hover:bg-export-green text-white text-xs font-bold px-6 py-3 rounded-xl transition-all duration-300 transform active:scale-97 cursor-pointer"
                >
                  Submit another sourcing RFQ
                </button>
              </div>
            ) : (
              /* RFQ Form */
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setRfqSubmitted(true);
                }}
                className="space-y-6"
              >
                <h3 className="text-sm font-bold text-coffee-roast uppercase tracking-wider mb-6 font-sans">
                  Request sourcing quote
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Contact Person */}
                  <div>
                    <label className="text-[10px] font-bold text-coffee-roast/70 block mb-2 uppercase tracking-wider font-sans">
                      Contact Person
                    </label>
                    <input
                      type="text"
                      required
                      value={rfqName}
                      onChange={(e) => setRfqName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full bg-[#fcfbf9] border border-black/10 rounded-xl px-5 py-3.5 text-xs font-sans text-espresso-dark placeholder-espresso-dark/30 focus:outline-none focus:border-coffee-roast focus:ring-2 focus:ring-latte-accent/15 transition-all duration-300"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="text-[10px] font-bold text-coffee-roast/70 block mb-2 uppercase tracking-wider font-sans">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={rfqEmail}
                      onChange={(e) => setRfqEmail(e.target.value)}
                      placeholder="buyer@roaster.com"
                      className="w-full bg-[#fcfbf9] border border-black/10 rounded-xl px-5 py-3.5 text-xs font-sans text-espresso-dark placeholder-espresso-dark/30 focus:outline-none focus:border-coffee-roast focus:ring-2 focus:ring-latte-accent/15 transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Phone Number */}
                  <div>
                    <label className="text-[10px] font-bold text-coffee-roast/70 block mb-2 uppercase tracking-wider font-sans">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={rfqPhone}
                      onChange={(e) => setRfqPhone(e.target.value)}
                      placeholder="+1 (555) 123-4567"
                      className="w-full bg-[#fcfbf9] border border-black/10 rounded-xl px-5 py-3.5 text-xs font-sans text-espresso-dark placeholder-espresso-dark/30 focus:outline-none focus:border-coffee-roast focus:ring-2 focus:ring-latte-accent/15 transition-all duration-300"
                    />
                  </div>

                  {/* Destination Country */}
                  <div>
                    <label className="text-[10px] font-bold text-coffee-roast/70 block mb-2 uppercase tracking-wider font-sans">
                      Destination Country
                    </label>
                    <div className="relative">
                      <select
                        required
                        value={rfqCountry}
                        onChange={(e) => setRfqCountry(e.target.value)}
                        className="w-full bg-[#fcfbf9] border border-black/10 rounded-xl pl-5 pr-10 py-3.5 text-xs font-sans text-espresso-dark appearance-none focus:outline-none focus:border-coffee-roast focus:ring-2 focus:ring-latte-accent/15 transition-all duration-300 cursor-pointer"
                      >
                        <option value="" disabled>Select destination country...</option>
                        <option value="United States">United States</option>
                        <option value="Germany">Germany</option>
                        <option value="Japan">Japan</option>
                        <option value="Italy">Italy</option>
                        <option value="Belgium">Belgium</option>
                        <option value="South Korea">South Korea</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Other">Other / International</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-coffee-roast/60">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-linear-to-br from-deep-forest via-export-green to-action-green text-white text-sm font-bold py-3 px-5 rounded-xl transition-all duration-300 transform active:scale-97 cursor-pointer shadow-sm shadow-deep-forest/10 shiny-gradient-border"
                  >
                    Submit RFQ
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
