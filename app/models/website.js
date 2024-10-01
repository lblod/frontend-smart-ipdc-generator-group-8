import Model, { attr } from '@ember-data/model';

export default class Website extends Model {
  @attr('string') title;
  @attr('string') description;
  @attr('number') url;
}
