import Service from '@ember/service';
import { service } from '@ember/service';
import { tracked } from 'tracked-built-ins';

export default class ProductsService extends Service {
  @service store;

  async fetchSuggestion(submissionUri) {
    // const data = {
    //   name: 'Tegemoetkoming in de kosten voor kadervorming voor animatoren in het jeugdwerk',
    //   description:
    //     'Vanaf 16 jaar kan een jongere animator in het jeugdwerk worden. Hiervoor kan hij kadervorming volgen.\n\nJe krijgt een tegemoetkoming voor de kosten van het volgen van de kadervorming.',
    //   procedure: [
    //     {
    //       name: 'Aanvraag procedure',
    //       description:
    //         'Nadat je hebt deelgenomen, vul je het aanvraagformulier in.\n\nJe kan het aanvraagformulier online invullen.',
    //     },
    //   ],
    //   cost: [],
    //   condition: [
    //     { name: 'Minimumleeftijd', description: 'Minimumleeftijd: 15 jaar' },
    //     { name: 'Plaats', description: 'Gedomicilieerd in Sint-Niklaas' },
    //     { name: 'Maximumleeftijd', description: 'Maximumleeftijd: 30 jaar' },
    //     {
    //       name: 'Bewijs',
    //       description:
    //         'Een bewijs van deelname van minstens vier aaneensluitende vormingsuren kunnen worden voorgelegd.',
    //     },
    //   ],
    //   entry_theme: ['Cultuur, Sport en Vrije Tijd'],
    //   entry_type: 'Financieel voordeel',
    //   entry_doelgroep: ['Burger', 'Organisatie'],
    //   bevoegde_bestuursniveau: ['Provinciale overheid'],
    //   uitvoerende_bestuursniveau: ['Lokale overheid'],
    // };

    // This will probably cause CORS issues, for this to work you need to disable CORS.
    // The alternative is to use the app with the mock-data defined above
    const response = await fetch(
      'https://backend.hackathon-ai-8.s.redhost.be/decision',
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
