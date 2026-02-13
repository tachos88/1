
import { APP_CONFIG } from '../config/appConfig';
import { DailyCard, KnowledgeItem, Recipe, Exercise, Result, CardCompletion } from '../types';
import { ErrorService } from '../services/errorService';

const MOCK_CARDS: DailyCard[] = [
  // --- SLAAP (10 kaarten) ---
  { id: 's1', title: 'Schermvrij Uur', body: 'Leg alle digitale schermen minimaal 60 minuten voor je gaat slapen weg.', category: 'slaap', mobilityFriendly: true, actionType: 'check', actionLabel: 'Gedaan' },
  { id: 's2', title: 'Slaapkwaliteit', body: 'Hoe goed heb je vannacht geslapen op een schaal van 1 tot 10?', category: 'slaap', mobilityFriendly: true, actionType: 'slider', actionLabel: 'Score', minLabel: 'Slecht', maxLabel: 'Uitstekend' },
  { id: 's3', title: 'Cafeïne-stop', body: 'Drink na 14:00 uur geen koffie of energiedrankjes meer.', category: 'slaap', mobilityFriendly: true, actionType: 'check', actionLabel: 'Gelukt' },
  { id: 's4', title: 'Vaste Wektijd', body: 'Sta morgen op precies hetzelfde tijdstip op als vandaag.', category: 'slaap', mobilityFriendly: true, actionType: 'check', actionLabel: 'Ik doe mee' },
  { id: 's5', title: 'Koele Slaapkamer', body: 'Zorg dat je slaapkamer goed geventileerd en rond de 18 graden is.', category: 'slaap', mobilityFriendly: true, actionType: 'check', actionLabel: 'In orde' },
  { id: 's6', title: 'Dankbaarheid', body: 'Schrijf drie dingen op waar je vandaag dankbaar voor bent voordat je gaat slapen.', category: 'slaap', mobilityFriendly: true, actionType: 'text', actionLabel: 'Mijn momenten' },
  { id: 's7', title: 'Magnesium-boost', body: 'Eet bij het avondeten iets met veel magnesium (bijv. spinazie of pompoenpitten).', category: 'slaap', mobilityFriendly: true, actionType: 'check', actionLabel: 'Gedaan' },
  { id: 's8', title: 'Geen Dutjes', body: 'Probeer vandaag overdag niet te slapen om je slaapdruk op te bouwen.', category: 'slaap', mobilityFriendly: true, actionType: 'check', actionLabel: 'Volgehouden' },
  { id: 's9', title: 'Licht in de Ochtend', body: 'Stel je ogen binnen 30 minuten na het opstaan bloot aan natuurlijk daglicht.', category: 'slaap', mobilityFriendly: true, actionType: 'check', actionLabel: 'Gedaan' },
  { id: 's10', title: 'Avondritueel', body: 'Voer vanavond een vast ritueel uit (bijv. lezen of mediteren) voor het slapen.', category: 'slaap', mobilityFriendly: true, actionType: 'check', actionLabel: 'Ritueel voltooid' },

  // --- STRESS / RUST (10 kaarten) ---
  { id: 'st1', title: '3-Minuten Ademhaling', body: 'Focus je drie minuten lang volledig op je in- en uitademing.', category: 'rust', mobilityFriendly: true, actionType: 'check', actionLabel: 'Gedaan' },
  { id: 'st2', title: 'Zintuigen-Check', body: 'Noem 5 dingen die je ziet, 4 die je hoort en 3 die je voelt.', category: 'rust', mobilityFriendly: true, actionType: 'text', actionLabel: 'Wat ervaar je?' },
  { id: 'st3', title: 'Nee Zeggen', body: 'Zeg vandaag eens vriendelijk "nee" tegen een verzoek dat je te veel stress geeft.', category: 'rust', mobilityFriendly: true, actionType: 'check', actionLabel: 'Grenzen bewaakt' },
  { id: 'st4', title: 'Digitale Detox', body: 'Zet je telefoon voor de komende 2 uur volledig op "Niet Storen".', category: 'rust', mobilityFriendly: true, actionType: 'check', actionLabel: 'Focus aan' },
  { id: 'st5', title: 'Stressniveau', body: 'Hoe ervaar je je huidige stressniveau op dit moment?', category: 'rust', mobilityFriendly: true, actionType: 'slider', actionLabel: 'Niveau', minLabel: 'Zen', maxLabel: 'Hoog' },
  { id: 'st6', title: 'Buitenlucht', body: 'Ga 10 minuten naar buiten zonder telefoon of afleiding.', category: 'rust', mobilityFriendly: true, actionType: 'check', actionLabel: 'Frisse neus gehaald' },
  { id: 'st7', title: 'Eén Ding Tegelijk', body: 'Voer vandaag een taak uit zonder te multitasken.', category: 'rust', mobilityFriendly: true, actionType: 'check', actionLabel: 'Single-tasking gelukt' },
  { id: 'st8', title: 'Zachte Muziek', body: 'Luister 15 minuten naar ontspannende muziek of natuurlijke geluiden.', category: 'rust', mobilityFriendly: true, actionType: 'check', actionLabel: 'Ontspannen' },
  { id: 'st9', title: 'Lachen', body: 'Zoek een grappige video op of bel een vriend waar je om kunt lachen.', category: 'rust', mobilityFriendly: true, actionType: 'check', actionLabel: 'Gelachen' },
  { id: 'st10', title: 'Reflectie', body: 'Wat was het meest ontspannen moment van je dag?', category: 'rust', mobilityFriendly: true, actionType: 'text', actionLabel: 'Mijn rustmoment' },

  // --- BEWEGEN (10 kaarten) ---
  { id: 'b1', title: 'Stappendoel', body: 'Probeer vandaag minimaal 7.500 stappen te zetten.', category: 'beweging', mobilityFriendly: false, actionType: 'check', actionLabel: 'Doel bereikt' },
  { id: 'b2', title: 'Trap in plaats van Lift', body: 'Neem vandaag bij elke gelegenheid de trap.', category: 'beweging', mobilityFriendly: false, actionType: 'check', actionLabel: 'Trap genomen' },
  { id: 'b3', title: 'Mobiliteits-Stretch', body: 'Doe een korte stretch-sessie van 5 minuten voor je rug en nek.', category: 'beweging', mobilityFriendly: true, actionType: 'check', actionLabel: 'Gestrekt' },
  { id: 'b4', title: 'Middagwandeling', body: 'Maak na de lunch een wandeling van minimaal 15 minuten.', category: 'beweging', mobilityFriendly: false, actionType: 'check', actionLabel: 'Gewandeld' },
  { id: 'b5', title: 'Staand Werken', body: 'Probeer elk uur minimaal 10 minuten te staan of te lopen.', category: 'beweging', mobilityFriendly: true, actionType: 'slider', actionLabel: 'Aantal keer gestaan', minLabel: '0', maxLabel: '10' },
  { id: 'b6', title: 'Balans-Oefening', body: 'Poets je tanden terwijl je op één been staat (wissel halverwege).', category: 'beweging', mobilityFriendly: true, actionType: 'check', actionLabel: 'Balans gehouden' },
  { id: 'b7', title: 'Fietsmoment', body: 'Pak voor een kleine boodschap de fiets in plaats van de auto.', category: 'beweging', mobilityFriendly: false, actionType: 'check', actionLabel: 'Gefietst' },
  { id: 'b8', title: 'Krachtmoment', body: 'Doe 10 squats of 10 push-ups tegen het aanrecht.', category: 'beweging', mobilityFriendly: false, actionType: 'check', actionLabel: 'Kracht getoond' },
  { id: 'b9', title: 'Actief Huishouden', body: 'Zet een muziekje op en doe 15 minuten fanatiek huishoudelijk werk.', category: 'beweging', mobilityFriendly: false, actionType: 'check', actionLabel: 'Gedaan' },
  { id: 'b10', title: 'Dansen', body: 'Dans op je favoriete nummer alsof niemand kijkt.', category: 'beweging', mobilityFriendly: true, actionType: 'check', actionLabel: 'Gedanst' },

  // --- VOEDING (10 kaarten) ---
  { id: 'v1', title: 'Regenboog op je bord', body: 'Zorg dat je lunch of diner minimaal 3 verschillende kleuren groenten bevat.', category: 'voeding', mobilityFriendly: true, actionType: 'check', actionLabel: 'Kleurrijk gegeten' },
  { id: 'v2', title: 'Hydratatie-Check', body: 'Hoeveel glazen water heb je vandaag gedronken?', category: 'voeding', mobilityFriendly: true, actionType: 'slider', actionLabel: 'Glazen', minLabel: '0', maxLabel: '12' },
  { id: 'v3', title: 'Eiwitrijk Ontbijt', body: 'Begin je dag met een bron van eiwitten (ei, kwark, noten).', category: 'voeding', mobilityFriendly: true, actionType: 'check', actionLabel: 'Eiwitrijk gestart' },
  { id: 'v4', title: 'Mindful Eten', body: 'Eet één maaltijd vandaag zonder afleiding van TV of telefoon.', category: 'voeding', mobilityFriendly: true, actionType: 'check', actionLabel: 'Aandachtig gegeten' },
  { id: 'v5', title: 'Suikervrije Dag', body: 'Probeer vandaag geen toegevoegde suikers of frisdrank te consumeren.', category: 'voeding', mobilityFriendly: true, actionType: 'check', actionLabel: 'Suikervrij' },
  { id: 'v6', title: 'Zelf Koken', body: 'Bereid vandaag je eigen maaltijd met verse ingrediënten.', category: 'voeding', mobilityFriendly: true, actionType: 'check', actionLabel: 'Zelf gekookt' },
  { id: 'v7', title: 'Gezonde Snack', body: 'Vervang een ongezonde snack door een handje noten of een stuk fruit.', category: 'voeding', mobilityFriendly: true, actionType: 'check', actionLabel: 'Gezonde keuze' },
  { id: 'v8', title: 'Vezel-Rijk', body: 'Voeg extra vezels toe aan je dag (volkoren, bonen of zaden).', category: 'voeding', mobilityFriendly: true, actionType: 'check', actionLabel: 'Vezels binnen' },
  { id: 'v9', title: 'Verzadigingsgevoel', body: 'Stop met eten wanneer je voor 80% vol zit.', category: 'voeding', mobilityFriendly: true, actionType: 'check', actionLabel: 'Gedaan' },
  { id: 'v10', title: 'Nieuw Ingrediënt', body: 'Probeer vandaag een gezonde groente of specerij die je zelden eet.', category: 'voeding', mobilityFriendly: true, actionType: 'text', actionLabel: 'Wat heb je geprobeerd?' },
];

const MOCK_KNOWLEDGE: KnowledgeItem[] = [
  { id: 'k1', title: 'Het belang van slaap', category: 'Slaap', content: 'Goede nachtrust herstelt de hersenen...', tags: ['herstel', 'energie'] },
  { id: 'k2', title: 'Eiwitten voor spierherstel', category: 'Voeding', content: 'Eiwitten zijn de bouwstenen van ons lichaam...', tags: ['kracht', 'voeding'] }
];

const MOCK_RECIPES: Recipe[] = [
  { id: 'r1', title: 'Groene Smoothie', timeMinutes: 5, kcal: 250, protein: 5, fiber: 8, ingredients: ['Spinazie', 'Banaan', 'Amandelmelk'], steps: ['Alles in de blender', 'Mixen', 'Drink op'] },
  { id: 'r2', title: 'Quinoa Salade', timeMinutes: 20, kcal: 450, protein: 15, fiber: 12, ingredients: ['Quinoa', 'Feta', 'Tomaat', 'Komkommer'], steps: ['Kook quinoa', 'Snij groenten', 'Meng alles'] }
];

const MOCK_EXERCISES: Exercise[] = [
  { id: 'e1', title: 'Neck Stretch', type: 'mobiliteit', durationMinutes: 3, level: 'beginner', mobilityFriendly: true, instructions: 'Beweeg je hoofd rustig van links naar rechts.' },
  { id: 'e2', title: 'Power Walk', type: 'cardio', durationMinutes: 15, level: 'beginner', mobilityFriendly: false, instructions: 'Loop stevig door buiten.' }
];

export const ContentRepository = {
  getDailyCards: async (): Promise<Result<DailyCard[]>> => {
    try {
      if (APP_CONFIG.FORCE_ERROR) throw new Error('Data sync failed');
      return { success: true, data: MOCK_CARDS };
    } catch (e) {
      ErrorService.handle(e, 'ContentRepository.getDailyCards');
      return { success: false, error: e as Error };
    }
  },

  getKnowledge: async (): Promise<Result<KnowledgeItem[]>> => {
    try {
      return { success: true, data: MOCK_KNOWLEDGE };
    } catch (e) {
      ErrorService.handle(e, 'ContentRepository.getKnowledge');
      return { success: false, error: e as Error };
    }
  },

  getRecipes: async (): Promise<Result<Recipe[]>> => {
    try {
      return { success: true, data: MOCK_RECIPES };
    } catch (e) {
      ErrorService.handle(e, 'ContentRepository.getRecipes');
      return { success: false, error: e as Error };
    }
  },

  getExercises: async (): Promise<Result<Exercise[]>> => {
    try {
      return { success: true, data: MOCK_EXERCISES };
    } catch (e) {
      ErrorService.handle(e, 'ContentRepository.getExercises');
      return { success: false, error: e as Error };
    }
  },

  saveCompletion: async (completion: CardCompletion): Promise<Result<boolean>> => {
    try {
      console.log('MOCK: Saving completion', completion);
      return { success: true, data: true };
    } catch (e) {
      ErrorService.handle(e, 'ContentRepository.saveCompletion');
      return { success: false, error: e as Error };
    }
  }
};
