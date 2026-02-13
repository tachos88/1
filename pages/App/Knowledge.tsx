
import React, { useState, useEffect } from 'react';
import { KnowledgeItem } from '../../types';
import { ContentRepository } from '../../repositories/ContentRepository';

const KnowledgeList: React.FC = () => {
  const [items, setItems] = useState<KnowledgeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetch = async () => {
      const res = await ContentRepository.getKnowledge();
      if (res.success) setItems(res.data);
      setLoading(false);
    };
    fetch();
  }, []);

  const filteredItems = items.filter(i => 
    i.title.toLowerCase().includes(filter.toLowerCase()) || 
    i.category.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="bg-stone-50 min-h-screen pb-32">
      <div className="bg-white border-b border-stone-200 pt-16 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-stone-900 mb-4 tracking-tight">Kennisbank</h1>
          <p className="text-stone-500 text-lg">Wetenschappelijk onderbouwde informatie over jouw leefstijl.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-12">
          <input 
            type="text" 
            placeholder="Zoek artikelen..."
            className="w-full max-w-md p-4 rounded-2xl border border-stone-200 focus:ring-2 focus:ring-teal-500 outline-none shadow-sm"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="h-64 bg-stone-200 animate-pulse rounded-3xl"></div>
            <div className="h-64 bg-stone-200 animate-pulse rounded-3xl"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {filteredItems.map(item => (
              <div key={item.id} className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm hover:shadow-md transition-shadow">
                <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full mb-4 uppercase tracking-widest">{item.category}</span>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-stone-600 mb-8 line-clamp-3">{item.content}</p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map(tag => (
                    <span key={tag} className="text-xs text-stone-400 font-medium">#{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default KnowledgeList;
