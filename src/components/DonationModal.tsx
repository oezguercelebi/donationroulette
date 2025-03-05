'use client';

import { useState, useEffect } from 'react';
import { Charity } from '@/lib/charities';
import { isWalletAvailable, sendDonation } from '@/lib/walletHelper';
import { wallets } from '@/lib/wallets';
import Image from 'next/image';

interface DonationModalProps {
  charity: Charity;
  amount: number;
  onClose: () => void;
  onDonationComplete: (txHash: string) => void;
  txHash: string | null;
}

export default function DonationModal({
  charity,
  amount,
  onClose,
  onDonationComplete,
  txHash
}: DonationModalProps) {
  const [modalCharity, setModalCharity] = useState<Charity>(charity);
  useEffect(() => {
    setModalCharity(charity);
  }, [charity]);

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [availableWallets, setAvailableWallets] = useState(wallets);

  // Check which wallets are available
  useEffect(() => {
    const checkWallets = async () => {
      const available = wallets.filter(wallet => isWalletAvailable(wallet.id));
      setAvailableWallets(available);
    };
    
    checkWallets();
  }, []);

  const handleDonateWithWallet = async (walletId: string) => {
    setIsProcessing(true);
    setError(null);
    
    try {
      // Send the donation using the selected wallet
      const result = await sendDonation(walletId, modalCharity.walletAddress, amount);
      
      if (result.success && result.txHash) {
        onDonationComplete(result.txHash);
      } else {
        throw new Error(result.error || 'Transaction failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Transaction failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-container" 
        onClick={e => e.stopPropagation()}
      >
        {txHash ? (
          <>
            <h2 className="modal-header">Donation Complete! 🎉</h2>
            
            <div className="flex flex-col items-center mb-6">
              <div className="relative w-20 h-20 mb-4">
                {modalCharity.imageUrl ? (
                  <Image 
                    src={modalCharity.imageUrl} 
                    alt={modalCharity.name} 
                    fill 
                    className="object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                ) : null}
                <div className={`w-full h-full rounded-full bg-primary-light flex items-center justify-center ${modalCharity.imageUrl ? 'hidden' : ''}`}>
                  <span className="text-xl font-bold text-primary-dark">
                    {modalCharity.name.charAt(0)}
                  </span>
                </div>
              </div>
              
              <p className="text-xl font-bold text-primary-dark">{modalCharity.name}</p>
              <p className="text-3xl font-bold text-accent-dark mt-2">${amount.toFixed(2)}</p>
            </div>
            
            <div className="bg-background-light p-4 rounded-lg text-xs text-center mt-4 mb-6 break-all">
              <p className="text-gray-600 mb-1">Transaction Hash:</p>
              <p className="font-mono text-background-dark">{txHash}</p>
            </div>
            
            <div className="flex justify-center">
              <button 
                onClick={onClose}
                className="btn-spin"
              >
                Close
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="modal-header">Confirm Your Donation</h2>
            
            <div className="flex flex-col items-center mb-6">
              <div className="relative w-20 h-20 mb-4">
                {modalCharity.imageUrl ? (
                  <Image 
                    src={modalCharity.imageUrl} 
                    alt={modalCharity.name} 
                    fill 
                    className="object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                ) : null}
                <div className={`w-full h-full rounded-full bg-primary-light flex items-center justify-center ${modalCharity.imageUrl ? 'hidden' : ''}`}>
                  <span className="text-xl font-bold text-primary-dark">
                    {modalCharity.name.charAt(0)}
                  </span>
                </div>
              </div>
              
              <p className="text-xl font-bold text-primary-dark">{modalCharity.name}</p>
              <p className="text-3xl font-bold text-accent-dark mt-2">${amount.toFixed(2)}</p>
              <p className="text-sm text-gray-600 mt-2">{modalCharity.description}</p>
            </div>
            
            {isProcessing ? (
              <div className="flex flex-col items-center p-6">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-background-dark">Processing your donation...</p>
              </div>
            ) : error ? (
              <div className="text-accent text-center mb-6">
                <p>{error}</p>
                <button 
                  onClick={() => setError(null)}
                  className="text-primary underline mt-2"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {availableWallets.length > 0 ? (
                    availableWallets.map(wallet => (
                      <button 
                        key={wallet.id}
                        onClick={() => handleDonateWithWallet(wallet.id)}
                        className="wallet-button w-full text-black"
                        style={{ borderColor: wallet.color }}
                      >
                        <span className="w-6 h-6 rounded-full flex items-center justify-center mr-2" style={{ backgroundColor: wallet.color }}>
                          <span className="text-white text-xs">Ξ</span>
                        </span>
                        Donate with {wallet.name}
                      </button>
                    ))
                  ) : (
                    <div className="text-center text-accent p-4 bg-accent bg-opacity-10 rounded-lg">
                      <p>No compatible wallets detected.</p>
                      <p className="mt-2 text-sm">Please install MetaMask or another Web3 wallet to continue.</p>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-center mt-6">
                  <button 
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700 font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
} 