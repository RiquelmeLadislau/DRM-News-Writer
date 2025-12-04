export enum NewsStyle {
  URGENT = 'Urgente / Breaking News',
  INVESTIGATIVE = 'Investigativa / Profunda',
  SPORTS = 'Esportiva',
  TECH = 'Tecnologia & Inovação',
  POLITICS = 'Política & Economia',
  LIFESTYLE = 'Variedades / Lifestyle',
  CORPORATE = 'Corporativo / Press Release'
}

export enum NewsTone {
  OBJECTIVE = 'Objetivo e Neutro',
  SENSATIONALIST = 'Chamativo / Sensacionalista',
  FORMAL = 'Formal e Técnico',
  CASUAL = 'Leve e Conversacional',
  OPINIONATED = 'Analítico / Opinativo'
}

export interface GeneratedNews {
  headline: string;
  subtitle: string;
  body: string;
  keywords: string[];
  readingTimeMinutes: number;
  date: string;
}

export interface UserState {
  credits: number;
  history: GeneratedNews[];
  plan: 'Starter' | 'Pro' | 'Enterprise';
}

export interface PricingPlan {
  id: string;
  name: string;
  credits: number;
  price: string;
  features: string[];
  isPopular?: boolean;
}