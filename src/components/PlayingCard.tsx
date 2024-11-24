"use client";
import { useAnimationControls, useDragControls, motion } from "motion/react";
import { useEffect, useState } from "react";

interface PlayingCardProps {
  card?: PlayingCard; // Card object with name, image, description, and effect
  rotateZ?: number; // Rotation angle for card orientation
  yOffset?: number; // Vertical offset for card positioning
}

const PlayingCard: React.FC<PlayingCardProps> = ({
  card,
  rotateZ = 0,
  yOffset = 0,
}) => {
  const dragControls = useDragControls();
  const animationControls = useAnimationControls();
  const [faceUp, setFaceUp] = useState(true);

  useEffect(() => {
    // Trigger the intro animation when the component mounts
    animationControls.start({
      y: yOffset,
      opacity: 1,
      rotateZ,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 20,
      },
    });
  }, [rotateZ, animationControls]);

  return (
    <motion.div
      layout
      className="relative w-40 h-60 rounded-lg shadow-lg cursor-grab flex-shrink-0"
      style={{
        perspective: 1000, // Enable 3D effect
      }}
      initial={{ y: 1000, opacity: 0, rotateZ }} // Initial position and rotation
      animate={animationControls} // Use animationControls for all animations
      drag
      dragControls={dragControls}
      dragElastic={0.2}
      dragMomentum={false}
      onDoubleClick={() => setFaceUp(!faceUp)} // Flip card on double-click
      onDragEnd={() => {
        animationControls.stop();
        animationControls.start({
          x: 0,
          y: yOffset,
          transition: {
            type: "spring",
            stiffness: 150,
            damping: 20,
          },
        });
      }}
      onHoverStart={() => {
        animationControls.stop();
        animationControls.start({
          scale: 1.2,
          y: -50,
          zIndex: 100,
          rotateZ: 0,
          transition: { stiffness: 150, damping: 10 },
        });
      }}
      onHoverEnd={() => {
        animationControls.stop();
        animationControls.start({
          scale: 1,
          zIndex: 0,
          rotateZ,
          y: yOffset,
          transition: { stiffness: 150, damping: 10 },
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
          className="absolute w-full h-full bg-gray-100 border-8 border-gray-300 rounded-lg flex flex-col"
          style={{
            backfaceVisibility: "hidden", // Hide when back is visible
          }}
        >
          <div className=" bg-gray-200 font-bold text-black">{card?.name}</div>
          <div>
            <img
              src={card?.image}
              className="aspect-video bg-blue-200 w-full pointer-events-none"
            />
          </div>
          <div className="flex flex-1 justify-center items-center text-black">
            {card?.description}
          </div>
        </motion.div>

        {/* Back Face */}
        <motion.div
          className="absolute w-full h-full bg-red-500 rounded-lg flex items-center justify-center"
          style={{
            transform: "rotateY(180deg)", // Flip the back face
            backfaceVisibility: "hidden", // Hide when front is visible
          }}
        ></motion.div>
      </motion.div>
    </motion.div>
  );
};

export default PlayingCard;
