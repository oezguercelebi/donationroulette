export interface Charity {
  id: string;
  name: string;
  description: string;
  walletAddress: string;
  imageUrl?: string;
}

// Expanded donation amounts with more options
export const DONATION_AMOUNTS = [
  0.05, 0.10, 0.25, 0.50, 1.00, 2.00, 5.00, 10.00
];

// Use consistent UPPERCASE naming for constants
export const CHARITIES: Charity[] = [
  {
    id: 'water-org',
    name: 'Water.org',
    description: 'Access to safe water and sanitation to families around the world through affordable financing.',
    walletAddress: '0x1234567890123456789012345678901234567890',
    imageUrl: '/images/water-org.png'
  },
  {
    id: 'save-children',
    name: 'Save the Children',
    description: 'Giving children a healthy start, the opportunity to learn, and protection from harm.',
    walletAddress: '0x2345678901234567890123456789012345678901',
    imageUrl: '/images/save-children.png'
  },
  {
    id: 'doctors-borders',
    name: 'Doctors Without Borders',
    description: 'Medical humanitarian organization providing aid in nearly 70 countries to people affected by conflict, epidemics, disasters, or exclusion from healthcare.',
    walletAddress: '0x3456789012345678901234567890123456789012',
    imageUrl: '/images/doctors-borders.png'
  },
  {
    id: 'wwf',
    name: 'World Wildlife Fund',
    description: 'Leading organization in wildlife conservation and endangered species protection.',
    walletAddress: '0x4567890123456789012345678901234567890123',
    imageUrl: '/images/wwf.png'
  },
  {
    id: 'unicef',
    name: 'UNICEF',
    description: 'Works in over 190 countries to save children\'s lives, defend their rights, and help them fulfill their potential.',
    walletAddress: '0x5678901234567890123456789012345678901234',
    imageUrl: '/images/unicef.png'
  },
  {
    id: 'acumen',
    name: 'Acumen',
    description: 'Changing the way the world tackles poverty by investing in sustainable businesses, leaders, and ideas.',
    walletAddress: '0x6789012345678901234567890123456789012345',
    imageUrl: '/images/acumen.png'
  }
]; 