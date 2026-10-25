"use client";

import { useState } from "react";

const PHOTOS = [
  {
    src: "/photos/ridham-1.jpg",
    alt: "Ridham with Mickey Mouse at Disneyland Paris",
  },
  {
    src: "/photos/ridham-2.jpg",
    alt: "Ridham outside a cathedral on a sunny day",
  },
  {
    src: "/photos/ridham-3.jpg",
    alt: "A photo from Ridham's collection",
  },
  {
    src: "/photos/ridham-4.jpg",
    alt: "A photo from Ridham's collection",
  },
];

const NAME = "Ridham Patel";
const TITLE = "ML Engineer · Researcher";
const SPRING = "400ms cubic-bezier(0.22, 1, 0.36, 1)";

const COLLAPSED_CARDS = [
  { x: -1, y: 72, rotate: -12 },
  { x: 0, y: 72, rotate: 12 },
  { x: 0, y: 72, rotate: 22 },
];

const PEEK_CARDS = [
  { x: -31, y: 63, rotate: -18 },
  { x: 23, y: 65, rotate: 22 },
  { x: 30, y: 29, rotate: 23 },
];

export default function AvatarStack() {
  const [open, setOpen] = useState(false);
  const [peeking, setPeeking] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const toggle = () => {
    setOpen((value) => !value);
    setPeeking(false);
    setActiveCard(null);
  };

  return (
    <div
      className="profile-deck"
      role="button"
      tabIndex={0}
      aria-expanded={open}
      aria-label={`${NAME}, ${TITLE}. ${open ? "Collapse" : "Expand"} photo deck.`}
      onMouseLeave={() => {
        if (!open) setPeeking(false);
        setActiveCard(null);
      }}
      onClick={toggle}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          toggle();
        }
      }}
    >
      <div
        className="profile-primary"
        onMouseEnter={() => !open && setPeeking(true)}
        style={{
          width: open ? 48 : 64,
          height: open ? 48 : 64,
          transform: `translate(0px, ${open ? 60 : 72}px)`,
          transition: `width ${SPRING}, height ${SPRING}, transform ${SPRING}`,
        }}
      >
        <img
          src={PHOTOS[0].src}
          alt={PHOTOS[0].alt}
          draggable={false}
          decoding="async"
          fetchPriority="high"
        />
      </div>

      <div
        className="profile-text"
        style={{
          transform: `translate(${open ? 60 : 0}px, ${open ? 60 : 156}px)`,
          transition: `transform ${SPRING}`,
        }}
      >
        <span className="profile-name">
          {NAME} <VerifiedBadge />
        </span>
        <span className="profile-title">{TITLE}</span>
      </div>

      {PHOTOS.slice(1).map((photo, index) => {
        const rest = peeking ? PEEK_CARDS[index] : COLLAPSED_CARDS[index];
        const openX = index * 80;
        const scale = open && activeCard === index ? 1.4 : 1;
        const outward =
          open && activeCard !== null
            ? index < activeCard
              ? -10
              : index > activeCard
                ? 10
                : 0
            : 0;

        return (
          <div
            className="profile-card"
            key={photo.src}
            style={{
              width: open ? 72 : 64,
              height: open ? 72 : 64,
              zIndex: open && activeCard === index ? 10 : [3, 4, 1][index],
              transform: open
                ? `translate(${openX + outward}px, 136px) rotate(0deg) scale(${scale})`
                : `translate(${rest.x}px, ${rest.y}px) rotate(${rest.rotate}deg) scale(1)`,
              transition: `width ${SPRING}, height ${SPRING}, transform ${SPRING}`,
            }}
            onMouseEnter={(event) => {
              event.stopPropagation();
              if (open) setActiveCard(index);
            }}
            onMouseLeave={() => open && setActiveCard(null)}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              draggable={false}
              loading="lazy"
              decoding="async"
            />
          </div>
        );
      })}
    </div>
  );
}

function VerifiedBadge() {
  return (
    <svg viewBox="0 0 22 22" aria-hidden className="verified-badge">
      <path
        fill="currentColor"
        d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.14.274.587.705 1.086 1.245 1.44.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.706 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"
      />
    </svg>
  );
}
