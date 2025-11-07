import { create } from 'zustand';

interface SessionState {
  sessionId: string | null;
  tableId: string | null;
  setSession: (sessionId: string, tableId: string) => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  sessionId: null,
  tableId: null,
  setSession: (sessionId, tableId) => set({ sessionId, tableId }),
}));
