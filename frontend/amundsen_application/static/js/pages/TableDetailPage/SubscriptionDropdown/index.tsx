// Copyright Contributors to the Amundsen project.
// SPDX-License-Identifier: Apache-2.0

import * as React from 'react';
import { Dropdown } from 'react-bootstrap';

import AvatarLabel from 'components/AvatarLabel';
import { TableApp } from 'interfaces';
import { logClick } from 'utils/analytics';
import GenericMenu from './GenericMenu';
import {
  APPLICATIONS_LABEL,
  GENERIC_APP_LOGO_PATH,
  OPTIONS
} from './constants';
import './styles.scss';

export interface ApplicationDropdownProps {
  tableApps: TableApp[];
}

const getImagePath = (tableAppName) => {
  switch (tableAppName) {
    default:
      return GENERIC_APP_LOGO_PATH;
  }
};

const sortByNameOrId = (a, b) =>
  a.name.localeCompare(b.name) || a.id.localeCompare(b.id);

const hasSameNameAndKind = (app, name, kind) =>
  app.name === name &&
  ((app.kind && app.kind === kind));

const getSortedAppKinds = (apps: TableApp[]) => {
  const appKinds: string[] = [
    ...new Set(apps.map((app) => (app.kind ? app.kind : OPTIONS))),
  ];

  const sortedKinds = appKinds.filter(
    (kind) =>
      kind.toLowerCase() !== OPTIONS
  );

  return [...sortedKinds];
};

const handleClick = (event) => {
  event.stopPropagation();
  logClick(event);
};

const getDropdownMenuContents = (tableApps) => {

  return (
    <GenericMenu
      tableApps={tableApps}
      getSortedAppKinds={getSortedAppKinds}
      hasSameNameAndKind={hasSameNameAndKind}
      handleClick={handleClick}
    />
  );
};

const SubscriptionDropdown: React.FC<ApplicationDropdownProps> = ({
  tableApps,
}: ApplicationDropdownProps) => {
  if (tableApps === null || tableApps.length === 0) {
    return null;
  }

  tableApps.sort(sortByNameOrId);

  const image = getImagePath(tableApps[0].name.toLowerCase());
  const avatarLabel = APPLICATIONS_LABEL;

  return (
    <Dropdown
      className="header-link application-dropdown"
      id="application-dropdown"
      pullRight
    >
      <Dropdown.Toggle className="application-dropdown-button">
        <AvatarLabel
          label={avatarLabel}
          src={image}
          round={false}
        />
      </Dropdown.Toggle>
      <Dropdown.Menu className="application-dropdown-menu">
        {getDropdownMenuContents(tableApps)}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SubscriptionDropdown;
