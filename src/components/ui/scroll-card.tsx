'use client';
import React from 'react';

interface CardData {
  title: string;
  tag: string;
  desc: string;
  link: string;
  color: string;
  rotation: string;
}

interface StackingCardsProps {
  cards: CardData[];
}

const StackingCards: React.FC<StackingCardsProps> = ({ cards }) => {
  return (
    // Each card is sticky top-0 with h-screen so it "pins" as you scroll
    // Previous cards stay visible stacked underneath the current one
    <div className="grid gap-0">
      {cards.map((card, i) => (
        <figure
          key={i}
          className="sticky top-0 h-screen grid place-content-center"
        >
          <article
            className={`h-80 w-[28rem] rounded-2xl ${card.rotation} p-6 grid place-content-center gap-4 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-sm`}
            style={{ backgroundColor: card.color }}
          >
            <div>
              <span className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-semibold block mb-2">
                {card.tag}
              </span>
              <h1 className="text-3xl font-bold text-white leading-tight mb-3">
                {card.title}
              </h1>
              <p className="text-white/70 text-sm leading-relaxed line-clamp-3">
                {card.desc}
              </p>
            </div>

            <div className="flex items-center justify-between mt-2">
              <a
                href={card.link}
                target="_blank"
                rel="noreferrer"
                className="w-fit bg-white text-black font-bold px-5 py-2.5 rounded-full text-sm hover:bg-white/90 transition-colors shadow-lg"
              >
                View Project
              </a>
              <span className="text-white/10 text-5xl font-black italic select-none">
                0{i + 1}
              </span>
            </div>
          </article>
        </figure>
      ))}
    </div>
  );
};

export default StackingCards;
