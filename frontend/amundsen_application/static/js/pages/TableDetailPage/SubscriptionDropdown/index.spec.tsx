// Copyright Contributors to the Amundsen project.
// SPDX-License-Identifier: Apache-2.0

import * as React from 'react';
import { Dropdown, MenuItem } from 'react-bootstrap';
import { mount } from 'enzyme';

import ApplicationDropdown, { ApplicationDropdownProps } from '.';


const mockGenericProducingTableApp = {
  application_url: 'http://app_url',
  description: 'description',
  id: 'id1',
  name: 'Generic Application',
  kind: 'producing',
};

const mockGenericConsumingTableApp = {
  application_url: 'http://app_url',
  description: 'description',
  id: 'id2',
  name: 'Generic Application',
  kind: 'consuming',
};

const setup = (propOverrides?: Partial<ApplicationDropdownProps>) => {
  const props = {
    tableApps: [],
    ...propOverrides,
  };
  const wrapper = mount<typeof ApplicationDropdown>(
    <ApplicationDropdown {...props} />
  );

  return { props, wrapper };
};

describe('ApplicationDropdown', () => {
  describe('render', () => {
    it('renders without issues', () => {
      expect(() => {
        setup();
      }).not.toThrow();
    });

    describe('when no options are passed', () => {
      it('does not render the component', () => {
        const { wrapper } = setup();
        const expected = 0;
        const actual = wrapper.find('.application-dropdown').length;

        expect(actual).toEqual(expected);
      });
    });
    
  });
});
