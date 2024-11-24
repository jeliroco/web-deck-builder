import { create } from "zustand";
import { strike, defend } from "../data/cards";

export interface PlayingCard {
  slug: string;
  name: string;
  image: string;
  description: string;
  effect: () => void;
}

interface DeckStore {
  deck: PlayingCard[];
  addCard: (card: PlayingCard) => void;
  removeCard: (criteria: (card: PlayingCard, index: number) => boolean) => void;
  removeCards: (
    criteria: (card: PlayingCard, index: number) => boolean
  ) => void;
  getCard: (
    criteria: (card: PlayingCard, index: number) => boolean
  ) => PlayingCard | undefined;
  getCards: (
    criteria: (card: PlayingCard, index: number) => boolean
  ) => PlayingCard[];
  clearDeck: () => void;
}

const useDeckStore = create<DeckStore>((set, get) => ({
  // Default deck with 5 strikes and 5 defends
  deck: Array(5).fill(strike).concat(Array(5).fill(defend)),

  // Add a card to the deck
  addCard: (card) =>
    set((state) => ({
      deck: [...state.deck, card],
    })),

  // Remove the first card that matches the criteria
  removeCard: (criteria) =>
    set((state) => {
      const index = state.deck.findIndex(criteria);
      if (index >= 0) {
        const newDeck = [...state.deck];
        newDeck.splice(index, 1);
        return { deck: newDeck };
      }
      return state;
    }),

  // Remove all cards that match the criteria
  removeCards: (criteria) =>
    set((state) => ({
      deck: state.deck.filter((card, index) => !criteria(card, index)),
    })),

  // Get the first card that matches the criteria
  getCard: (criteria) => {
    const state = get();
    return state.deck.find(criteria);
  },

  // Get all cards that match the criteria
  getCards: (criteria) => {
    const state = get();
    return state.deck.filter(criteria);
  },

  // Clear the entire deck
  clearDeck: () =>
    set({
      deck: [],
    }),
}));

export default useDeckStore;
