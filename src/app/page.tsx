'use client';

import { useState, useEffect } from 'react';
import DonationSpinner from '@/components/DonationSpinner';
import CharityPicker from '@/components/CharityPicker';
import DonationModal from '@/components/DonationModal';
import { Charity, CHARITIES } from '@/lib/charities';

export default function Home() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [selectedCharity, setSelectedCharity] = useState<Charity>(CHARITIES[0]);
  const [showModal, setShowModal] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);

  // Debug effect to monitor state changes
  useEffect(() => {
    console.log('State updated:', {
      isSpinning,
      selectedAmount,
      selectedCharity: selectedCharity?.name,
      showModal
    });
  }, [isSpinning, selectedAmount, selectedCharity, showModal]);

  const handleSpinComplete = (amount: number) => {
    console.log('Spin complete with amount:', amount);
    setSelectedAmount(amount);
    
    // Show modal immediately after spin completes
    setShowModal(true);
  };

  const handleCharitySelected = (charity: Charity) => {
    console.log('Charity selected:', charity.name);
    setSelectedCharity(charity);
  };

  const handleStartSpin = () => {
    // Don't start a new spin if already spinning
    if (isSpinning) return;
    
    console.log('Starting spin');
    setIsSpinning(true);
    // Reset previous state
    setSelectedAmount(null);
    setTxHash(null);
    setShowModal(false);
    
    // Stop spinning after the animation completes
    setTimeout(() => {
      console.log('Spin animation complete');
      setIsSpinning(false);
    }, 4000); // Match exactly with the animation duration
  };

  const handleDonationComplete = (hash: string) => {
    setTxHash(hash);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <main className="min-h-screen p-4 sm:p-6 md:p-10 max-w-0xl mx-auto">
      <div className="bg-background-paper rounded-2xl p-8 md:p-12 shadow-xl border-2 border-primary my-8">
        <div className="flex flex-col items-center gap-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-background-dark mb-4">
              Donation Roulette
            </h1>
            
            <p className="text-background-dark">
              Spin the wheel to randomly select a crypto donation amount, then donate to your chosen charity!
            </p>
          </div>

          <div className="text-center">
              <h3 className="text-xl font-semibold mb-2 text-blue-500">Chosen Charity:</h3>
              <CharityPicker 
                isSpinning={isSpinning}
                onCharitySelected={handleCharitySelected}
              />
          </div>

          <div className="flex flex-col items-center">
            <DonationSpinner 
              isSpinning={isSpinning} 
              onSpinComplete={handleSpinComplete} 
            />
            
            <button 
              className="btn-spin mx-auto mt-8"
              onClick={handleStartSpin}
              disabled={isSpinning || showModal}
            >
              {isSpinning ? 'Spinning...' : 'Spin the Wheel!'}
            </button>
          </div>
        </div>
      </div>
      
      {/* Debug info */}
      <div className="hidden">
        Selected Amount: {selectedAmount}
        Show Modal: {String(showModal)}
        Has Charity: {String(!!selectedCharity)}
      </div>
      
      {showModal && selectedAmount !== null && selectedCharity && (
        <DonationModal
          charity={selectedCharity}
          amount={selectedAmount}
          onClose={handleCloseModal}
          onDonationComplete={handleDonationComplete}
          txHash={txHash}
        />
      )}
    </main>
  );
} 