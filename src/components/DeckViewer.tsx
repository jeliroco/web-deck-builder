import React from "react";
import useDeckStore from "../store/deck";
import { strike, defend } from "../data/cards";

const DeckViewer: React.FC = () => {
  const { deck, addCard, removeCard, removeCards, clearDeck } = useDeckStore();

  return (
    <div className="absolute top-0 right-0">
      <h1>Deck Builder</h1>
      <div className="flex flex-col gap-2">
        <button onClick={() => addCard(strike)}>Add Strike</button>
        <button onClick={() => addCard(defend)}>Add Defend</button>
        <button onClick={() => removeCard((card) => card.slug === "strike")}>
          Remove First Strike
        </button>
        <button onClick={() => removeCards((card) => card.slug === "strike")}>
          Remove All Strikes
        </button>
        <button onClick={clearDeck}>Clear Deck</button>
      </div>

      <h2>Current Deck</h2>
      <ul>
        {deck.map((card, index) => (
          <li key={`${card.slug}-${index}`}>
            <p>
              {card.name}: {card.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeckViewer;
