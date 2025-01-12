import { createStore } from "zustand/vanilla";

export type UserState = {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  avatar?: string;
  userName2?: string;
  bio?: string;
  role?: string;
};
export type AuthState = {
  isLoggedIn: boolean;
  sessionToken: string | null;
  user: UserState | null;
};

export type AuthActions = {
  login: (token: string) => void;
  logout: () => void;
  updateProfile: (profile: Partial<UserState>) => void;
};

export type AuthStore = AuthState & AuthActions;

export const defaultInitState: AuthState = {
  isLoggedIn: false,
  sessionToken: null,
  user: null,
};

export const createAuthStore = (initState: AuthState = defaultInitState) => {
  return createStore<AuthStore>()((set) => ({
    ...initState,
    login: (token) => set(() => ({ isLoggedIn: true, sessionToken: token })),
    logout: () =>
      set(() => ({ isLoggedIn: false, sessionToken: null, user: null })),
    updateProfile: (profile: Partial<UserState>) =>
      set((state) => ({ user: { ...state.user, ...profile } })),
  }));
  
};
