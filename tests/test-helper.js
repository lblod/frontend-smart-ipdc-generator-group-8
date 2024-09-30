import Application from 'frontend-smart-ipdc-generator-group-8/app';
import config from 'frontend-smart-ipdc-generator-group-8/config/environment';
import * as QUnit from 'qunit';
import { setApplication } from '@ember/test-helpers';
import { setup } from 'qunit-dom';
import { start } from 'ember-qunit';

setApplication(Application.create(config.APP));

setup(QUnit.assert);

start();
