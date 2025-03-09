import React, { useEffect, useState } from "react";

function Rating({ initialRating, onRating }) {
  const [rating, setRating] = useState(initialRating);

  const handleRating = (rating) => {
    setRating(rating);
    if (onRating) onRating(rating); // Calls the onRating callback with the new rating value
  };

  useEffect(() => {
    if (initialRating !== rating) {
      setRating(initialRating); // Updates rating state only when initialRating changes
    }
  }, [initialRating]); // Dependency on initialRating instead of rating

  return (
    <div>
      {Array.from({ length: 5 }, (_, index) => {
        const ratingValue = index + 1;
        return (
          <span
            key={index}
            className={`text-xl sm:text-2xl cursor-pointer transition-colors star ${
              ratingValue <= rating ? "text-yellow-400" : "text-gray-500"
            }`}
            onClick={() => handleRating(ratingValue)}
          >
            ★
          </span>
        );
      })}
    </div>
  );
}

export default Rating;
