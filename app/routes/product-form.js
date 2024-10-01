import Route from '@ember/routing/route';

export default class ProductFormRoute extends Route {
  resetController(controller, isExiting, transition) {
    if (isExiting) {
      controller.resetData();
    }
  }
}
