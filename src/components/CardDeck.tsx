"use client";
import PlayingCard from "./PlayingCard";

interface CardDeckProps {}

const CardDeck: React.FC<CardDeckProps> = ({}) => {
  return (
    <div className="absolute bottom-0 left-0 p-4">
      <PlayingCard />
    </div>
  );
};

export default CardDeck;
