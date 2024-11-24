import React from "react";
import useStatsStore from "../store/stats";

const HeadsUpDisplay: React.FC = () => {
  const stats = useStatsStore(); // Access the entire store

  return (
    <div
      className="fixed top-0 left-0 bg-gray-800 text-white p-4 rounded-lg shadow-lg"
      style={{ zIndex: 1000 }}
    >
      <h2 className="text-lg font-bold mb-4">Player Stats</h2>

      {/* Parent grid for consistent column sizing */}
      <ul className="grid grid-cols-[1fr,min-content,auto,auto] gap-x-4 w-full">
        {Object.entries(stats).map(([key, stat]) => (
          <li key={key} className="contents">
            {/* Name column */}
            <span className="font-medium">{stat.name}</span>

            {/* Value column */}
            <span className="text-center">{stat.value}</span>

            {/* Decrement button */}
            <button onClick={() => stat.set((prev: number) => prev - 1)}>
              -
            </button>

            {/* Increment button */}
            <button onClick={() => stat.set((prev: number) => prev + 1)}>
              +
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HeadsUpDisplay;
