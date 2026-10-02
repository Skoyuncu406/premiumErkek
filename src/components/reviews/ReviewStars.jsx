"use client";

import { Star } from "lucide-react";

export default function ReviewStars({
  rating = 0,
  size = 13,
  gap = 2,
  interactive = false,
  onChange,
  className = "",
}) {
  const safeRating = Number(rating) || 0;

  function handleSelect(value) {
    if (!interactive || !onChange) {
      return;
    }

    onChange(value);
  }

  return (
    <div
      className={`
        inline-flex
        items-center
        ${className}
      `}
      style={{
        gap: `${gap}px`,
      }}
      aria-label={`${safeRating} üzerinden 5 yıldız`}
    >
      {[1, 2, 3, 4, 5].map((value) => {
        const filled = value <= Math.round(safeRating);

        if (interactive) {
          return (
            <button
              key={value}
              type="button"
              onClick={() => handleSelect(value)}
              aria-label={`${value} yıldız ver`}
              className="
                flex
                items-center
                justify-center

                border-0
                bg-transparent
                p-0

                text-[var(--ares-gold)]

                outline-none

                transition-transform
                duration-200

                hover:scale-110

                focus:outline-none
                focus-visible:outline-none
              "
            >
              <Star
                size={size}
                strokeWidth={1.3}
                fill={
                  filled
                    ? "currentColor"
                    : "transparent"
                }
              />
            </button>
          );
        }

        return (
          <Star
            key={value}
            size={size}
            strokeWidth={1.3}
            fill={
              filled
                ? "currentColor"
                : "transparent"
            }
            className="text-[var(--ares-gold)]"
          />
        );
      })}
    </div>
  );
}