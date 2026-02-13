
export enum PlanType {
  NONE = 'none',
  W4 = '4w',
  W8 = '8w'
}

export interface UserBaseline {
  sleep: number;
  stress: number;
  movement: number;
  nutrition: number;
  energy: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  plan: PlanType;
  planActiveUntil?: string;
  onboardingComplete: boolean;
  goals: string[];
  baseline: UserBaseline;
  mobilityLimited: boolean;
  notificationTime: string;
  theme: 'light' | 'dark';
  streak: number;
}

export interface Lead {
  id?: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export interface DailyCard {
  id: string;
  title: string;
  body: string;
  category: 'rust' | 'beweging' | 'voeding' | 'slaap' | 'gewoontes';
  mobilityFriendly: boolean;
  actionType: 'check' | 'slider' | 'text';
  actionLabel: string;
  minLabel?: string;
  maxLabel?: string;
}

export interface CardCompletion {
  id?: string;
  uid: string;
  date: string; // YYYY-MM-DD
  cardId: string;
  value: any;
  reflection: string;
  createdAt: string;
}

export interface KnowledgeItem {
  id: string;
  title: string;
  category: string;
  content: string;
  tags: string[];
  imageUrl?: string;
}

export interface Recipe {
  id: string;
  title: string;
  timeMinutes: number;
  kcal: number;
  protein: number;
  fiber: number;
  ingredients: string[];
  steps: string[];
  imageUrl?: string;
}

export interface Exercise {
  id: string;
  title: string;
  type: 'mobiliteit' | 'kracht' | 'cardio' | 'ademhaling';
  durationMinutes: number;
  level: 'beginner' | 'gevorderd';
  mobilityFriendly: boolean;
  videoUrl?: string;
  instructions: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

export type Result<T, E = Error> = { success: true; data: T } | { success: false; error: E };

// Add missing PricingConfig and PlanDetails interfaces
export interface PlanDetails {
  price: number;
  description: string;
  features: string[];
}

export interface PricingConfig {
  plan4: PlanDetails;
  plan8: PlanDetails;
}
