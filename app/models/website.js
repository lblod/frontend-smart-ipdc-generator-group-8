import Model, { attr } from '@ember-data/model';

export default class Website extends Model {
  @attr('language-string-set') name;
  @attr('language-string-set') description;
  @attr('number') url;
}
