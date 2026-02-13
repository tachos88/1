
import React, { useState, useEffect } from 'react';
import { Recipe } from '../../types';
import { ContentRepository } from '../../repositories/ContentRepository';

const RecipeList: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const res = await ContentRepository.getRecipes();
      if (res.success) setRecipes(res.data);
      setLoading(false);
    };
    fetch();
  }, []);

  return (
    <div className="bg-stone-50 min-h-screen pb-32">
      <div className="bg-white border-b border-stone-200 pt-16 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-stone-900 mb-4 tracking-tight">Gezonde Recepten</h1>
          <p className="text-stone-500 text-lg">Eenvoudig, voedzaam en boordevol energie.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {loading ? (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="h-80 bg-stone-200 animate-pulse rounded-3xl"></div>
            <div className="h-80 bg-stone-200 animate-pulse rounded-3xl"></div>
            <div className="h-80 bg-stone-200 animate-pulse rounded-3xl"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recipes.map(recipe => (
              <div key={recipe.id} className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
                <div className="aspect-video bg-stone-100 relative">
                   <div className="absolute inset-0 flex items-center justify-center text-stone-300">
                     <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                     </svg>
                   </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold">{recipe.title}</h3>
                    <span className="text-xs font-bold text-stone-400">{recipe.timeMinutes} min</span>
                  </div>
                  <div className="flex gap-4 mb-6">
                    <div className="text-center">
                      <p className="text-xs text-stone-400 uppercase font-bold">kcal</p>
                      <p className="font-bold text-stone-800">{recipe.kcal}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-stone-400 uppercase font-bold">Eiwit</p>
                      <p className="font-bold text-stone-800">{recipe.protein}g</p>
                    </div>
                  </div>
                  <button className="w-full bg-orange-50 text-orange-700 py-3 rounded-xl font-bold group-hover:bg-orange-600 group-hover:text-white transition-all">
                    Bekijk Recept
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

export default RecipeList;
