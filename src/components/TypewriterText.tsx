import React, { useState, useEffect, useRef } from 'react';

interface TypewriterTextProps {
  text: string;
  delay?: number;
  typingSpeed?: number;
  keywords?: string[];
  showKeywords?: boolean;
  onComplete?: () => void;
  className?: string;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  delay = 0,
  typingSpeed = 30,
  keywords = [],
  showKeywords = false,
  onComplete,
  className = '',
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setDisplayedText('');
    setIsTyping(false);
    setIsComplete(false);

    timeoutRef.current = setTimeout(() => {
      setIsTyping(true);
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [text, delay]);

  useEffect(() => {
    if (!isTyping) return;

    if (displayedText.length < text.length) {
      timeoutRef.current = setTimeout(() => {
        setDisplayedText(text.substring(0, displayedText.length + 1));
      }, typingSpeed);
    } else {
      setIsTyping(false);
      setIsComplete(true);
      if (onComplete) {
        onComplete();
      }
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [displayedText, text, typingSpeed, isTyping, onComplete]);

  const highlightKeywords = (text: string, keywords: string[]) => {
    if (!keywords.length || !showKeywords) return text;

    let highlightedText = text;
    keywords.forEach(keyword => {
      const regex = new RegExp(`(${keyword})`, 'gi');
      highlightedText = highlightedText.replace(regex, '<span class="keyword-highlight">$1</span>');
    });

    return highlightedText;
  };

  return (
    <p 
      className={`${className} relative`}
      dangerouslySetInnerHTML={{ 
        __html: highlightKeywords(displayedText, keywords)
      }}
    />
  );
};

export default TypewriterText;