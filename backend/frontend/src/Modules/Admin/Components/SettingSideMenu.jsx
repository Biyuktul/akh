import React from 'react';

import '../styles/SideMenu.css';

function SideMenu() {
  const handleEditProfileClick = () => {
    // Handle "Edit Profile" click here
  };

  const handleAppearanceSettingsClick = () => {
    // Handle "Appearance Settings" click here
  };

  return (
    <div className="side-menu-container">
      <h2 className="side-menu-title">Setting</h2>
      <ul className="side-menu-list">
        <li className="side-menu-item" onClick={handleEditProfileClick}>Edit Profile</li>
        <li className="side-menu-item" onClick={handleAppearanceSettingsClick}>Appearance Settings</li>
      </ul>
    </div>
  );
}

export default SideMenu;
