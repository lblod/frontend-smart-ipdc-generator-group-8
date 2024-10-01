import Service from '@ember/service';
import { task } from 'ember-concurrency';
export default class ProductsService extends Service {
  fetchSuggestion = task(async (decisionUri) => {
    return {};
  });
  fetchProducts = task(async () => {
    return [];
  });
}
