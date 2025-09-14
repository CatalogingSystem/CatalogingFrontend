import { useState, useEffect, useRef, useCallback } from "react";

interface Props {
  images: string[];
  description?: string;
  className?: string;
  interval?: number;
}

export default function AutoCarousel({
  images,
  description = "Imagen",
  className = " object-cover",
  interval = 3000,
}: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = useCallback(() => {
    if (images.length <= 1) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);
  }, [images.length, interval]);

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
    stopTimer();
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    startTimer();
  };

  useEffect(() => {
    if (!isPaused) {
      startTimer();
    }

    return () => stopTimer();
  }, [images.length, interval, isPaused, startTimer]);

  if (images.length <= 1) {
    return (
      <img
        className={className}
        src={
          images[0] ||
          "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
        }
        alt={description}
      />
    );
  }

  return (
    <div
      className="relative w-full h-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        className={className}
        src={images[currentIndex]}
        alt={`${description} ${currentIndex + 1}`}
      />

      <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
        {currentIndex + 1}/{images.length}
      </div>
    </div>
  );
}
