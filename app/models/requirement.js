import Model, { attr } from '@ember-data/model';

export default class Requirement extends Model {
  @attr('language-string-set') name;
  @attr('language-string-set') description;
  @attr('number') order;
}
