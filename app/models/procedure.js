import Model, { attr } from '@ember-data/model';

export default class Procedure extends Model {
  @attr('language-string-set') title;
  @attr('language-string-set') description;
  @attr('number') order;
}
