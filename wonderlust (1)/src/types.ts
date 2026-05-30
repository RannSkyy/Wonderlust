export interface Destination {
  id: string;
  name: string;
  nameId?: string;
  country: string;
  countryId?: string;
  rating: number;
  reviewsCount: number;
  pricePerPerson: number;
  image: string;
  description: string;
  descriptionId?: string;
  durationDays: number;
}

export interface BookingInquiry {
  id: string;
  name: string;
  email: string;
  destination: string;
  rooms: number;
  people: number;
  message: string;
  date: string;
  status: 'Received' | 'In Progress' | 'Confirmed';
  createdAt: string;
}

export type NavTab = 'explore' | 'packages' | 'popular' | 'contact' | 'inquiries';
