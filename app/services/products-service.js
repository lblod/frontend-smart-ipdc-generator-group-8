import Service from '@ember/service';
import { task } from 'ember-concurrency';
export default class ProductsService extends Service {
  products = [];

  async fetchSuggestion(decisionUri) {
    return {
      title: 'Sample title',
      description: 'Sample description',
      costs: [{ title: 'Cost 1', description: 'Cost 1 desc' }],
      procedures: [{ title: 'Procedure 1', description: 'Procedure 1 desc' }],
      requirements: [
        { title: 'Requirement 1', description: 'Requirement 1 desc' },
      ],
    };
  }
  fetchProducts = task(async () => {
    return this.products;
  });

  addProduct(product) {
    this.products = [...this.products, product];
  }
}
