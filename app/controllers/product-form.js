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

  @tracked submissionUri = '';

  @tracked name = '';

  @tracked description = '';

  @tracked costs = [];

  @tracked procedures = [];

  @tracked requirements = [];

  @tracked type;

  @tracked themes = [];

  @tracked bevoegdeBestuursniveaus = [];

  @tracked uitvoerendeBestuursniveaus = [];

  @tracked doelgroepen = [];

  fetchSuggestion = task(async () => {
    await timeout(400);
    const suggestion = await this.productsService.fetchSuggestion(
      this.submissionUri
    );
    this.name = suggestion.name ?? '';
    this.description = suggestion.description ?? '';
    this.type = suggestion.type;
    this.themes = suggestion.themes;
    this.doelgroepen = suggestion.doelgroepen;
    this.bevoegdeBestuursniveaus = suggestion.bevoegdeBestuursniveaus;
    this.uitvoerendeBestuursniveaus = suggestion.uitvoerendeBestuursniveaus;
    this.costs = suggestion.costs;
    this.procedures = suggestion.procedures;
    this.requirements = suggestion.requirements;
  });

  @action
  setType(value) {
    this.type = value;
  }

  @action
  setThemes(value) {
    this.themes = value;
  }

  @action
  setBevoegdeBestuursniveaus(value) {
    this.bevoegdeBestuursniveaus = value;
  }

  @action
  setUitvoerendeBestuursniveaus(value) {
    this.uitvoerendeBestuursniveaus = value;
  }

  @action
  setDoelgroepen(value) {
    this.doelgroepen = value;
  }

  @action
  updateSubmissionUri(event) {
    this.submissionUri = event.target.value;
  }

  @action
  updateName(event) {
    this.name = event.target.value;
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
        name: '',
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
        name: '',
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
        name: '',
        description: '',
      }),
    ];
  }

  @action
  removeRequirement(requirement) {
    this.requirements = this.requirements.filter((r) => r != requirement);
  }

  submit = task(async () => {
    const costs = this.costs.map((cost) =>
      this.store.createRecord('cost', {
        name: stringSet(cost.name),
        description: stringSet(cost.description),
      })
    );
    const requirements = this.requirements.map((requirement) =>
      this.store.createRecord('requirement', {
        name: stringSet(requirement.name),
        description: stringSet(requirement.description),
      })
    );
    const procedures = this.procedures.map((procedure) =>
      this.store.createRecord('procedure', {
        name: stringSet(procedure.name),
        description: stringSet(procedure.description),
      })
    );
    await Promise.all(costs.map((cost) => cost.save()));
    await Promise.all(requirements.map((requirement) => requirement.save()));
    await Promise.all(procedures.map((procedure) => procedure.save()));
    const publicService = this.store.createRecord('public-service', {
      name: stringSet(this.name),
      type: this.type,
      targetAudiences: this.doelgroepen,
      thematicAreas: this.themes,
      competentAuthorityLevels: this.bevoegdeBestuursniveaus,
      executingAuthorityLevels: this.uitvoerendeBestuursniveaus,
      description: stringSet(this.description),
      requirements,
      procedures,
      costs,
    });
    await publicService.save();
    this.router.transitionTo('index');
  });

  resetData() {
    this.submissionUri = '';
    this.name = '';
    this.description = '';
    this.type = null;
    this.themes = [];
    this.doelgroepen = [];
    this.uitvoerendeBestuursniveaus = [];
    this.bevoegdeBestuursniveaus = [];
    this.requirements = [];
    this.procedures = [];
    this.costs = [];
  }
}
