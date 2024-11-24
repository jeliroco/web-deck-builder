"use client";
import { AnimatePresence } from "framer-motion";
import PlayingCard from "./PlayingCard";
import { useState, useEffect } from "react";

interface CardHandProps {}

const CardHand: React.FC<CardHandProps> = ({}) => {
  const [cards, setCards] = useState<React.ReactElement[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Adding card");
      setCards((prevCards) => [
        ...prevCards,
        <PlayingCard key={prevCards.length} />, // Assign a unique key to each PlayingCard
      ]);
    }, 2000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div className="absolute bottom-0 w-full left-0 right-0 flex items-center justify-center">
      <AnimatePresence>{cards.map((card) => card)}</AnimatePresence>
    </div>
  );
};

export default CardHand;
