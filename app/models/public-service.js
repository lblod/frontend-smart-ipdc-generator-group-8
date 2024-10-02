import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class PublicService extends Model {
  @attr('language-string-set') name;
  @attr('language-string-set') description;

  @belongsTo('concept', { async: true, inverse: null }) type;

  @hasMany('concept', { async: true, inverse: null }) targetAudiences;
  @hasMany('concept', { async: true, inverse: null }) thematicAreas;
  @hasMany('concept', { async: true, inverse: null }) competentAuthorityLevels;
  @hasMany('concept', { async: true, inverse: null }) executingAuthorityLevels;

  @hasMany('cost', { async: true, inverse: null }) costs;
  @hasMany('requirement', { async: true, inverse: null }) requirements;
  @hasMany('procedure', { async: true, inverse: null }) procedures;
  @hasMany('website', { async: true, inverse: null }) websites;
}
