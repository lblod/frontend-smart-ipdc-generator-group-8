import Controller from '@ember/controller';
import { service } from '@ember/service';
import { trackedFunction } from 'reactiveweb/function';
import { tracked } from '@glimmer/tracking';
export default class ProductFormController extends Controller {
  @service store;

  queryParams = ['page', 'pageSize', 'sort'];
  @tracked page = 0;
  @tracked pageSize = 20;
  @tracked sort = 'name';

  productsRequest = trackedFunction(this, async () => {
    return this.store.query('public-service', {
      sort: this.sort,
      page: {
        number: this.page,
        size: this.pageSize,
      },
    });
  });
}
