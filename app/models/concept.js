import Model, { attr, hasMany, belongsTo } from '@ember-data/model';

export default class Concept extends Model {
  @attr('string') label;
  @attr('string') altLabel;
  @attr('string') notation;
  @attr('number') position;

  @hasMany('concept-scheme', { async: true, inverse: 'concepts' })
  conceptSchemes;
  @hasMany('concept-scheme', { async: true, inverse: 'topConcepts' })
  topConceptSchemes;
  @hasMany('concept', { async: true, inverse: 'broader' }) narrower;
  @belongsTo('concept', { async: true, inverse: 'narrower' }) broader;
}
