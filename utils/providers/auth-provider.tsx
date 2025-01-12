"use client";
import { type ReactNode, createContext, useRef, useContext } from "react";
import { type StoreApi, useStore } from "zustand";

import {
    type AuthStore,
    createAuthStore,
    UserState,
} from "@/stores/auth-store";

export const AuthStoreContext = createContext<StoreApi<AuthStore> | null>(null);
export interface AuthStoreProviderProps {
    children: ReactNode;
    initialToken?: string;
    initialLoggedIn?: boolean;
    initialUser: UserState;
}

export const AuthStoreProvider = ({
    children,
    initialLoggedIn,
    initialToken,
    initialUser,
}: AuthStoreProviderProps) => {
    const storeRef = useRef<StoreApi<AuthStore> | null>(null);
    if (!storeRef.current) {
        storeRef.current = createAuthStore({
            isLoggedIn: initialLoggedIn || false,
            sessionToken: initialToken || null,
            user: initialUser,
        });
    }

    return (
        <AuthStoreContext.Provider value={storeRef.current}>
            {children}
        </AuthStoreContext.Provider>
    );
};

export const useAuthStore = <T,>(selector: (store: AuthStore) => T): T => {
    const authStoreContext = useContext(AuthStoreContext);

    if (!authStoreContext) {
        throw new Error(`useAuthStore must be use within AuthStoreProvider`);
    }

    return useStore(authStoreContext, selector);
};

