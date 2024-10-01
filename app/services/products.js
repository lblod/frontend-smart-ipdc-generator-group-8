import Service from '@ember/service';
import { task } from 'ember-concurrency';
export default class ProductsService extends Service {
  products = [];

  async fetchSuggestion(decisionUri) {
    return {
             "title":  "Tegemoetkoming in de kosten voor kadervorming voor animatoren in het jeugdwerk",
             "description":  "Vanaf 16 jaar kan een jongere animator in het jeugdwerk worden. Hiervoor kan hij kadervorming volgen.\n\nJe krijgt een tegemoetkoming voor de kosten van het volgen van de kadervorming.",
             "costs":  [],
             "requirements":  [{"title":  "Minimumleeftijd", "description":  "Minimumleeftijd: 15 jaar"},
               {"title":  "Plaats", "description":  "Gedomicilieerd in Sint-Niklaas"},
               {"title":  "Maximumleeftijd", "description":  "Maximumleeftijd: 30 jaar"},
               {"title":  "Bewijs", "description":  "Een bewijs van deelname van minstens vier aaneensluitende vormingsuren kunnen worden voorgelegd."}
             ],
             "procedures":  [{"title":  "Aanvraag procedure", "description":  "Nadat je hebt deelgenomen, vul je het aanvraagformulier in.\n\nJe kan het aanvraagformulier online invullen."}]
           };
  }
  fetchProducts = task(async () => {
    return this.products;
  });

  addProduct = task(async (product) => {
    this.products.push(product);
  });
}
