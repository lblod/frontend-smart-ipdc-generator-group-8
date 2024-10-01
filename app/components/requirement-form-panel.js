import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class RequirementFormPanel extends Component {
  @action
  updateProperty(obj, property, value) {
    obj[property] = value;
  }
}
