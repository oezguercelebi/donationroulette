'use client';

import { useState, useEffect, useRef } from 'react';
import { Charity, CHARITIES } from '@/lib/charities';

interface CharityDialProps {
  isSpinning: boolean;
  onCharitySelected: (charity: Charity) => void;
}

export default function CharityDial({ isSpinning, onCharitySelected }: CharityDialProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  
  // Function to handle the spinning effect
  useEffect(() => {
    if (isSpinning) {
      // Fast spinning through charities during isSpinning
      const interval = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % CHARITIES.length);
      }, 100);
      
      return () => {
        clearInterval(interval);
        // When spinning stops, notify parent of selected charity
        onCharitySelected(CHARITIES[currentIndex]);
      };
    }
  }, [isSpinning, currentIndex, onCharitySelected]);
  
  // Calculate position of each charity item in the picker
  const getItemStyle = (index: number) => {
    const itemHeight = 56; // matches the height-14 class (56px)
    const centerIndex = currentIndex;
    const distanceFromCenter = index - centerIndex;
    
    // Calculate vertical position
    const translateY = distanceFromCenter * itemHeight;
    
    // Apply scaling and opacity based on distance from center
    const scale = 1 - Math.min(Math.abs(distanceFromCenter) * 0.15, 0.3);
    const opacity = 1 - Math.min(Math.abs(distanceFromCenter) * 0.25, 0.7);
    
    return {
      transform: `translateY(${translateY}px) scale(${scale})`,
      opacity,
    };
  };
  
  // Function to manually select a charity
  const selectCharity = (index: number) => {
    if (isSpinning || transitioning) return;
    
    setTransitioning(true);
    setCurrentIndex(index);
    
    // Wait for transition to complete
    setTimeout(() => {
      setTransitioning(false);
      onCharitySelected(CHARITIES[index]);
    }, 400); // Matches the transition duration
  };
  
  // Create a virtual list that includes items before and after for infinite scroll effect
  const virtualItems = [...CHARITIES];
  
  return (
    <div className="charity-picker-container">
      <div className="charity-picker-highlight"></div>
      <div className="charity-picker-overlay"></div>
      
      <div 
        ref={pickerRef}
        className="charity-picker-list"
        style={{ transform: `translateY(${60 - (currentIndex * 56)}px)` }}
      >
        {virtualItems.map((charity, index) => (
          <div
            key={charity.id}
            className={`charity-picker-item ${currentIndex === index ? 'charity-picker-selected' : ''}`}
            style={getItemStyle(index)}
            onClick={() => selectCharity(index)}
          >
            {charity.name}
          </div>
        ))}
      </div>
    </div>
  );
} 