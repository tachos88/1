
import { APP_CONFIG } from '../config/appConfig';
import { Lead, Result } from '../types';
import { ErrorService } from '../services/errorService';

export const LeadRepository = {
  submit: async (lead: Lead): Promise<Result<boolean>> => {
    try {
      if (APP_CONFIG.FORCE_ERROR) throw new Error('Simulated repository error');
      
      // MOCK implementation
      if (APP_CONFIG.USE_MOCK_DATA) {
        console.log('MOCK: Storing lead', lead);
        await new Promise(r => setTimeout(r, 1000));
        return { success: true, data: true };
      }

      // FUTURE: Firebase implementation
      // await addDoc(collection(db, 'leads'), lead);
      throw new Error('Firebase not connected');
    } catch (e) {
      ErrorService.handle(e, 'LeadRepository.submit');
      return { success: false, error: e as Error };
    }
  }
};
