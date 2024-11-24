"use client";
import { useDragControls, motion, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";

interface PlayingCardProps {
  rotateZ?: number; // Rotation angle for card orientation
}

const PlayingCard: React.FC<PlayingCardProps> = ({ rotateZ = 0 }) => {
  const dragControls = useDragControls();
  const animationControls = useAnimationControls();
  const [faceUp, setFaceUp] = useState(true);

  useEffect(() => {
    animationControls.set({ rotateZ });
  }, [rotateZ, animationControls]);

  return (
    <motion.div
      className="relative w-40 h-60 rounded-lg shadow-lg cursor-grab"
      style={{
        perspective: 1000, // Enable 3D effect
      }}
      // initial={{ x: 0, y: 1000, opacity:0, rotateZ }} // Initial position and rotation
      drag
      dragControls={dragControls}
      dragElastic={0.2}
      dragMomentum={false}
      onDoubleClick={() => setFaceUp(!faceUp)} // Flip card on double-click
      onDragEnd={() => {
        animationControls.start({
          x: 0,
          y: 0,
        });
      }}
      animate={animationControls}
      whileHover={{ scale: 1.2, zIndex: 100, rotateZ: 0 }} // Slight hover effect for interactivity
      onHoverEnd={() => {
        animationControls.start({
          rotateZ,
        });
      }}
    >
      {/* Flipping Card Container */}
      <motion.div
        className="absolute w-full h-full"
        style={{
          transformStyle: "preserve-3d", // Enable 3D rotation
        }}
        animate={{
          rotateY: faceUp ? 0 : 180, // Rotate the card on Y-axis
          transition: {
            type: "spring",
            stiffness: 150,
            damping: 10,
          },
        }}
      >
        {/* Front Face */}
        <motion.div
          className="absolute w-full h-full bg-blue-500 rounded-lg flex items-center justify-center"
          style={{
            backfaceVisibility: "hidden", // Hide when back is visible
          }}
        >
          <span className="text-white text-xl">Front</span>
        </motion.div>

        {/* Back Face */}
        <motion.div
          className="absolute w-full h-full bg-red-500 rounded-lg flex items-center justify-center"
          style={{
            transform: "rotateY(180deg)", // Flip the back face
            backfaceVisibility: "hidden", // Hide when front is visible
          }}
        >
          <span className="text-white text-xl">Back</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default PlayingCard;
