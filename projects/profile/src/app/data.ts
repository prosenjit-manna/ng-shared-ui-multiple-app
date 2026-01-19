import { User } from '../../../shared-ui/src/lib/types';

export const userData: User | null = {
  name: 'John Doe',
  email: 'john.doe@gmail.com',
  role: 'admin',
};

export const paymentInfo = {
  lastPaymentReceived: '12/15/2025',
  paymentDueDate: '01/25/2026',
  paymentAmount: 1250.0,
  accountStatus: 'Active',
};

export const pieChartData = {
  labels: ['Payment', 'Documents', 'Tax and Insurance', 'Loan', 'Assistance Program'],
  datasets: [
    {
      data: [35, 25, 20, 15, 5],
      backgroundColor: [
        '#1E3A8A', // blue-900
        '#1D4ED8', // blue-700
        '#2563EB', // blue-600
        '#3B82F6', // blue-500
        '#60A5FA', // blue-400
      ],
      hoverBackgroundColor: [
        '#1E40AF', // darker hover
        '#1E40AF',
        '#1D4ED8',
        '#2563EB',
        '#3B82F6',
      ],
      borderWidth: 0,
    },
  ],
};

export const pieChartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  cutout: '72%', // thinner doughnut = visually smaller
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        usePointStyle: true,
        boxWidth: 8, // smaller legend dots
        padding: 10, // tighter spacing
        marginTop: 10,
        font: {
          size: 12, // smaller legend text
        },
      },
    },
  },
};

export const accountDetails = {
  customerName: 'John Doe',
  propertyAddress: '123 Main St, City, ST 12345',
  principalBalance: '$***',
  payoffQuoteNote: '*This amount is not a payoff quote. If you would like a payoff quote, please',
  payoffQuoteLink: '#',
};

export const importantMessages = [
  {
    text: 'You are eligible to sign up for our no-fee automatic withdrawal program to make your monthly mortgage payment.',
    link: '#',
    linkText: 'click here',
  },
  {
    text: 'You asked for paperless communication and we listened! You can now enroll to receive your statement via email.',
    link: '#',
    linkText: 'Click here to enroll',
  },
];

export const letters = [
  {
    date: 'MM/DD/YYYY',
    name: 'Acknowledgement Letter',
    link: '#',
  },
  {
    date: 'MM/DD/YYYY',
    name: 'Escrow Analysis Statement',
    link: '#',
  },
];

export const documents = [
  {
    date: '01/15/2026',
    name: '2025 Tax Statement',
    link: '#',
  },
  {
    date: '12/01/2025',
    name: 'Annual Statement',
    link: '#',
  },
];
