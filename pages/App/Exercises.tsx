
import React, { useState, useEffect } from 'react';
import { Exercise } from '../../types';
import { ContentRepository } from '../../repositories/ContentRepository';

const ExerciseList: React.FC = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const res = await ContentRepository.getExercises();
      if (res.success) setExercises(res.data);
      setLoading(false);
    };
    fetch();
  }, []);

  return (
    <div className="bg-stone-50 min-h-screen pb-32">
      <div className="bg-white border-b border-stone-200 pt-16 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-stone-900 mb-4 tracking-tight">Oefeningen</h1>
          <p className="text-stone-500 text-lg">Beweging die goed voelt en jouw flow ondersteunt.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {loading ? (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="h-64 bg-stone-200 animate-pulse rounded-3xl"></div>
            <div className="h-64 bg-stone-200 animate-pulse rounded-3xl"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {exercises.map(ex => (
              <div key={ex.id} className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm flex flex-col md:flex-row gap-8 items-center">
                <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <span className="text-3xl">🧘</span>
                </div>
                <div className="flex-grow">
                  <div className="flex gap-2 mb-2">
                    <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded uppercase tracking-widest">{ex.type}</span>
                    <span className="text-[10px] font-bold bg-stone-100 text-stone-500 px-2 py-0.5 rounded uppercase tracking-widest">{ex.level}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{ex.title}</h3>
                  <p className="text-stone-500 text-sm mb-4">{ex.durationMinutes} minuten • {ex.mobilityFriendly ? 'Rolstoelvriendelijk' : 'Mobiel'}</p>
                  <button className="bg-stone-800 text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-stone-700 transition-colors">
                    Start Oefening
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExerciseList;
