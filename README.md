# Donation Roulette

A fun, interactive web application that allows users to donate cryptocurrency to charities by spinning a wheel. The application is built with Next.js and features a colorful, Clash of Clans-inspired UI.

## Features

- Interactive spinner wheel with randomized donation amounts
- Animated charity selection dial
- Confetti celebration animation on successful spin
- Modal dialog showing donation details
- Support for multiple cryptocurrency wallets
- Responsive design

## Technology Stack

- Next.js 14
- TypeScript
- TailwindCSS
- React Confetti for animations
- Ethers.js/Web3.js for cryptocurrency wallet integration (mock implementation for now)

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone https://github.com/your-username/donationroulette.git
   cd donationroulette
   ```

2. Install dependencies
   ```
   npm install
   # or
   yarn install
   ```

3. Run the development server
   ```
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application

## Project Structure

- `src/app/` - Next.js app router files
- `src/components/` - React components
  - `DonationSpinner.tsx` - The main spinner wheel component
  - `CharityDial.tsx` - The charity selection dial component
  - `DonationModal.tsx` - The donation result modal with wallet selection
- `src/lib/` - Utility functions and data
  - `charities.ts` - Charity data (names and wallet addresses)
  - `wallets.ts` - Cryptocurrency wallet configurations
  - `walletHelper.ts` - Mock implementation of wallet connections

## Customizing the Charity List

To add or modify the list of charities, edit the `src/lib/charities.ts` file. Each charity must have:

- `id`: Unique identifier for the charity
- `name`: Display name of the charity
- `description`: Brief description of the charity's mission
- `walletAddress`: Ethereum wallet address to receive donations
- `website` (optional): URL to the charity's website
- `logoUrl` (optional): Path to charity's logo image

## Future Enhancements

- Actual cryptocurrency wallet integration
- Transaction history tracking
- Charity verification and rating system
- Support for multiple cryptocurrencies
- Mobile app version

## License

This project is licensed under the MIT License - see the LICENSE file for details 