import Model, { attr } from '@ember-data/model';

export default class Procedure extends Model {
  @attr('string') title;
  @attr('string') description;
  @attr('number') order;
}
