interface Relic {
  name: string;
  description: string;
  effect: RelicEffect;
}

type RelicEffect = () => void;
