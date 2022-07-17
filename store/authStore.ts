import create from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { url } from "../config";

const authStore = (set: any) => {
  return {
    userProfile: null,
    allUsers: [],
    addUser: (user: any) => set({ userProfile: user }),
    removeUser: () => set({ userProfile: null }),
    fetchAllUsers: async () => {
      const { data } = await axios.get(`${url}/api/users`);

      set({ allUsers: data });
    },
  };
};

const useAuthStore = create(
  persist(authStore, {
    name: "auth",
  })
);

export default useAuthStore;
