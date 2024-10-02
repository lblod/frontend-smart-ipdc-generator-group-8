import { trackedFunction } from 'reactiveweb/function';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class ConceptDropdown extends Component {
  @service store;

  conceptsRequest = trackedFunction(this, async () => {
    return this.store.countAndFetchAll('concept', {
      filter: {
        'top-concept-schemes': {
          ':uri:': this.args.conceptSchemeUri,
        },
      },
    });
  });

  @action
  onChange(conceptOrConcepts) {
    this.args.onChange(conceptOrConcepts);
  }
}
