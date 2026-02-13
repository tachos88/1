
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { DailyCard, User } from '../../types';
import { ContentRepository } from '../../repositories/ContentRepository';

const DailyCardDetail: React.FC<{ user: User }> = ({ user }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [card, setCard] = useState<DailyCard | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState<any>(null);
  const [reflection, setReflection] = useState('');

  useEffect(() => {
    const fetchCard = async () => {
      const res = await ContentRepository.getDailyCards();
      if (res.success) {
        const found = res.data.find(c => c.id === id);
        setCard(found || null);
        if (found?.actionType === 'slider') setValue(5);
        if (found?.actionType === 'check') setValue(false);
      }
      setLoading(false);
    };
    fetchCard();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!card) return;

    setSubmitting(true);
    const res = await ContentRepository.saveCompletion({
      uid: user.id,
      date: new Date().toISOString().split('T')[0],
      cardId: card.id,
      value: value,
      reflection: reflection,
      createdAt: new Date().toISOString()
    });

    if (res.success) {
      navigate('/app');
    }
    setSubmitting(false);
  };

  if (loading) return <div className="p-20 text-center animate-pulse">Kaart laden...</div>;
  if (!card) return <div className="p-20 text-center">Kaart niet gevonden.</div>;

  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      <div className="max-w-3xl mx-auto px-6 pt-12">
        <Link to="/app" className="inline-flex items-center text-stone-500 hover:text-stone-800 mb-8 transition-colors">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Terug naar Dashboard
        </Link>

        <div className="bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden">
          <div className="h-4 bg-teal-600"></div>
          <div className="p-8 md:p-12">
            <span className="inline-block px-3 py-1 bg-teal-100 text-teal-700 text-xs font-bold rounded-full mb-6 uppercase tracking-widest">
              {card.category}
            </span>
            <h1 className="text-4xl font-bold text-stone-900 mb-6">{card.title}</h1>
            <p className="text-stone-600 text-xl leading-relaxed mb-12">{card.body}</p>

            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="bg-stone-50 p-8 rounded-2xl border border-stone-100">
                <label className="block text-lg font-bold text-stone-800 mb-6">
                  {card.actionLabel}
                </label>

                {card.actionType === 'check' && (
                  <button
                    type="button"
                    onClick={() => setValue(!value)}
                    className={`w-full p-6 rounded-2xl border-2 flex items-center justify-center gap-4 transition-all ${
                      value ? 'bg-teal-600 border-teal-600 text-white shadow-lg shadow-teal-600/20' : 'bg-white border-stone-200 text-stone-400 hover:border-stone-300'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${value ? 'border-white' : 'border-stone-200'}`}>
                      {value && (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className="text-xl font-bold">{value ? 'Voldooid!' : 'Klik om af te vinken'}</span>
                  </button>
                )}

                {card.actionType === 'slider' && (
                  <div className="space-y-4">
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={value || 5}
                      onChange={(e) => setValue(parseInt(e.target.value))}
                      className="w-full h-3 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                    />
                    <div className="flex justify-between text-sm font-bold text-stone-400">
                      <span>{card.minLabel || '1'}</span>
                      <span className="text-teal-600 text-2xl font-black">{value || 5}</span>
                      <span>{card.maxLabel || '10'}</span>
                    </div>
                  </div>
                )}

                {card.actionType === 'text' && (
                  <textarea
                    className="w-full p-4 rounded-xl border border-stone-200 focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                    placeholder="Deel je ervaring..."
                    value={value || ''}
                    onChange={(e) => setValue(e.target.value)}
                    rows={3}
                  />
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-stone-700 mb-3">Persoonlijke reflectie (optioneel)</label>
                <textarea
                  className="w-full p-4 rounded-xl border border-stone-200 focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                  placeholder="Hoe voel je je hierbij?"
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value)}
                  rows={4}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-stone-800 text-white py-5 rounded-2xl font-bold text-lg hover:bg-stone-700 transition-all disabled:opacity-50 shadow-xl"
              >
                {submitting ? 'Opslaan...' : 'Vandaag voltooien'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyCardDetail;
