/**
 * Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
 * under one or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information regarding copyright
 * ownership.
 *
 * Camunda licenses this file to you under the MIT; you may not use this file
 * except in compliance with the MIT License.
 */

import {
  findUsages,
  replaceUsages
} from '../namespace';

import diagram from './fixtures/diagram.bpmn';
import activiti from './fixtures/activiti.xml';
import activitiExpected from './fixtures/activiti-expected.xml';
import activitiCamunda from './fixtures/activitiCamunda.xml';
import activitiCamundaExpected from './fixtures/activitiCamunda-expected.xml';
import activitiComplex from './fixtures/activitiComplex.xml';
import activitiComplexExpected from './fixtures/activitiComplex-expected.xml';
import specialChars from './fixtures/specialChars.xml';
import specialCharsExpected from './fixtures/specialChars-expected.xml';


const NAMESPACE_URL_CAMUNDA = 'http://camunda.org/schema/1.0/bpmn';

const NAMESPACE_ACTIVITI = {
  prefix: 'activiti',
  uri: 'http://activiti.org/bpmn'
};


describe('util - namespace', function() {

  describe('findUsages', function() {

    it('should detect namespace usage', function() {

      // when
      const used = findUsages(activiti, NAMESPACE_URL_CAMUNDA);

      // then
      expect(used).to.eql({
        uri: NAMESPACE_URL_CAMUNDA,
        prefixes: ['camunda']
      });
    });


    it('should detect targetNamespace usage', function() {

      // when
      const used = findUsages(activitiCamunda, NAMESPACE_URL_CAMUNDA);

      // then
      expect(used).to.eql({
        uri: NAMESPACE_URL_CAMUNDA,
        prefixes: []
      });
    });


    it('should indicate not found', function() {

      // when
      const used = findUsages(diagram, NAMESPACE_URL_CAMUNDA);

      // then
      expect(used).to.be.false;
    });


    it('should indicate not found in case of an error', function() {

      // when
      const used = findUsages('error>', NAMESPACE_URL_CAMUNDA);

      // then
      expect(used).to.be.false;
    });


    it('should find prefix with special chars', function() {

      // when
      const used = findUsages(specialChars, NAMESPACE_URL_CAMUNDA);

      // then
      expect(used).to.eql({
        prefixes: [ 'camunda', 'a.b' ],
        uri: 'http://camunda.org/schema/1.0/bpmn'
      });
    });

  });


  describe('replaceUsages', function() {

    it('should replace camunda namespace with activiti', function() {

      // given
      const used = {
        prefixes: [ 'camunda' ],
        uri: NAMESPACE_URL_CAMUNDA
      };

      // when
      const result = replaceUsages(activiti, used, NAMESPACE_ACTIVITI);

      // then
      expect(result).to.eql(activitiExpected);
    });


    it('should not replace activiti prefix', function() {

      // given
      const used = {
        prefixes: [],
        uri: 'http://camunda.org/schema/1.0/bpmn'
      };

      // when
      const result = replaceUsages(activitiCamunda, used, NAMESPACE_ACTIVITI);

      // then
      expect(result).to.eql(activitiCamundaExpected);
    });


    it('should replace camunda namespace in complex diagram', function() {

      // given
      const used = {
        prefixes: [ 'camunda' ],
        uri: 'http://camunda.org/schema/1.0/bpmn'
      };

      // when
      const result = replaceUsages(activitiComplex, used, NAMESPACE_ACTIVITI);

      // then
      expect(result).to.eql(activitiComplexExpected);
    });


    it('should handle special chars', function() {
      // given
      const used = {
        prefixes: [ 'camunda', 'a.b' ],
        uri: 'http://camunda.org/schema/1.0/bpmn'
      };

      // when
      const result = replaceUsages(specialChars, used, NAMESPACE_ACTIVITI);

      // then
      expect(result).to.eql(specialCharsExpected);
    });

  });

});
