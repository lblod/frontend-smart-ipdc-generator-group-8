import Model, { attr } from '@ember-data/model';

export default class Requirement extends Model {
  @attr('string') title;
  @attr('string') description;
  @attr('number') order;
}
