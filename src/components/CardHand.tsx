"use client";
import { AnimatePresence } from "framer-motion";
import PlayingCard from "./PlayingCard";
import { useState, useEffect } from "react";

interface CardHandProps {
  cards?: PlayingCard[];
}

const CardHand: React.FC<CardHandProps> = ({ cards }) => {
  // Define the minimum and maximum rotation
  const minRotation = -15;
  const maxRotation = 15;
  const maxYOffset = 50; // Maximum vertical offset for the center card

  return (
    <div className="absolute bottom-0 w-full left-0 right-0 flex items-center justify-center">
      <AnimatePresence>
        {cards?.map((card, index) => {
          const totalCards = cards.length;

          // Calculate rotation dynamically based on the card's index
          const rotateZ =
            minRotation +
            ((maxRotation - minRotation) / (totalCards - 1)) * index;

          // Calculate y-offset dynamically with a parabolic curve
          const middleIndex = (totalCards - 1) / 2;
          const distanceFromCenter = index - middleIndex;
          const normalizedDistance = distanceFromCenter / middleIndex;
          const yOffset = -maxYOffset * (1 - normalizedDistance ** 2);

          return (
            <PlayingCard
              key={index}
              rotateZ={rotateZ} // Pass the calculated rotation
              yOffset={yOffset} // Pass the calculated vertical offset
              card={card}
            />
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default CardHand;
