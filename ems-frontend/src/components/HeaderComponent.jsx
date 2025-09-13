import React, { useState, useEffect } from 'react';

const HeaderComponent = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  useEffect(() => {
    document.body.style.backgroundColor = isDarkMode ? '#121212' : '#ffffff';
    document.body.style.color = isDarkMode ? '#ffffff' : '#000000';
  }, [isDarkMode]);

  return (
    <div>
      <header>
        <nav className={`navbar ${isDarkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`}>
          <a className="navbar-brand" href="">
            Employee Management System
          </a>

          <button
            className="btn btn-secondary"
            onClick={toggleTheme}
          >
            {isDarkMode ? 'Light Mode' : ' Dark Mode'}
          </button>
        </nav>
      </header>
    </div>
  );
};

export default HeaderComponent;
