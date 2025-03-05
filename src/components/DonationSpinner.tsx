'use client';

import { useState, useEffect, useRef } from 'react';
import { DONATION_AMOUNTS } from '@/lib/charities';

interface DonationSpinnerProps {
  isSpinning: boolean;
  onSpinComplete: (amount: number) => void;
}

export default function DonationSpinner({ isSpinning, onSpinComplete }: DonationSpinnerProps) {
  const [rotation, setRotation] = useState(0);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [revealingAmount, setRevealingAmount] = useState(false);
  const spinnerRef = useRef<HTMLDivElement>(null);
  const lastSpinRef = useRef(0);
  const spinIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const spinTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Set up more donation amounts
  const segments = DONATION_AMOUNTS;
  const segmentCount = segments.length;
  const segmentAngle = 360 / segmentCount;

  // Handle spinning effect when isSpinning changes
  useEffect(() => {
    // Clear any existing intervals/timeouts when state changes
    if (spinIntervalRef.current) {
      clearInterval(spinIntervalRef.current);
      spinIntervalRef.current = null;
    }
    
    if (spinTimeoutRef.current) {
      clearTimeout(spinTimeoutRef.current);
      spinTimeoutRef.current = null;
    }

    if (isSpinning) {
      // Reset lastSpinRef to 0 for a fresh spin
      lastSpinRef.current = 0;
      // Reset revealing state when spinning starts
      setRevealingAmount(false);
      setSelectedAmount(null);
      
      // Random rotation between 5 and 10 full rotations (1800-3600 degrees)
      // Plus a random segment offset
      const spinRotations = 5 + Math.random() * 5;
      const randomSegment = Math.floor(Math.random() * segmentCount);
      const randomAngle = randomSegment * segmentAngle;
      
      // Calculate total rotation from the last position
      const newRotation = lastSpinRef.current + (spinRotations * 360) + randomAngle;
      lastSpinRef.current = newRotation;
      
      // Apply the rotation with a smooth transition
      if (spinnerRef.current) {
        spinnerRef.current.style.transition = 'transform 4s cubic-bezier(0.2, 0.8, 0.2, 1)';
        spinnerRef.current.style.transform = `rotate(${newRotation}deg)`;
      }
      
      // Calculate which segment the spinner lands on
      const normalizedRotation = newRotation % 360;
      const landedSegmentIndex = Math.floor(normalizedRotation / segmentAngle);
      const selectedSegment = segments[landedSegmentIndex % segmentCount];
      
      console.log('Selected segment will be:', selectedSegment);
      
      // Set up an interval to update the displayed amount during spinning
      spinIntervalRef.current = setInterval(() => {
        const currentRotation = (Date.now() % 1000) / 1000 * 360; // Full rotation every second
        const currentIndex = Math.floor(currentRotation / segmentAngle) % segmentCount;
        setSelectedAmount(segments[currentIndex]);
      }, 100);
      
      // Reveal the amount and notify parent at the end of the animation
      spinTimeoutRef.current = setTimeout(() => {
        if (spinIntervalRef.current) {
          clearInterval(spinIntervalRef.current);
          spinIntervalRef.current = null;
        }
        console.log('Spin complete, setting final amount:', selectedSegment);
        setSelectedAmount(selectedSegment);
        setRevealingAmount(true);
        onSpinComplete(selectedSegment);
      }, 3900);
    }
    
    // Cleanup function
    return () => {
      if (spinIntervalRef.current) {
        clearInterval(spinIntervalRef.current);
        spinIntervalRef.current = null;
      }
      
      if (spinTimeoutRef.current) {
        clearTimeout(spinTimeoutRef.current);
        spinTimeoutRef.current = null;
      }
    };
  }, [isSpinning, segmentAngle, segmentCount, segments, onSpinComplete]);
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (spinIntervalRef.current) clearInterval(spinIntervalRef.current);
      if (spinTimeoutRef.current) clearTimeout(spinTimeoutRef.current);
    };
  }, []);

  return (
    <div className="spinner-container">
      
      <div
        ref={spinnerRef}
        className="spinner-wheel"
      >
        {segments.map((amount, index) => {
          const angle = index * segmentAngle;
          return (
            <div
              key={index}
              className="spinner-segment"
              style={{
                transform: `rotate(${angle}deg)`,
              }}
            >
              {/* Segment without dollar amount text */}
            </div>
          );
        })}
      </div>
      <div className="spinner-arrow">
        <svg width="32" height="48" viewBox="0 0 32 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 48L0 32H32L16 48Z" fill="#FF4C4C"/>
          <rect x="12" y="0" width="8" height="32" fill="#FF4C4C"/>
        </svg>
      </div>
      <div className="spinner-center">
        <span className="text-background-dark font-bold">
          {isSpinning ? (
            selectedAmount ? `$${selectedAmount.toFixed(2)}` : 'Spinning...'
          ) : selectedAmount ? (
            `$${selectedAmount.toFixed(2)}`
          ) : (
            'Spin!'
          )}
        </span>
      </div>
    </div>
  );
}

// Helper function to get a color for a segment based on its index
function getSegmentColor(index: number): string {
  const colors = [
    '#FFB626', // primary
    '#3CADE2', // secondary
    '#FF4C4C', // accent
    '#50C878', // green
    '#A855F7', // purple
    '#FFB626', // primary
    '#3CADE2', // secondary
    '#FF4C4C', // accent
  ];
  
  return colors[index % colors.length];
} 