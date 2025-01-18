import { create } from "zustand";
import { persist } from "zustand/middleware";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/constants/firebase-config";

const storage = {
   getItem: (name: string) => {
      const item = localStorage.getItem(name);
      return item ? JSON.parse(item) : null;
   },
   setItem: (name: string, value: unknown) => {
      localStorage.setItem(name, JSON.stringify(value));
   },
   removeItem: (name: string) => {
      localStorage.removeItem(name);
   }
};

export type User = {
   id?: string;
   username?: string;
   email?: string;
   avatar?: string;
   blocked?: string[];
};

type UserFirebaseStore = {
   currentUser: User | null;
   setUser: (user: User | null) => void;
   fetchUserInfo: (uid: string) => Promise<void>;
   updateUserFirebase: (profile: Partial<User>) => void;
};

const useUserFirebaseStore = create(
   persist<UserFirebaseStore>(
      (set) => ({
         currentUser: null,
         setUser: (user) => set({ currentUser: user }),
         fetchUserInfo: async (uid) => {
            if (!uid) return set({ currentUser: null });

            try {
               const docRef = doc(db, "users", uid);
               const docSnap = await getDoc(docRef);

               if (docSnap.exists()) {
                  set({ currentUser: docSnap.data() });
               } else {
                  set({ currentUser: null });
               }
            } catch (error) {
               console.error("Error fetching user info:", error);
            }
         },
         updateUserFirebase: async (profile: Partial<User>) => {
            try {
               if (!profile || !profile.id) {
                  throw new Error("Invalid profile data");
               }

               const { id, ...profileData } = profile;
               const docRef = doc(db, "users", id);
               await updateDoc(docRef, profileData);

               set((state) => ({
                  currentUser: {
                     ...state.currentUser,
                     id,
                     ...profileData,
                  },
               }));
            } catch (error) {
               console.error("Error updating user profile:", error);
               throw error;
            }
         },
      }),
      {
         name: "user-firebase-store",
         storage: storage, 
      }
   )
);

export default useUserFirebaseStore;
