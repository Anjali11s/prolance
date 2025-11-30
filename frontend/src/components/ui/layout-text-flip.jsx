"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export const LayoutTextFlip = ({
  text = "Discover",
  words = [
    "Graphic Designers",
    "Web Developers",
    "Video Editors",
    "Videographers",
    "Photographers",
    "Content Writers",
    "Meme Creators"
  ],
  duration = 2500,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
    <div className="flex flex-col items-center justify-center min-h-screen w-full -mt-10">
      <div className="flex items-center gap-6">
        <motion.span
          layoutId="subtext"
          className="text-2xl font-bold tracking-tight drop-shadow-lg md:text-4xl">
          {text}
        </motion.span>
        <motion.span
          layout
          className=" relative overflow-hidden rounded-md border border-transparent bg-white px-4 py-2 font-sans text-2xl font-bold tracking-tight text-green-400 shadow-sm ring shadow-black/10 ring-black/10 drop-shadow-lg md:text-4xl dark:bg-neutral-900 dark:text-white dark:shadow-sm dark:ring-1 dark:shadow-white/10 dark:ring-white/10">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={currentIndex}
              initial={{ y: -40, filter: "blur(10px)" }}
              animate={{
                y: 0,
                filter: "blur(0px)",
              }}
              exit={{ y: 50, filter: "blur(10px)", opacity: 0 }}
              transition={{
                duration: 0.5,
              }}
              className={cn("inline-block whitespace-nowrap")}>
              {words[currentIndex]}
            </motion.span>
          </AnimatePresence>
        </motion.span>
        <br /><br />
      </div>
      <p className="text-center text-gray-800 mt-8 max-w-2xl">
        Find the perfect freelancer for your project. Browse our talented professionals and get your work done efficiently.
      </p><br/><br />
      <div className="flex gap-4 flex-wrap relative mt-10">
        <button
          className=" cursor-pointer px-5 py-1.5 text-sm text-gray-700 font-light rounded-full border border-gray-300 hover:bg-green-300/30 hover:text-black hover:border-green-400 transition-all duration-300">
            Programming and Tech
        </button>
        <button
          className="cursor-pointer px-5 py-1.5 text-sm text-gray-700 font-light rounded-full border border-gray-300 hover:bg-green-300/30 hover:text-black hover:border-green-400 transition-all duration-300">
            Graphics and Design
        </button>
        <button
          className="cursor-pointer px-5 py-1.5 text-sm text-gray-700 font-light rounded-full border border-gray-300 hover:bg-green-300/30 hover:text-black hover:border-green-400 transition-all duration-300">
            Digital Marketing
        </button>
        <button
          className="cursor-pointer px-5 py-1.5 text-sm text-gray-700 font-light rounded-full border border-gray-300 hover:bg-green-300/30 hover:text-black hover:border-green-400 transition-all duration-300">
            Writing and Translation
        </button>
        <button
          className="cursor-pointer px-5 py-1.5 text-sm text-gray-700 font-light rounded-full border border-gray-300 hover:bg-green-300/30 hover:text-black hover:border-green-400 transition-all duration-300">
            Video and Animation
        </button>
        <button
          className="cursor-pointer px-5 py-1.5 text-sm text-gray-700 font-light rounded-full border border-gray-300 hover:bg-green-300/30 hover:text-black hover:border-green-400 transition-all duration-300">
            Ai Services
        </button>
        <button
          className="cursor-pointer px-5 py-1.5 text-sm text-gray-700 font-light rounded-full border border-gray-300 hover:bg-green-300/30 hover:text-black hover:border-green-400 transition-all duration-300">
            Music and Audio
        </button>
      </div>
      <div className="flex gap-4 flex-wrap relative mt-5">
        <button
          className="cursor-pointer px-5 py-1.5 text-sm text-gray-700 font-light rounded-full border border-gray-300 hover:bg-green-300/30 hover:text-black hover:border-green-400 transition-all duration-300">
            Business
        </button>
        <button
          className="cursor-pointer px-5 py-1.5 text-sm text-gray-700 font-light rounded-full border border-gray-300 hover:bg-green-300/30 hover:text-black hover:border-green-400 transition-all duration-300">
            Consulting
        </button>
        <button
          className="cursor-pointer px-5 py-1.5 text-sm text-gray-700 font-light rounded-full border border-gray-300 hover:bg-green-300/30 hover:text-black hover:border-green-400 transition-all duration-300">
            Health and Fitness
        </button>
        <button
          className="cursor-pointer px-5 py-1.5 text-sm text-gray-700 font-light rounded-full border border-gray-300 hover:bg-green-300/30 hover:text-black hover:border-green-400 transition-all duration-300">
            Education
        </button>
        <button
          className="cursor-pointer px-5 py-1.5 text-sm text-gray-700 font-light rounded-full border border-gray-300 hover:bg-green-300/30 hover:text-black hover:border-green-400 transition-all duration-300">
            Legal
        </button>
      </div>



    </div>
    
    </>
  );
};
