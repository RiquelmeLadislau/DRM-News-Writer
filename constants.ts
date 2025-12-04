import { NewsStyle, NewsTone, PricingPlan } from './types';

export const APP_NAME = "DRM News Writer";

export const NEWS_STYLES = Object.values(NewsStyle);
export const NEWS_TONES = Object.values(NewsTone);

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Básico',
    credits: 50,
    price: 'R$ 49,90',
    features: ['50 Notícias/mês', 'Geração padrão', 'Histórico de 30 dias', 'Suporte por e-mail']
  },
  {
    id: 'pro',
    name: 'Profissional',
    credits: 200,
    price: 'R$ 149,90',
    features: ['200 Notícias/mês', 'Todos os estilos', 'Histórico ilimitado', 'Prioridade na geração'],
    isPopular: true
  },
  {
    id: 'enterprise',
    name: 'Redação',
    credits: 500,
    price: 'R$ 399,90',
    features: ['500+ Notícias/mês', 'Acesso via API', 'Múltiplos usuários', 'Gerente de conta dedicado']
  }
];

export const MOCK_HISTORY_DATA = [
  {
    headline: "Avanços na Inteligência Artificial Revolucionam o Jornalismo",
    subtitle: "Novas ferramentas permitem que redações foquem em análise profunda enquanto IAs cuidam do factual.",
    body: "Lorem ipsum dolor sit amet...",
    keywords: ["IA", "Jornalismo", "Tecnologia"],
    readingTimeMinutes: 3,
    date: new Date().toISOString()
  }
];