import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { tracked } from 'tracked-built-ins';
import { task, timeout } from 'ember-concurrency';
export default class ProductFormController extends Controller {
  @service products;

  fetchSuggestion = task(async () => {
    await timeout(400);
    const suggestion = await this.products.fetchSuggestion(this.decisionUri);
    this.title = suggestion.title ?? '';
    this.description = suggestion.description ?? '';
    this.costs = suggestion.costs?.map((cost) => tracked(cost)) ?? [];
    this.procedures =
      suggestion.procedures?.map((procedure) => tracked(procedure)) ?? [];
    this.requirements =
      suggestion.requirements?.map((requirement) => tracked(requirement)) ?? [];
  });

  @tracked decisionUri = '';

  @tracked title = '';

  @tracked description = '';

  @tracked costs = [
    tracked({
      title: 'Cost 1',
      description: 'Description of cost 1',
    }),
    tracked({
      title: 'Cost 2',
      description: 'Description of cost 2',
    }),
  ];

  @tracked procedures = [
    tracked({
      title: 'Procedure 1',
      description: 'Description of procedure 1',
    }),
    tracked({
      title: 'Procedure 2',
      description: 'Description of procedure 2',
    }),
  ];

  @tracked requirements = [
    tracked({
      title: 'Requirement 1',
      description: 'Description of requirement 1',
    }),
    tracked({
      title: 'Requirement 2',
      description: 'Description of requirement 2',
    }),
  ];

  @action
  updateDecisionUri(event) {
    this.decisionUri = event.target.value;
  }

  @action
  updateTitle(event) {
    this.title = event.target.value;
  }

  @action
  updateDescription(event) {
    this.description = event.target.value;
  }

  @action
  addCost() {
    this.costs = [
      ...this.costs,
      tracked({
        title: '',
        description: '',
      }),
    ];
  }

  @action
  removeCost(cost) {
    this.costs = this.costs.filter((c) => c != cost);
  }

  @action
  addProcedure() {
    this.procedures = [
      ...this.procedures,
      tracked({
        title: '',
        description: '',
      }),
    ];
  }

  @action
  removeProcedure(procedure) {
    this.procedures = this.procedures.filter((p) => p != procedure);
  }

  @action
  addRequirement() {
    this.requirements = [
      ...this.requirements,
      tracked({
        title: '',
        description: '',
      }),
    ];
  }

  @action
  removeRequirement(requirement) {
    this.requirements = this.requirements.filter((r) => r != requirement);
  }

  @action
  submit() {
    console.log({
      decisionUri: this.decisionUri,
      title: this.title,
      description: this.description,
      requirements: this.requirements,
      costs: this.costs,
      procedures: this.procedures,
    });
    console.log('Submit');
  }
}
