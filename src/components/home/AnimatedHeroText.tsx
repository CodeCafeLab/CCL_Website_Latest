
"use client";

import { useState, useEffect } from 'react';

interface AnimatedHeroTextProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenTexts?: number;
}

export default function AnimatedHeroText({
  texts,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetweenTexts = 2000
}: AnimatedHeroTextProps) {
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !texts || texts.length === 0) return;

    const handleTyping = () => {
      const fullText = texts[textIndex];
      if (isDeleting) {
        setCurrentText(fullText.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else {
        setCurrentText(fullText.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }

      if (!isDeleting && currentText === fullText) {
        setTimeout(() => setIsDeleting(true), delayBetweenTexts);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
        // Reset charIndex for the new text
        setCharIndex(0);
      }
    };

    const timer = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);
    return () => clearTimeout(timer);
  }, [isMounted, charIndex, currentText, isDeleting, textIndex, texts, typingSpeed, deletingSpeed, delayBetweenTexts]);

  if (!isMounted) {
    // Render a placeholder or nothing on the server and initial client render
    // to avoid hydration mismatch for the animated part.
    // A non-breaking space can help maintain layout if the span has height/padding.
    return <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary">&nbsp;</span>;
  }

  return (
    <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary">
      {currentText}
      <span className="animate-ping">|</span>
    </span>
  );
}
