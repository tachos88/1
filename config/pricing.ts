
import { PricingConfig } from '../types';

export const PRICING_CONFIG: PricingConfig = {
  plan4: {
    price: 129,
    description: 'De Intensieve Start',
    features: [
      '4 weken persoonlijke begeleiding',
      '30 min. 1-op-1 Video Coaching',
      'Dagelijkse focuskaarten',
      'Toegang tot alle recepten & oefeningen',
      'Wekelijkse voortgangsrapportage'
    ]
  },
  plan8: {
    price: 199,
    description: 'Duurzame Transformatie',
    features: [
      '8 weken volledige coaching',
      '1 uur 1-op-1 Video Coaching',
      'Onbeperkt AI Leefstijl Coach (24/7)',
      'Alle voordelen van de 4 weken start',
      'Persoonlijk beweegplan op maat',
      'Blijvende toegang tot de kennisbank'
    ]
  }
};
