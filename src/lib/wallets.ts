export interface Wallet {
  id: string;
  name: string;
  iconName: string; // For React Icons
  color: string;
}

export const wallets: Wallet[] = [
  {
    id: 'metamask',
    name: 'MetaMask',
    iconName: 'SiMetamask',
    color: '#F6851B'
  },
  {
    id: 'coinbase',
    name: 'Coinbase Wallet',
    iconName: 'SiCoinbase',
    color: '#0052FF'
  },
  {
    id: 'walletconnect',
    name: 'WalletConnect',
    iconName: 'SiWalletconnect',
    color: '#3B99FC'
  },
  {
    id: 'trustwallet',
    name: 'Trust Wallet',
    iconName: 'SiTrustpilot',
    color: '#3375BB'
  }
]; 