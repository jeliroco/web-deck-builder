"use client";

import CardHand from "@/components/CardHand";
import DeckViewer from "@/components/DeckViewer";
import HeadsUpDisplay from "@/components/HeadsUpDisplay";
import { defend, strike } from "@/data/cards";

export default function Home() {
  return (
    <main className="w-dvw h-dvh">
      <HeadsUpDisplay />
      <DeckViewer />
      <CardHand cards={[strike, strike, strike, defend, defend, defend]} />
    </main>
  );
}
