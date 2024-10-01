import Controller from '@ember/controller';
import { trackedFunction } from 'reactiveweb/function';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
export default class ProductFormController extends Controller {
  suggestedProductRequest = trackedFunction(this, async () => {});

  @action
  submit() {
    console.log('Submit');
  }
}
