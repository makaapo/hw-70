import {NavLink} from 'react-router-dom';

const Toolbar = () => {

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary container">

      <div className="container">
        <NavLink to="/" className="navbar-brand d-flex fs-3">
          Contacts
        </NavLink>

        <ul className="navbar-nav mr-auto flex-row gap-2 flex-nowrap">
          <li className="nav-item">
            <NavLink to="/" className="nav-link">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/new-contact" className="nav-link">Add contact</NavLink>
          </li>
        </ul>

      </div>
    </nav>
  );
};

export default Toolbar;