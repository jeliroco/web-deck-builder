export const strike: PlayingCard = {
  slug: "strike",
  name: "Strike",
  image: "/images/cards/strike.webp",
  description: "Deal 6 damage.",
  effect: () => {
    console.log("Strike effect");
  },
};

export const defend: PlayingCard = {
  slug: "defend",
  name: "Defend",
  image: "/images/cards/defend.webp",
  description: "Gain 5 block.",
  effect: () => {
    console.log("Defend effect");
  },
};
