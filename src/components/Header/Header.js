import React from 'react';
import './Header.css';

const Header = () => {
  // TODO: In a larger SPA, this component would probably live in a shared folder.

  return (
    <div className="jumbotron">
      <div className="container">
        <h1>Sky React Assessment</h1>
      </div>
    </div>
  );
};

export default Header;