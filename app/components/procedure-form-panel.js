import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class ProcedureFormPanel extends Component {
  @action
  updateProperty(obj, property, value) {
    obj[property] = value;
  }
}
