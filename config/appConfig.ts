
export const APP_CONFIG = {
  USE_MOCK_DATA: true,
  FORCE_ERROR: false,
  DEV_MODE: true,
  APP_NAME: 'FLO8',
  VERSION: '1.1.0-mvp',
  FIREBASE: {
    apiKey: "__FILL__",
    authDomain: "__FILL__",
    projectId: "__FILL__",
    storageBucket: "__FILL__",
    messagingSenderId: "__FILL__",
    appId: "__FILL__"
  }
};

// Runtime helper
(window as any).toggleMockError = () => {
  (APP_CONFIG as any).FORCE_ERROR = !(APP_CONFIG as any).FORCE_ERROR;
  console.log(`Force Error state: ${APP_CONFIG.FORCE_ERROR}`);
};
