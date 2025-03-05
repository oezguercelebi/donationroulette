'use client';

import { useState, useEffect } from 'react';
import { Charity, CHARITIES } from '@/lib/charities';

interface CharityPickerProps {
  isSpinning: boolean;
  onCharitySelected: (charity: Charity) => void;
}

export default function CharityPicker({ isSpinning, onCharitySelected }: CharityPickerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealingCharity, setRevealingCharity] = useState(false);
  const [finalCharity, setFinalCharity] = useState<Charity | null>(null);
  
  useEffect(() => {
    let spinInterval: NodeJS.Timeout;
    let revealTimeout: NodeJS.Timeout;

    if (isSpinning) {
      // Reset revealing state when spinning starts
      setRevealingCharity(false);
      setFinalCharity(null);
      
      // Fast spinning through charities during isSpinning
      spinInterval = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % CHARITIES.length);
      }, 100);
      
      // When spinning starts, prepare the final charity
      const selectedCharity = CHARITIES[Math.floor(Math.random() * CHARITIES.length)];
      setFinalCharity(selectedCharity);
      
      // Start revealing animation to match the spinner exactly
      revealTimeout = setTimeout(() => {
        setRevealingCharity(true);
        onCharitySelected(selectedCharity);
      }, 4000); // Match exactly with the spinner animation duration
    }
    
    return () => {
      if (spinInterval) clearInterval(spinInterval);
      if (revealTimeout) clearTimeout(revealTimeout);
    };
  }, [isSpinning, onCharitySelected]);
  
  return (
    <div className="text-2xl font-bold text-primary-dark text-center">
      {isSpinning ? (
        // Show rapidly changing charities during spinning
        CHARITIES[currentIndex].name
      ) : finalCharity ? (
        // Show the final charity when it exists (after spinning)
        finalCharity.name
      ) : (
        // Show the first charity initially
        CHARITIES[0].name
      )}
    </div>
  );
} 