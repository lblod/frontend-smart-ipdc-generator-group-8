import Model, { attr } from '@ember-data/model';

export default class Cost extends Model {
  @attr('string') title;
  @attr('string') description;
  @attr('number') order;
}
