import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

import { getConfig } from '@edx/frontend-platform';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { Dropdown } from '@edx/paragon';

import messages from './messages';

function AuthenticatedUserDropdown({ intl, username }) {
  const dashboardMenuItem = (
    <Dropdown.Item href={`${getConfig().LMS_BASE_URL}/dashboard`}>
      {intl.formatMessage(messages.dashboard)}
    </Dropdown.Item>
  );

  return (
    <>
      <a className="text-gray-700 mr-3 uar-mfe-font uar-font-12p text-decoration-none text-uppercase font-weight-bold uar-top-menu py-2 px-3" href="mailto:soporte@uardigital.cl" target="_blank">{intl.formatMessage(messages.help)}</a>
      <Dropdown className="user-dropdown">
        <Dropdown.Toggle variant="outline-primary">
          <FontAwesomeIcon icon={faUserCircle} size="lg"/>
          <span data-hj-suppress className="d-none d-md-inline mx-2">
            {username}
          </span>
        </Dropdown.Toggle>
        <Dropdown.Menu className="dropdown-menu-right">
          <Dropdown.Item href={`${getConfig().LMS_BASE_URL}/u/${username}`}>
            {intl.formatMessage(messages.profile)}
          </Dropdown.Item>
          { getConfig().ORDER_HISTORY_URL && (
            <Dropdown.Item href={getConfig().ORDER_HISTORY_URL}>
              {intl.formatMessage(messages.orderHistory)}
            </Dropdown.Item>
          )}
          <Dropdown.Item href={getConfig().LOGOUT_URL}>
            {intl.formatMessage(messages.signOut)}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}

AuthenticatedUserDropdown.propTypes = {
  intl: intlShape.isRequired,
  username: PropTypes.string.isRequired,
};

export default injectIntl(AuthenticatedUserDropdown);
