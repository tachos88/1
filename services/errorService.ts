
import { APP_CONFIG } from '../config/appConfig';

export class AppError extends Error {
  public code: string;
  public userMessage: string;

  constructor(message: string, code = 'GENERIC_ERROR', userMessage = 'Er is iets misgegaan. Probeer het later opnieuw.') {
    super(message);
    this.code = code;
    this.userMessage = userMessage;
    this.name = 'AppError';
  }
}

export const ErrorService = {
  handle: (error: any, context?: string): AppError => {
    const technicalMsg = error instanceof Error ? error.message : String(error);
    const code = error?.code || 'ERROR';

    if (APP_CONFIG.DEV_MODE) {
      console.group(`🔴 Error at [${context || 'Unknown Context'}]`);
      console.error('Technical:', technicalMsg);
      console.error('Stack:', error?.stack);
      console.groupEnd();
    }

    // Vertaal bekende codes naar NL
    let userMsg = 'Er is een onverwachte fout opgetreden.';
    if (code === 'auth/user-not-found') userMsg = 'Gebruiker niet gevonden.';
    if (code === 'auth/wrong-password') userMsg = 'Onjuist wachtwoord.';
    if (code === 'NETWORK_ERROR') userMsg = 'Geen internetverbinding.';
    if (code === 'MOCK_FORCED') userMsg = 'Test error geactiveerd via FORCE_ERROR flag.';

    const appError = new AppError(technicalMsg, code, userMsg);
    
    // Custom event voor toast listener
    window.dispatchEvent(new CustomEvent('app-error', { detail: appError }));
    
    return appError;
  }
};
