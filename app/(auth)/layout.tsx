"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

// Real Christian quotes with actual names
const QUOTES = [
  {
    quote: "The church is not a building, but a people called to glorify God and make disciples.",
    author: "Rick Warren",
    authorRole: "Pastor, Saddleback Church",
  },
  {
    quote: "God doesn't call the qualified. He qualifies the called.",
    author: "Max Lucado",
    authorRole: "Author & Pastor",
  },
  {
    quote: "Faith is not the absence of doubt, but the presence of trust in God.",
    author: "Charles Stanley",
    authorRole: "Pastor, First Baptist Atlanta",
  },
  {
    quote: "The greatest tragedy is not death, but life without purpose.",
    author: "Myles Munroe",
    authorRole: "Bishop & Author",
  },
  {
    quote: "Worry is a conversation you have with yourself about things God already handled.",
    author: "Christine Caine",
    authorRole: "Founder, A21 Campaign",
  },
  {
    quote: "Your past is not your future. God's grace writes a new story every morning.",
    author: "Joel Osteen",
    authorRole: "Pastor, Lakewood Church",
  },
  {
    quote: "Prayer is not asking. It is a longing of the soul to connect with its Creator.",
    author: "Timothy Keller",
    authorRole: "Pastor, Redeemer Presbyterian",
  },
  {
    quote: "The best way to find yourself is to lose yourself in the service of others.",
    author: "Mother Teresa",
    authorRole: "Saint & Humanitarian",
  },
  {
    quote: "God's grace is not a license to sin, but power to overcome it.",
    author: "Billy Graham",
    authorRole: "Evangelist",
  },
  {
    quote: "When you can't see God's hand, trust His heart.",
    author: "Priscilla Shirer",
    authorRole: "Author & Speaker",
  },
  {
    quote: "The Bible is not an option, it's a necessity. You cannot grow without it.",
    author: "Joyce Meyer",
    authorRole: "Bible Teacher",
  },
  {
    quote: "Love is not what you say. Love is what you do.",
    author: "Francis Chan",
    authorRole: "Pastor & Author",
  },
  {
    quote: "God's plan for your life is always better than your plan for your life.",
    author: "Steven Furtick",
    authorRole: "Pastor, Elevation Church",
  },
  {
    quote: "You are never too broken for God to fix. His grace has no expiration date.",
    author: "T.D. Jakes",
    authorRole: "Bishop, The Potter's House",
  },
  {
    quote: "Worship is not about the perfect song. It's about the sincere heart.",
    author: "Matt Redman",
    authorRole: "Worship Leader & Songwriter",
  },
  {
    quote: "The church that prays together, stays together and grows together.",
    author: "Kenneth Copeland",
    authorRole: "Evangelist",
  },
  {
    quote: "Your calling is where your deepest joy meets the world's greatest need.",
    author: "Frederick Buechner",
    authorRole: "Theologian & Author",
  },
  {
    quote: "God doesn't want your perfect performance. He wants your honest presence.",
    author: "Ann Voskamp",
    authorRole: "Author & Speaker",
  },
  {
    quote: "The only way to do great work is to love what God has called you to do.",
    author: "C.S. Lewis",
    authorRole: "Author & Apologist",
  },
  {
    quote: "When God closes a door, He opens a window. But sometimes He builds a new door.",
    author: "Tony Evans",
    authorRole: "Pastor & Author",
  },
];

export default function AuthLayout({
  children,
}: AuthLayoutProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-slide every 8 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % QUOTES.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds of manual interaction
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const currentQuote = QUOTES[currentIndex];

  return (
    <div className="flex min-h-screen bg-white text-neutral-900 font-normal">
      {/* Left Column - Form */}
      <div className="flex w-full lg:w-1/2 flex-col justify-center px-8 py-12 sm:px-12 lg:px-16 xl:px-24">
        <div className="mx-auto w-full max-w-md">{children}</div>
      </div>

      {/* Right Column - Background with Image*/}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center relative overflow-hidden border-l border-black/[0.03]">
        {/* Background Image */}
        <Image
          src="/Images/Worship1.jpg"
          alt="Church Worship"
          fill
          sizes="50vw"
          className="object-cover"
          priority
          quality={90}
        />
        
        {/* Primary Color Overlay with Gradient */}
        <div 
          className="absolute inset-0" 
          style={{
            background: `linear-gradient(to bottom right, 
              hsl(from var(--primary-dark) h s l / 0.4), 
              hsl(from var(--primary) h s l / 0.75), 
              hsl(from var(--primary) h s l / 0.8))`
          }}
        />
        
        {/* Subtle Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        
        {/* Content */}
        <div className="relative z-10 text-white text-center px-16 max-w-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="space-y-12"
            >
              <h2 className="text-[32px] font-semibold leading-tight drop-shadow-lg">
                "{currentQuote.quote}"
              </h2>

              <div className="space-y-4">
                {/* Clickable Carousel Indicators */}
                <div className="flex justify-center gap-2">
                  {QUOTES.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => goToSlide(idx)}
                      style={{
                        backgroundColor: idx === currentIndex ? 'white' : 'rgba(255, 255, 255, 0.4)',
                        width: idx === currentIndex ? '32px' : '8px'
                      }}
                      className={`h-[3px] rounded-full transition-all duration-500 cursor-pointer hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2`}
                      aria-label={`Go to quote ${idx + 1}`}
                      aria-current={idx === currentIndex ? "true" : "false"}
                    />
                  ))}
                </div>

                <div className="pt-2">
                  <p className="text-[18px] font-semibold text-white drop-shadow-md">
                    {currentQuote.author}
                  </p>
                  <p className="text-[14px] text-white/80 mt-1">
                    {currentQuote.authorRole}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}