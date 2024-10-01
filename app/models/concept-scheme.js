import Model, { attr, hasMany } from '@ember-data/model';

export default class ConceptScheme extends Model {
  @attr('string') label;

  @hasMany('concept-scheme', { async: true, inverse: 'conceptSchemes' })
  concepts;
  @hasMany('concept-scheme', { async: true, inverse: 'topConceptSchemes' })
  topConcepts;
}
