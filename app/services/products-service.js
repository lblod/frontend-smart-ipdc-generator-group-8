import Service from '@ember/service';
import { task } from 'ember-concurrency';
export default class ProductsService extends Service {
  products = [];

  async fetchSuggestion(decisionUri) {
    return {
      name: 'Tegemoetkoming in de kosten voor kadervorming voor animatoren in het jeugdwerk',
      description:
        'Vanaf 16 jaar kan een jongere animator in het jeugdwerk worden. Hiervoor kan hij kadervorming volgen.\n\nJe krijgt een tegemoetkoming voor de kosten van het volgen van de kadervorming.',
      costs: [],
      requirements: [
        { name: 'Minimumleeftijd', description: 'Minimumleeftijd: 15 jaar' },
        { name: 'Plaats', description: 'Gedomicilieerd in Sint-Niklaas' },
        { name: 'Maximumleeftijd', description: 'Maximumleeftijd: 30 jaar' },
        {
          name: 'Bewijs',
          description:
            'Een bewijs van deelname van minstens vier aaneensluitende vormingsuren kunnen worden voorgelegd.',
        },
      ],
      procedures: [
        {
          name: 'Aanvraag procedure',
          description:
            'Nadat je hebt deelgenomen, vul je het aanvraagformulier in.\n\nJe kan het aanvraagformulier online invullen.',
        },
      ],
    };
    const response = await fetch('/decision-consumer/decision', {
      method: 'POST',
      body: {
        uri: decisionUri,
      },
    });
    const data = await response.json();
    return data;
  }
  fetchProducts = task(async () => {
    return this.products;
  });

  addProduct(product) {
    this.products = [...this.products, product];
  }
}
