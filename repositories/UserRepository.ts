
import { APP_CONFIG } from '../config/appConfig';
import { User, Result, PlanType } from '../types';
import { ErrorService } from '../services/errorService';

const MOCK_USER: User = {
  id: 'mock-123',
  email: 'test@flo8.nl',
  name: 'Sander de Tester',
  plan: PlanType.W8,
  planActiveUntil: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
  onboardingComplete: false, // Start false om wizard te testen
  goals: [],
  baseline: { sleep: 5, stress: 5, movement: 5, nutrition: 5, energy: 5 },
  mobilityLimited: false,
  notificationTime: '08:00',
  theme: 'light',
  streak: 0
};

export const UserRepository = {
  getCurrentUser: async (): Promise<Result<User | null>> => {
    try {
      if (APP_CONFIG.FORCE_ERROR) throw new Error('Failed to fetch user');
      if (APP_CONFIG.USE_MOCK_DATA) return { success: true, data: MOCK_USER };
      return { success: true, data: null };
    } catch (e) {
      ErrorService.handle(e, 'UserRepository.getCurrentUser');
      return { success: false, error: e as Error };
    }
  },

  updateProfile: async (id: string, updates: Partial<User>): Promise<Result<boolean>> => {
    try {
      console.log(`MOCK: Updating user ${id}`, updates);
      return { success: true, data: true };
    } catch (e) {
      ErrorService.handle(e, 'UserRepository.updateProfile');
      return { success: false, error: e as Error };
    }
  },

  login: async (email: string): Promise<Result<User>> => {
    try {
      if (APP_CONFIG.FORCE_ERROR) throw new Error('Authentication failed');
      await new Promise(r => setTimeout(r, 1200));
      return { success: true, data: { ...MOCK_USER, email } };
    } catch (e) {
      ErrorService.handle(e, 'UserRepository.login');
      return { success: false, error: e as Error };
    }
  }
};
