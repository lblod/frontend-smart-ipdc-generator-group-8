import Service from '@ember/service';
import { service } from '@ember/service';
import { tracked } from 'tracked-built-ins';

export default class ProductsService extends Service {
  @service store;

  async fetchSuggestion(submissionUri) {
    const response = await fetch(
      'http://smart-ipdc-generator.hackathon-ai-8.s.redhost.be:8080/decision',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uri: submissionUri,
        }),
      }
    );
    console.log('Response: ', response);
    const data = (await response.json()).entry;
    const themes = await Promise.all(
      data.entry_theme.map((t) => this.fetchConceptByLabel(t))
    );
    const type = await this.fetchConceptByLabel(data.entry_type);
    const doelgroepen = (
      await Promise.all(
        data.entry_doelgroep.map((d) => this.fetchConceptByLabel(d))
      )
    ).filter(Boolean);
    const bevoegdeBestuursniveaus = (
      await Promise.all(
        data.bevoegde_bestuursniveau.map((b) => this.fetchConceptByLabel(b))
      )
    ).filter(Boolean);
    const uitvoerendeBestuursniveaus = (
      await Promise.all(
        data.uitvoerende_bestuursniveau.map((b) => this.fetchConceptByLabel(b))
      )
    ).filter(Boolean);
    return {
      name: data.name,
      description: data.description,
      procedures: data.procedure.map((p) => tracked(p)),
      costs: data.cost.map((c) => tracked(c)),
      requirements: data.condition.map((c) => tracked(c)),
      themes,
      type,
      doelgroepen,
      bevoegdeBestuursniveaus,
      uitvoerendeBestuursniveaus,
    };
    // return data;
  }

  async fetchConceptByLabel(label) {
    const result = await this.store.query('concept', {
      filter: {
        label,
      },
    });
    return result[0];
  }
}
