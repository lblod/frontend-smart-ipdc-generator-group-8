import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class PublicService extends Model {
  @attr('language-string-set') title;
  @attr('language-string-set') description;

  @belongsTo('concept', { async: true, inverse: null }) type;

  @hasMany('cost', { async: true, inverse: null }) costs;
  @hasMany('requirement', { async: true, inverse: null }) requirements;
  @hasMany('procedure', { async: true, inverse: null }) procedures;
  @hasMany('website', { async: true, inverse: null }) websites;
}
