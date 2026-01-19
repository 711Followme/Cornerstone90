/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  // Add other env variables here as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  debugDayCalculation: () => {
    systemTimeUTC: string;
    systemTimeLocal: string;
    centralTime: string;
    programStart: string;
    daysSinceStart: number;
    currentDay: number;
    cappedDay: number;
  };
}
