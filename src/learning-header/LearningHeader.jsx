import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { getConfig } from '@edx/frontend-platform';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { AppContext } from '@edx/frontend-platform/react';

import AnonymousUserMenu from './AnonymousUserMenu';
import AuthenticatedUserDropdown from './AuthenticatedUserDropdown';
import messages from './messages';

import LogoUAR from '../assets/logo_uar.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe,faPeopleArrows,faChalkboardTeacher,faSearch,faExternalLinkAlt, faChalkboard} from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';

function LinkedLogo({
  href,
  src,
  alt,
  ...attributes
}) {
  return (
    <a href={href} {...attributes}>
      <img className="d-block" src={src} alt={alt} />
    </a>
  );
}

LinkedLogo.propTypes = {
  href: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
class LearningHeader extends React.Component{
  constructor(props) {
    super(props);
    this.state = { lang: Cookies.get(getConfig().LANGUAGE_PREFERENCE_COOKIE_NAME)}
    this.changeLang = this.changeLang.bind(this);
  }
  langLabel(lang){
    return (lang === 'en')?'ENGLISH':'ESPAÑOL';
  }
  langLabelShort(lang){
    return (lang === 'en')?'EN':'ES';
  }
  changeLang(){
    const newLang = (this.state.lang == 'es-419')?'en':'es-419';
    this.setState(state => ({ 
      lang: newLang
    }));
    Cookies.set(getConfig().LANGUAGE_PREFERENCE_COOKIE_NAME,newLang,{domain:'.uardigital.cl',expires: 365,path:'/',secure: true,sameSite:'None'});
    window.location.reload();
  }
  render() {
    const {
      intl,
    } = this.props;
    const { authenticatedUser } = this.context;
    const headerLogo = (
      <LinkedLogo
        className="logo h-100 d-flex align-items-center"
        href={`${getConfig().LMS_BASE_URL}/`}
        src={LogoUAR}
        alt={getConfig().SITE_NAME}
      />
    );
    return (
      <header className="learning-header">
        <div className="d-flex uar-top-header" >
          <div className="d-flex container-xl px-1 align-items-center justify-content-md-between justify-content-end uar-top-header-container">
            <div className="mx-1 mx-md-3 font-weight-bold course-title text-white text-truncate w-100">{this.props.courseTitle}</div>
            <div>
              <button className="btn btn-uar-lang-sel" onClick={this.changeLang}>
                <span><FontAwesomeIcon icon={faGlobe} fixedWidth className="btn-uar-header-icon"/></span>
                <span className="d-none d-md-inline-block">{this.langLabel(this.state.lang)}</span>
                <span className="d-inline-block d-md-none">{this.langLabelShort(this.state.lang)}</span>
              </button>
            </div>
          </div>
      </div>
        <a className="sr-only sr-only-focusable" href="#main-content">{intl.formatMessage(messages.skipNavLink)}</a>
        <div className="container-xl py-2 d-flex align-items-center justify-content-between uar-bottom-header">
          {headerLogo}
          <div className="d-flex flex-row m-0 ml-md-3 w-100 bg-white uar-top-menu-container">
            <a className="text-gray-700 uar-mfe-font uar-font-12p text-decoration-none text-uppercase font-weight-bold py-2 px-3 mx-2 text-center uar-top-menu" href={`${getConfig().LMS_BASE_URL}/dashboard`}>
              <FontAwesomeIcon icon={faChalkboard} fixedWidth className="uar-top-menu-icon d-md-none uar-font-18p"/>
              <div className="text-uppercase mt-2 uar-top-menu-text">{intl.formatMessage(messages.courses)}</div>
            </a>
          </div>
          <div className="d-flex align-items-center justify-content-end flex-row">
            {this.props.showUserDropdown && authenticatedUser && (
              <AuthenticatedUserDropdown
                username={authenticatedUser.username}
              />
            )}
            {this.props.showUserDropdown && !authenticatedUser && (
              <AnonymousUserMenu />
            )}
          </div>
        </div>
      </header>
    );
  }
}

LearningHeader.propTypes = {
  courseOrg: PropTypes.string,
  courseNumber: PropTypes.string,
  courseTitle: PropTypes.string,
  intl: intlShape.isRequired,
  showUserDropdown: PropTypes.bool,
};

LearningHeader.defaultProps = {
  courseOrg: null,
  courseNumber: null,
  courseTitle: null,
  showUserDropdown: true,
};
LearningHeader.contextType = AppContext;
export default injectIntl(LearningHeader);
