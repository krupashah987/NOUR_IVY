import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { NGOS, PROVIDERS, SEED_DONATIONS } from "./data";
import type { Donation, DonationStatus, Role, SessionUser } from "./types";

const DONATION_KEY = "nourivy.donations.v1";
const SESSION_KEY = "nourivy.session.v1";

interface StoreValue {
  donations: Donation[];
  session: SessionUser | null;
  hydrated: boolean;
  signIn: (user: SessionUser) => void;
  signOut: () => void;
  addDonation: (d: Omit<Donation, "id" | "createdAt" | "status">) => Donation;
  updateDonation: (id: string, patch: Partial<Donation>) => void;
  advanceStatus: (id: string, status: DonationStatus) => void;
}

const StoreContext = createContext<StoreValue | null>(null);

export function NourStoreProvider({ children }: { children: ReactNode }) {
  const [donations, setDonations] = useState<Donation[]>(SEED_DONATIONS);
  const [session, setSession] = useState<SessionUser | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(DONATION_KEY);
      if (raw) setDonations(JSON.parse(raw) as Donation[]);
      const s = localStorage.getItem(SESSION_KEY);
      if (s) setSession(JSON.parse(s) as SessionUser);
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(DONATION_KEY, JSON.stringify(donations));
  }, [donations, hydrated]);

  const signIn = useCallback((user: SessionUser) => {
    setSession(user);
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  }, []);

  const signOut = useCallback(() => {
    setSession(null);
    localStorage.removeItem(SESSION_KEY);
  }, []);

  const addDonation = useCallback((d: Omit<Donation, "id" | "createdAt" | "status">) => {
    const donation: Donation = {
      ...d,
      id: `d${Math.floor(Math.random() * 90000 + 10000)}`,
      createdAt: new Date().toISOString(),
      status: "Listed",
    };
    setDonations((prev) => [donation, ...prev]);
    return donation;
  }, []);

  const updateDonation = useCallback((id: string, patch: Partial<Donation>) => {
    setDonations((prev) => prev.map((d) => (d.id === id ? { ...d, ...patch } : d)));
  }, []);

  const advanceStatus = useCallback((id: string, status: DonationStatus) => {
    setDonations((prev) => prev.map((d) => (d.id === id ? { ...d, status } : d)));
  }, []);

  const value = useMemo(
    () => ({
      donations,
      session,
      hydrated,
      signIn,
      signOut,
      addDonation,
      updateDonation,
      advanceStatus,
    }),
    [donations, session, hydrated, signIn, signOut, addDonation, updateDonation, advanceStatus],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useNour() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useNour must be used inside NourStoreProvider");
  return ctx;
}

export const providerById = (id: string) => PROVIDERS.find((p) => p.id === id);
export const ngoById = (id?: string) => (id ? NGOS.find((n) => n.id === id) : undefined);

export const roleLabel: Record<Role, string> = {
  provider: "Food Provider",
  ngo: "NGO / Community Organisation",
  volunteer: "Volunteer",
  admin: "Administrator",
};
