import React from 'react';
import { PRICING_PLANS } from '../constants';
import { IconCheck } from './Icons';

interface PricingProps {
  onPurchase: (credits: number) => void;
}

const Pricing: React.FC<PricingProps> = ({ onPurchase }) => {
  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Planos de Créditos</h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Escolha o pacote ideal para sua necessidade. Cada crédito equivale a uma notícia completa gerada com qualidade profissional.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {PRICING_PLANS.map((plan) => (
          <div
            key={plan.id}
            className={`relative bg-white rounded-2xl p-8 border ${
              plan.isPopular ? 'border-blue-500 shadow-xl scale-105 z-10' : 'border-slate-200 shadow-sm'
            } flex flex-col`}
          >
            {plan.isPopular && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide">
                Mais Popular
              </div>
            )}
            
            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
              <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                <span className="ml-2 text-slate-500">/mês</span>
              </div>
              <div className="mt-2 text-blue-600 font-medium">
                {plan.credits} créditos
              </div>
            </div>

            <ul className="mb-8 space-y-4 flex-1">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center text-slate-600">
                  <IconCheck className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => onPurchase(plan.credits)}
              className={`w-full py-3 px-4 rounded-lg font-bold transition-all ${
                plan.isPopular
                  ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-blue-500/30'
                  : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
              }`}
            >
              Comprar Agora
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;