
import React from 'react';
import { PRICING_CONFIG } from '../../config/pricing';
import { Link } from 'react-router-dom';

const PricingPage: React.FC = () => {
  // Test scenario: Als de config ontbreekt (simulatie)
  const config = PRICING_CONFIG;
  if (!config) {
    return (
      <div className="p-20 text-center text-red-600 font-bold">
        Error: Pricing configuratie ontbreekt.
      </div>
    );
  }

  return (
    <section className="py-24 px-6 bg-stone-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">Kies jouw traject</h1>
          <p className="text-xl text-stone-600 max-w-2xl mx-auto">Kies het programma dat het beste bij jouw tempo en behoeften past.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Plan 4 */}
          <div className="bg-white p-12 rounded-3xl border border-stone-200 shadow-sm flex flex-col">
            <h2 className="text-2xl font-bold mb-2">4 Weken Start</h2>
            <p className="text-stone-500 mb-8">{config.plan4.description}</p>
            <div className="text-5xl font-bold mb-10">€{config.plan4.price}<span className="text-lg font-normal text-stone-400"> /traject</span></div>
            <ul className="space-y-4 mb-12 flex-grow">
              {config.plan4.features.map((f, i) => (
                <li key={i} className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-teal-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-stone-700">{f}</span>
                </li>
              ))}
            </ul>
            <Link to="/contact?plan=4w" className="block w-full text-center bg-stone-100 text-stone-800 py-4 rounded-xl font-bold hover:bg-stone-200 transition-colors">
              Meld je aan
            </Link>
          </div>

          {/* Plan 8 */}
          <div className="bg-teal-900 p-12 rounded-3xl text-white shadow-xl relative overflow-hidden flex flex-col">
            <div className="absolute top-0 right-0 bg-teal-500 px-6 py-2 rounded-bl-2xl text-sm font-bold tracking-widest uppercase">Meest Gekozen</div>
            <h2 className="text-2xl font-bold mb-2">8 Weken Transformatie</h2>
            <p className="text-teal-200 mb-8">{config.plan8.description}</p>
            <div className="text-5xl font-bold mb-10">€{config.plan8.price}<span className="text-lg font-normal text-teal-400"> /traject</span></div>
            <ul className="space-y-4 mb-12 flex-grow">
              {config.plan8.features.map((f, i) => (
                <li key={i} className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-teal-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <Link to="/contact?plan=8w" className="block w-full text-center bg-teal-500 text-white py-4 rounded-xl font-bold hover:bg-teal-400 transition-colors shadow-lg">
              Kies dit Plan
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingPage;
