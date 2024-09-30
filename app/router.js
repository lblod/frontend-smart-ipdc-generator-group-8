import EmberRouter from '@ember/routing/router';
import config from 'frontend-smart-ipdc-generator-group-8/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {});
