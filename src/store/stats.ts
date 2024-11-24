import { create } from "zustand";

interface Stat {
  name: string;
  value: number;
  description: string;
  set: (value: number | ((prev: number) => number)) => void;
}

interface StatsStore {
  health: Stat;
  maxHealth: Stat;
  strength: Stat;
  dexterity: Stat;
}

const createStat = (
  name: string,
  description: string,
  initialValue: number,
  set: (fn: (state: StatsStore) => StatsStore) => void,
  key: keyof StatsStore
): Stat => ({
  name,
  value: initialValue,
  description,
  set: (newValue) =>
    set((state) => {
      const prevValue = state[key].value;
      const updatedValue =
        typeof newValue === "function" ? newValue(prevValue) : newValue;

      return {
        ...state,
        [key]: {
          ...state[key],
          value: updatedValue,
        },
      };
    }),
});

const useStatsStore = create<StatsStore>((set) => ({
  // Custom set method for health
  health: {
    name: "Health",
    value: 100,
    description: "Your current health.",
    set: (newValue) =>
      set((state) => {
        const prevValue = state.health.value;
        const updatedValue =
          typeof newValue === "function" ? newValue(prevValue) : newValue;

        // Ensure health does not exceed maxHealth
        const cappedValue = Math.min(updatedValue, state.maxHealth.value);

        return {
          ...state,
          health: {
            ...state.health,
            value: cappedValue,
          },
        };
      }),
  },

  // Custom set method for maxHealth
  maxHealth: {
    name: "Max Health",
    value: 100,
    description: "Your maximum health.",
    set: (newValue) =>
      set((state) => {
        const prevValue = state.maxHealth.value;
        const updatedValue =
          typeof newValue === "function" ? newValue(prevValue) : newValue;

        // Adjust health based on maxHealth changes
        let adjustedHealth = state.health.value;
        if (updatedValue < prevValue && adjustedHealth > updatedValue) {
          adjustedHealth = updatedValue;
        } else if (updatedValue > prevValue) {
          adjustedHealth += updatedValue - prevValue;
        }

        return {
          ...state,
          maxHealth: {
            ...state.maxHealth,
            value: updatedValue,
          },
          health: {
            ...state.health,
            value: adjustedHealth,
          },
        };
      }),
  },

  strength: createStat(
    "Strength",
    "Your physical strength.",
    10,
    set,
    "strength"
  ),
  dexterity: createStat(
    "Dexterity",
    "Your agility and coordination.",
    10,
    set,
    "dexterity"
  ),
}));

export default useStatsStore;
