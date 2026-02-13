
import React, { useState } from 'react';
import { LeadRepository } from '../../repositories/LeadRepository';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    // Simpele validatie
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = 'Naam is verplicht';
    if (!formData.email) newErrors.email = 'Email is verplicht';
    if (!formData.message) newErrors.message = 'Bericht is verplicht';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    const result = await LeadRepository.submit({
      ...formData,
      createdAt: new Date().toISOString()
    });

    if (result.success) {
      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    } else {
      setErrors({ form: 'Er ging iets mis bij het verzenden. Controleer je verbinding.' });
    }
    setLoading(false);
  };

  return (
    <div className="py-24 px-6 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">Neem contact op</h1>
      <p className="text-stone-600 mb-12">Heb je vragen over het traject? We helpen je graag.</p>

      {success ? (
        <div className="bg-green-100 border border-green-200 text-green-800 p-8 rounded-2xl text-center">
          <h2 className="text-2xl font-bold mb-2">Bedankt voor je interesse!</h2>
          <p>We nemen binnen 24 uur contact met je op.</p>
          <button onClick={() => setSuccess(false)} className="mt-6 text-green-800 underline font-medium">Nog een bericht sturen</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {errors.form && (
            <div className="p-4 bg-red-100 border border-red-200 text-red-800 rounded-lg text-sm font-medium">
              {errors.form}
            </div>
          )}
          
          <div>
            <label className="block text-sm font-bold text-stone-700 mb-2">Volledige naam</label>
            <input
              type="text"
              className={`w-full p-4 rounded-xl border ${errors.name ? 'border-red-500' : 'border-stone-200'} focus:ring-2 focus:ring-teal-500 transition-all`}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-stone-700 mb-2">E-mailadres</label>
            <input
              type="email"
              className={`w-full p-4 rounded-xl border ${errors.email ? 'border-red-500' : 'border-stone-200'} focus:ring-2 focus:ring-teal-500 transition-all`}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-stone-700 mb-2">Je bericht</label>
            <textarea
              rows={5}
              className={`w-full p-4 rounded-xl border ${errors.message ? 'border-red-500' : 'border-stone-200'} focus:ring-2 focus:ring-teal-500 transition-all`}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
            {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-stone-800 text-white py-4 rounded-xl font-bold hover:bg-stone-700 transition-all disabled:opacity-50"
          >
            {loading ? 'Verzenden...' : 'Verstuur Bericht'}
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactPage;
