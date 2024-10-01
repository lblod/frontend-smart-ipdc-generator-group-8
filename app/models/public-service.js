import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class PublicService extends Model {
  @attr('string') title;
  @attr('string') description;

  @belongsTo('concept', { async: true, inverse: null }) type;

  @hasMany('cost', { async: true, inverse: null }) costs;
  @hasMany('requirement', { async: true, inverse: null }) requirements;
  @hasMany('procedure', { async: true, inverse: null }) procedures;
  @hasMany('website', { async: true, inverse: null }) websites;
}
