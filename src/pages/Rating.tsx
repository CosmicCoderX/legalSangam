import React from "react";

const Rating: React.FC<{ value: number }> = ({ value }) => {
  const full = Math.round(value);
  return (
    <div className="flex items-center gap-1 text-yellow-500">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i}>{i < full ? "★" : "☆"}</span>
      ))}
      <span className="text-sm text-gray-600 ml-2">({value.toFixed(1)})</span>
    </div>
  );
};

export default Rating;
