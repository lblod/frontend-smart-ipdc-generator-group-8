import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { tracked } from 'tracked-built-ins';
import { task, timeout } from 'ember-concurrency';
import { stringSet } from '../utils';
export default class ProductFormController extends Controller {
  @service productsService;
  @service store;
  @service router;

  fetchSuggestion = task(async () => {
    await timeout(400);
    const suggestion = await this.productsService.fetchSuggestion(
      this.decisionUri
    );
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

  @tracked costs = [];

  @tracked procedures = [];

  @tracked requirements = [];

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
  async submit() {
    const costs = this.costs.map((cost) =>
      this.store.createRecord('cost', {
        title: stringSet(cost.title),
        description: stringSet(cost.description),
      })
    );
    const requirements = this.requirements.map((requirement) =>
      this.store.createRecord('requirement', {
        title: stringSet(requirement.title),
        description: stringSet(requirement.description),
      })
    );
    const procedures = this.procedures.map((procedure) =>
      this.store.createRecord('procedure', {
        title: stringSet(procedure.title),
        description: stringSet(procedure.description),
      })
    );
    await Promise.all(costs.map((cost) => cost.save()));
    await Promise.all(requirements.map((requirement) => requirement.save()));
    await Promise.all(procedures.map((procedure) => procedure.save()));
    const publicService = this.store.createRecord('public-service', {
      title: stringSet(this.title),
      description: stringSet(this.description),
      requirements,
      procedures,
      costs,
    });
    await publicService.save();
    this.productsService.addProduct(publicService);
    // this.router.transitionTo('index');
  }

  resetData() {
    this.decisionUri = '';
    this.title = '';
    this.description = '';
    this.requirements = [];
    this.procedures = [];
    this.costs = [];
  }
}
