import React, { Component } from 'react';

import NotificationIcon from '../../svgIcons/headerIcons/Notification';
import NotificationList from '../notificationList/NotificationList.component';
import ProfileDisplay from '../profileDisplay/ProfileDisplay.component';
import Breadcrumb from '../breadcrumb/Breadcrumb.component';

import './Header.scss';

/**
 * The header component
 * @extends React.Component
 */
export default class Header extends Component {
  state = {
    ...this.initialState,
  };

  initialState = {
    showNotificationDropdown: false,
    showProfileDropdown: false,
  };

  /**
   * Returns the value for className of a dropdown
   * @param {boolean} isActive Whether or not to show the dropdown
   * @param {array[string]} classList Other values for the className
   */
  dropdownClass = (isActive, classList) => `${classList.join(' ')} ${isActive ? 'headerDropdown--active' : ''}`;

  /**
   * Generates an event handler for click or keypress events
   * @param {string} stateKey
   * @returns {function} Toggles dropdown on click or on ENTER key press
   */
  showDropdown(stateKey) {
    return (event) => {
      if (event.type === 'keydown' && event.keyCode !== 13) {
        return;
      }
      this.setState(prevState => ({
        ...this.initialState,
        [stateKey]: !prevState[stateKey],
      }));
    };
  }

  /**
   * Renders the component
   * @returns {jsx}
   */
  render() {
    return (
      <div className="headerWrapper">
        <div className="leftHeader">
          <Breadcrumb />
        </div>
        <div className="rightHeader">
          <div className="headerIcon">
            <span
              className="headerIcon__image"
              onClick={this.showDropdown('showNotificationDropdown')}
              onKeyDown={this.showDropdown('showNotificationDropdown')}
              role="button"
              tabIndex="0"
            >
              <NotificationIcon />
            </span>
            <span className="headerIcon__badge">1</span>
            <div className={this.dropdownClass(this.state.showNotificationDropdown, ['headerDropdown'])}>
              <NotificationList />
            </div>
          </div>
          <div className="headerIcon">
            <span
              className="headerIcon__image headerIcon__image--photo"
              onClick={this.showDropdown('showProfileDropdown')}
              onKeyDown={this.showDropdown('showProfileDropdown')}
              role="button"
              tabIndex="0"
              style={{
                backgroundImage: 'url(https://lh3.googleusercontent.com/-00tV67VPUTc/AAAAAAAAAAI/AAAAAAAAAAc/unX3ycsnwTY/photo.jpg?sz=50)',
              }}
            />
            <div className={this.dropdownClass(this.state.showProfileDropdown, ['headerDropdown', 'headerDropdown--profile'])}>
              <ProfileDisplay />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
