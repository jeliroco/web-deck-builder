interface PlayingCard {
  slug: string;
  name: string;
  image: string;
  description: string;
  effect: () => void;
}
