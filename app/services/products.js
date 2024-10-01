import Service from '@ember/service';
import { task } from 'ember-concurrency';
export default class ProductsService extends Service {
  products = [];

  fetchSuggestion = task(async (decisionUri) => {
    return {};
  });
  fetchProducts = task(async () => {
    return this.products;
  });

  addProduct = task(async (product) => {
    this.products.push(product);
  });
}
