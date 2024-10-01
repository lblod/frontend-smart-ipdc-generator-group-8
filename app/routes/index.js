import Route from '@ember/routing/route';

export default class IndexRoute extends Route {
  queryParams = {
    pageSize: { refreshModel: false },
    page: { refreshModel: false },
    sort: { refreshModel: false },
  };
}
