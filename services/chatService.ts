
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";
import { APP_CONFIG } from "../config/appConfig";

const LIFESTYLE_INSTRUCTION = `Je bent de FLO8 Leefstijl Coach. 
Je helpt gebruikers met vragen over voeding, beweging, slaap, stress en gezonde gewoontes. 
Je antwoorden zijn empathisch, motiverend en actiegericht.
BELANGRIJK: Bij vragen over ernstige medische of psychische klachten (crisis, pijn op de borst, suïcidale gedachten), moet je ALTIJD adviseren om direct contact op te nemen met de huisarts of de spoedeisende hulp (112). 
Houd het kort en krachtig in het Nederlands.`;

const SALES_INSTRUCTION = `Je bent de FLO8 Ambassadeur. 
Jouw doel is om bezoekers te enthousiasmeren voor het FLO8 programma (4 of 8 weken).
Focus op de voordelen: meer rust, 1-op-1 coaching (30min bij 4w, 1u bij 8w), en de 24/7 AI coach in het 8-weken plan.
Wees uitnodigend, vriendelijk en helpend. Vertel hen dat dit de stap is naar een fitter en relaxter leven.
Houd het kort en krachtig in het Nederlands.`;

export const ChatService = {
  async sendMessage(history: ChatMessage[], newMessage: string, mode: 'lifestyle' | 'sales' = 'lifestyle'): Promise<string> {
    try {
      if (APP_CONFIG.USE_MOCK_DATA) {
        await new Promise(r => setTimeout(r, 1000));
        if (newMessage.toLowerCase().includes('pijn')) return "Ik begrijp dat je pijn ervaart. Als dit ernstig is of je maakt je zorgen, neem dan direct contact op met je huisarts.";
        if (mode === 'sales') return "Wat leuk dat je interesse hebt in FLO8! Het 8-weken programma is echt onze favoriet omdat je daar een uur lang 1-op-1 coaching krijgt en onbeperkt toegang tot mij als AI coach. Zal ik je meer vertellen over de startdatum?";
        return "Dat is een interessante vraag over je leefstijl! Hoe kan ik je vandaag concreet ondersteunen bij je doelen?";
      }

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          ...history.map(m => ({ role: m.role, parts: [{ text: m.text }] })),
          { role: 'user', parts: [{ text: newMessage }] }
        ],
        config: {
          systemInstruction: mode === 'sales' ? SALES_INSTRUCTION : LIFESTYLE_INSTRUCTION,
          temperature: 0.7,
        }
      });

      return response.text || "Sorry, ik kon geen antwoord genereren.";
    } catch (error) {
      console.error("Chat error:", error);
      throw error;
    }
  }
};
