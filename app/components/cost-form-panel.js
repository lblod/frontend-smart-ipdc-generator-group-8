import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class CostFormPanel extends Component {
  @action
  updateProperty(obj, property, value) {
    obj[property] = value;
  }
}
